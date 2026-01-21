'use client'

import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { io, Socket } from 'socket.io-client';
import { getIdFromUSID, objectNotification, setNotificationOnLocalStorage } from "@/commons/helpers";
import { ObjectNotification } from "@/types";
import SessionManager from "@/commons/Classes/SessionManager";

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

  const persistLocal = useCallback((userId: string | number, list: ObjectNotification[]) => {
    try {
      localStorage.setItem(`notif-${userId}`, JSON.stringify(list));
    } catch (e) {
      console.error('Persist error notifications', e);
    }
  }, []);

  useEffect(() => {
    // console.log('🔌 NotificationsProvider mounted, isInitialized:', isInitialized);
    
    // Si ya está inicializado, solo actualizar el estado
    if (isInitialized && globalSocket && globalSocket.connected) {
      // console.log('🔌 Using existing socket connection');
      setIsLoading(false);
      return;
    }

    const initializeSocket = async () => {
      try {
        if (typeof window === 'undefined') {
          // console.log('🔌 NotificationsProvider: Running on server side, skipping');
          setIsLoading(false);
          return;
        }

        // Si ya existe una conexión global y está conectada, usarla
        if (globalSocket && globalSocket.connected) {
          // console.log('🔌 NotificationsProvider: Using existing connected socket');
          setIsLoading(false);
          return;
        }

        const session = SessionManager.getInstance();
        const usid = session.getUSID();
        // console.log('🔌 USID for socket connection:', usid);

        // Solo conectar si hay usuario autenticado
        if (!usid) {
          // console.log('🔌 No USID found, skipping socket connection');
          setIsLoading(false);
          return;
        }

        // Limpiar cualquier conexión anterior
        if (globalSocket) {
          // console.log('🔌 Cleaning previous socket connection');
          globalSocket.disconnect();
          globalSocket.removeAllListeners();
        }

        // console.log('🔌 Creating new socket connection...');
        // Crear una única conexión de socket
        globalSocket = io(`https://notifystage.ding.com.ar?usid=${usid}`, {
          autoConnect: false,
        });

        globalSocket.connect();

        globalSocket.on(`${usid}`, (data: any) => {
          // console.log('🔔 Notification received:', data);
          const userId = getIdFromUSID(usid);
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
          // console.log('🔌 Socket connected successfully!');
          isInitialized = true;
        });

        globalSocket.on('disconnect', () => {
          // console.log('🔌 Socket disconnected');
          isInitialized = false;
        });

        globalSocket.on('connect_error', (error) => {
          // console.error('🔌 Socket connection error:', error);
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
  }, [persistLocal]);

  const cleanup = () => {
    // console.log('🔌 Cleaning up socket connection');
    if (globalSocket) {
      globalSocket.disconnect();
      globalSocket.removeAllListeners();
      globalSocket = null;
      isInitialized = false;
    }
  };

  // Rehidratación inicial desde localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const session = SessionManager.getInstance();
    const usid = session.getUSID();
    if (!usid) return;
    const userId = getIdFromUSID(usid);
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
  }, []);

  const markAsRead = useCallback((indexOrId: number | string) => {
    setNotifications((prev) => {
      const session = SessionManager.getInstance();
      const usid = session.getUSID();
      const userId = getIdFromUSID(usid);
      const next = prev.map((n, idx) => {
        if (typeof indexOrId === 'number') return idx === indexOrId ? { ...n, read: true } : n;
        return n.link === indexOrId || (n as any).id === indexOrId ? { ...n, read: true } : n;
      });
      if (userId) persistLocal(userId, next);
      return next;
    });
  }, [persistLocal]);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => {
      const session = SessionManager.getInstance();
      const usid = session.getUSID();
      const userId = getIdFromUSID(usid);
      const next = prev.map((n) => ({ ...n, read: true }));
      if (userId) persistLocal(userId, next);
      return next;
    });
  }, [persistLocal]);

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
