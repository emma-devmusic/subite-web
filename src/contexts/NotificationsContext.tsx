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
  clearNotifications: () => void;
  cleanup: () => void;
}

const NotificationsContext = createContext<NotificationsContextType>({
  notifications: [],
  isLoading: true,
  unreadCount: 0,
  markAsRead: () => {},
  markAllAsRead: () => {},
  clearNotifications: () => {},
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

// Función para sincronizar notificaciones a cookie compartida (cross-subdomain)
const syncToCookie = (userId: string | number, notifications: ObjectNotification[]) => {
  try {
    // Guardamos solo las últimas 15 notificaciones para no exceder el límite de cookies
    const notificationsForCookie = notifications.slice(0, 15).map((n: ObjectNotification) => ({
      title: n.title,
      message: n.message,
      date: n.date,
      link: n.link,
      icon: n.icon,
      read: n.read,
      details: n.details,
      error: n.error,
      product_id: n.product_id,
    }));
    const cookieValue = JSON.stringify(notificationsForCookie);
    const expires = new Date();
    expires.setTime(expires.getTime() + 7 * 24 * 60 * 60 * 1000);
    const cookieDomain = process.env.NEXT_PUBLIC_COOKIE_DOMAIN || '';
    const domainString = cookieDomain && cookieDomain !== 'localhost' ? `; Domain=${cookieDomain}` : '';
    document.cookie = `auction_notifications_${userId}=${encodeURIComponent(cookieValue)}; expires=${expires.toUTCString()}; Path=/${domainString}`;
  } catch (e) {
    // Silently ignore errors
  }
};

// Función para leer notificaciones desde cookie compartida
const readFromCookie = (userId: string | number): ObjectNotification[] | null => {
  try {
    const cookieName = `auction_notifications_${userId}=`;
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.startsWith(cookieName)) {
        const cookieValue = decodeURIComponent(cookie.substring(cookieName.length));
        return JSON.parse(cookieValue);
      }
    }
  } catch (e) {
    // Silently ignore parse errors
  }
  return null;
};

export const NotificationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<ObjectNotification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUsid, setCurrentUsid] = useState<string | null>(null);

  const persistLocal = useCallback((userId: string | number, list: ObjectNotification[]) => {
    try {
      localStorage.setItem(`notif-${userId}`, JSON.stringify(list));
      syncToCookie(userId, list);
    } catch (e) {
      // Silently ignore errors
    }
  }, []);

  // Detectar cambios en el USID (login/logout) con polling
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Verificar inmediatamente al montar
    const session = SessionManager.getInstance();
    session.refreshSessionFromCookies();
    const initialUsid = session.getUSID();
    if (initialUsid !== currentUsid) {
      setCurrentUsid(initialUsid);
    }
    
    // Polling cada 2 segundos para detectar login/logout
    const interval = setInterval(() => {
      session.refreshSessionFromCookies();
      const usid = session.getUSID();
      if (usid !== currentUsid) {
        // Si cambió de tener USID a null = LOGOUT
        if (currentUsid && !usid) {
          if (globalSocket) {
            const socketToClean = globalSocket;
            socketToClean.disconnect();
            socketToClean.removeAllListeners();
            globalSocket = null;
            isInitialized = false;
          }
          setNotifications([]);
        }
        
        setCurrentUsid(usid);
      }
    }, 2000);
    
    return () => clearInterval(interval);
  }, [currentUsid]);

  // Polling para sincronizar notificaciones desde cookie compartida (del dashboard)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!currentUsid) return;
    
    const userId = getIdFromUSID(currentUsid);
    if (!userId) return;

    const syncFromCookie = () => {
      const cookieNotifications = readFromCookie(userId);
      if (!cookieNotifications) return;
      
      setNotifications((prev) => {
        let updated = [...prev];
        let hasChanges = false;
        
        for (const cookieNotif of cookieNotifications) {
          const existingIndex = updated.findIndex(
            (n) => n.title === cookieNotif.title && n.date === cookieNotif.date && n.message === cookieNotif.message
          );
          
          if (existingIndex >= 0) {
            // Si la cookie marca como leída y nosotros no, actualizar
            if (cookieNotif.read && !updated[existingIndex].read) {
              updated[existingIndex] = { ...updated[existingIndex], read: true };
              hasChanges = true;
            }
          } else {
            // Nueva notificación desde cookie
            updated.unshift({ ...cookieNotif, read: cookieNotif.read ?? false });
            hasChanges = true;
          }
        }
        
        // Verificar si se limpiaron todas las notificaciones desde el dashboard
        if (cookieNotifications.length === 0 && prev.length > 0) {
          hasChanges = true;
          updated = [];
        }
        
        if (hasChanges) {
          localStorage.setItem(`notif-${userId}`, JSON.stringify(updated));
          return updated;
        }
        return prev;
      });
    };

    // Sincronizar cada 2 segundos
    const syncInterval = setInterval(syncFromCookie, 2000);
    
    return () => clearInterval(syncInterval);
  }, [currentUsid]);

  useEffect(() => {
    // Si ya está inicializado con el mismo USID, solo actualizar el estado
    if (isInitialized && globalSocket && globalSocket.connected && currentUsid) {
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
          setIsLoading(false);
          return;
        }

        // Si hay una conexión previa pero con diferente usuario, limpiarla
        if (globalSocket) {
          const socketToClean = globalSocket;
          socketToClean.disconnect();
          socketToClean.removeAllListeners();
          globalSocket = null;
          isInitialized = false;
        }

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
          const userId = getIdFromUSID(currentUsid);
          if (userId) {
            setNotificationOnLocalStorage(userId, data);
            const newObj = objectNotification(data);
            setNotifications((prev) => {
              const exists = prev.some(
                (n) => n.title === newObj.title && n.message === newObj.message && n.date === newObj.date
              );
              if (exists) return prev;
              const next = [newObj, ...prev];
              persistLocal(userId, next);
              return next;
            });
          }
        });

        globalSocket.on('connect', () => {
          isInitialized = true;
        });

        globalSocket.on('disconnect', () => {
          isInitialized = false;
        });

        setIsLoading(false);

      } catch (error) {
        setIsLoading(false);
      }
    };

    initializeSocket();

    return () => {
      // Solo limpiar si realmente es necesario (ej: logout)
    };
  }, [currentUsid, persistLocal]);

  const cleanup = () => {
    if (globalSocket) {
      const socketToClean = globalSocket;
      socketToClean.disconnect();
      socketToClean.removeAllListeners();
      globalSocket = null;
      isInitialized = false;
    }
    setCurrentUsid(null);
  };

  // Rehidratación inicial desde localStorage o cookies compartidas
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!currentUsid) return;
    
    const userId = getIdFromUSID(currentUsid);
    if (!userId) return;
    
    try {
      let notifications: ObjectNotification[] = [];
      const raw = localStorage.getItem(`notif-${userId}`);
      
      if (raw) {
        const parsed: ObjectNotification[] = JSON.parse(raw);
        notifications = parsed.map((n) => ({ ...n, read: n.read ?? false }));
      }
      
      const cookieNotifications = readFromCookie(userId);
      if (cookieNotifications && cookieNotifications.length > 0) {
        for (const cookieNotif of cookieNotifications) {
          const existingIndex = notifications.findIndex(
            (n) => n.title === cookieNotif.title && n.date === cookieNotif.date && n.message === cookieNotif.message
          );
          if (existingIndex >= 0) {
            if (cookieNotif.read && !notifications[existingIndex].read) {
              notifications[existingIndex].read = true;
            }
          } else {
            notifications.unshift({ ...cookieNotif, read: cookieNotif.read ?? false });
          }
        }
        
        localStorage.setItem(`notif-${userId}`, JSON.stringify(notifications));
      }
      
      if (notifications.length > 0) {
        setNotifications(notifications);
      }
    } catch (err) {
      // Silently ignore errors
    }
  }, [currentUsid]);

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

  const clearNotifications = useCallback(() => {
    setNotifications([]);
    if (currentUsid) {
      const userId = getIdFromUSID(currentUsid);
      if (userId) {
        persistLocal(userId, []);
      }
    }
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
    clearNotifications,
    cleanup,
  };

  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  );
};
