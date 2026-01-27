'use client'

import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { io, Socket } from 'socket.io-client';
import { getIdFromUSID, objectNotification, setNotificationOnLocalStorage } from "@/commons/helpers";
import { ObjectNotification } from "@/types";
import SessionManager from "@/commons/Classes/SessionManager";
import { NOTIFICATIONS_WS_URL } from "@/commons/helpers/envs";

interface NotificationsContextType {
  notifications: ObjectNotification[];
  isLoading: boolean;
  unreadCount: number;
  markAsRead: (indexOrId: number | string) => void;
  markAllAsRead: () => void;
  cleanup: () => void;
}

const NotificationsContext = createContext<NotificationsContextType>({
  notifications: [],
  isLoading: true,
  unreadCount: 0,
  markAsRead: () => {},
  markAllAsRead: () => {},
  cleanup: () => {},
});

export const useNotifications = () => {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationsProvider');
  }
  return context;
};

// Singleton para evitar múltiples instancias - FUERA del componente
let globalSocket: Socket | null = null;
let isInitialized = false;

export const NotificationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<ObjectNotification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUsid, setCurrentUsid] = useState<string | null>(null);

  const persistLocal = useCallback((userId: string | number, list: ObjectNotification[]) => {
    try {
      localStorage.setItem(`notif-${userId}`, JSON.stringify(list));
    } catch (e) {
      console.error('Persist error notifications', e);
    }
  }, []);

  // Detectar cambios en el USID (login/logout) con polling
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Verificar inmediatamente al montar
    const session = SessionManager.getInstance();
    const initialUsid = session.getUSID();
    if (initialUsid !== currentUsid) {
      console.log('🔌 Initial USID detected:', initialUsid);
      setCurrentUsid(initialUsid);
    }
    
    // Polling cada 2 segundos para detectar login/logout
    const interval = setInterval(() => {
      const usid = session.getUSID();
      if (usid !== currentUsid) {
        console.log('🔌 USID changed:', { from: currentUsid, to: usid });
        
        // Si cambió de tener USID a null = LOGOUT
        if (currentUsid && !usid) {
          console.log('🔌 Logout detected - cleaning up socket');
          if (globalSocket) {
            const socketToClean = globalSocket;
            socketToClean.disconnect();
            socketToClean.removeAllListeners();
            globalSocket = null;
            isInitialized = false;
          }
          setNotifications([]); // Limpiar notificaciones
        }
        
        setCurrentUsid(usid);
      }
    }, 2000);
    
    return () => clearInterval(interval);
  }, [currentUsid]);

  useEffect(() => {
    console.log(
      '🔌 NotificationsProvider mounted, isInitialized:',
      isInitialized,
      'currentUsid:',
      currentUsid
    );
    
    // Si ya está inicializado con el mismo USID, solo actualizar el estado
    if (isInitialized && globalSocket && globalSocket.connected && currentUsid) {
      console.log('🔌 Using existing socket connection for same user');
      setIsLoading(false);
      return;
    }

    const initializeSocket = async () => {
      try {
        if (typeof window === 'undefined') {
          setIsLoading(false);
          return;
        }

        // Solo conectar si hay usuario autenticado
        if (!currentUsid) {
          console.log('🔌 No USID found, skipping socket connection');
          setIsLoading(false);
          return;
        }

        // Si hay una conexión previa pero con diferente usuario, limpiarla
        if (globalSocket) {
          console.log('🔌 Cleaning previous socket connection for different user');
          const socketToClean = globalSocket;
          socketToClean.disconnect();
          socketToClean.removeAllListeners();
          globalSocket = null;
          isInitialized = false;
        }

        console.log('🔌 USID for socket connection:', currentUsid);

        console.log('🔌 Creating new socket connection...');
        // Crear una única conexión de socket
        globalSocket = io(
          `${NOTIFICATIONS_WS_URL}?usid=${currentUsid}`,
          {
            autoConnect: false,
            forceNew: true,
            transports: ['websocket', 'polling'],
          }
        );

        globalSocket.connect();

        globalSocket.on(`${currentUsid}`, (data: any) => {
          console.log('🔔 Notification received:', data);
          const userId = getIdFromUSID(currentUsid);
          if (userId) {
            // guarda en storage (con read:false ya seteado en helper)
            setNotificationOnLocalStorage(userId, data);
            const newObj = objectNotification(data);
            setNotifications((prev) => {
              // evitar duplicados simples por título + fecha + mensaje
              const exists = prev.some(
                (n) => n.title === newObj.title && n.message === newObj.message && n.date === newObj.date
              );
              if (exists) return prev;
              const next = [...prev, newObj];
              persistLocal(userId, next);
              return next;
            });
          }
        });

        globalSocket.on('connect', () => {
          console.log('🔌 Socket connected successfully!');
          isInitialized = true;
        });

        globalSocket.on('disconnect', () => {
          console.log('🔌 Socket disconnected');
          isInitialized = false;
        });

        globalSocket.on('connect_error', (error) => {
          console.error('🔌 Socket connection error:', error);
        });

        setIsLoading(false);

      } catch (error) {
        console.error('🔌 Error initializing socket:', error);
        setIsLoading(false);
      }
    };

    initializeSocket();

    // NO hacer cleanup en cada desmonte - mantener socket global
    return () => {
      // Solo limpiar si realmente es necesario (ej: logout)
    };
  }, [currentUsid, persistLocal]); // Agregar currentUsid como dependencia

  const cleanup = () => {
    console.log('🔌 Cleaning up socket connection');
    if (globalSocket) {
      const socketToClean = globalSocket;
      socketToClean.disconnect();
      socketToClean.removeAllListeners();
      globalSocket = null;
      isInitialized = false;
    }
    setCurrentUsid(null); // Reset del USID
  };

  // Rehidratación inicial desde localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!currentUsid) return; // Esperar a tener USID
    
    const userId = getIdFromUSID(currentUsid);
    if (!userId) return;
    
    try {
      const raw = localStorage.getItem(`notif-${userId}`);
      if (raw) {
        const parsed: ObjectNotification[] = JSON.parse(raw);
        // asegurar que tengan read (por si existían antes del cambio)
        const normalized = parsed.map((n) => ({ ...n, read: n.read ?? false }));
        setNotifications(normalized);
      }
    } catch (err) {
      console.error('Error rehydrating notifications', err);
    }
  }, [currentUsid]); // Rehidratar cuando cambie el USID

  const markAsRead = useCallback((indexOrId: number | string) => {
    setNotifications((prev) => {
      if (!currentUsid) return prev;
      const userId = getIdFromUSID(currentUsid);
      if (!userId) return prev;
      
      const next = prev.map((n, idx) => {
        if (typeof indexOrId === 'number') return idx === indexOrId ? { ...n, read: true } : n;
        return n.link === indexOrId || (n as any).id === indexOrId ? { ...n, read: true } : n;
      });
      persistLocal(userId, next);
      return next;
    });
  }, [currentUsid, persistLocal]);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => {
      if (!currentUsid) return prev;
      const userId = getIdFromUSID(currentUsid);
      if (!userId) return prev;
      
      const next = prev.map((n) => ({ ...n, read: true }));
      persistLocal(userId, next);
      return next;
    });
  }, [currentUsid, persistLocal]);

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications]
  );

  const value = {
    notifications,
    isLoading,
    unreadCount,
    markAsRead,
    markAllAsRead,
    cleanup,
  };

  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  );
};
