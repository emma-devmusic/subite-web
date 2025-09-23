'use client'

import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { getIdFromUSID, objectNotification, setNotificationOnLocalStorage } from "@/commons/helpers";
import { ObjectNotification } from "@/types";
import SessionManager from "@/commons/Classes/SessionManager";

interface NotificationsContextType {
  notifications: ObjectNotification[];
  isLoading: boolean;
  cleanup: () => void;
}

const NotificationsContext = createContext<NotificationsContextType>({
  notifications: [],
  isLoading: true,
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

  useEffect(() => {
    console.log('🔌 NotificationsProvider mounted, isInitialized:', isInitialized);
    
    // Si ya está inicializado, solo actualizar el estado
    if (isInitialized && globalSocket && globalSocket.connected) {
      console.log('🔌 Using existing socket connection');
      setIsLoading(false);
      return;
    }

    const initializeSocket = async () => {
      try {
        if (typeof window === 'undefined') {
          console.log('🔌 NotificationsProvider: Running on server side, skipping');
          setIsLoading(false);
          return;
        }

        // Si ya existe una conexión global y está conectada, usarla
        if (globalSocket && globalSocket.connected) {
          console.log('🔌 NotificationsProvider: Using existing connected socket');
          setIsLoading(false);
          return;
        }

        const session = SessionManager.getInstance();
        const usid = session.getUSID();
        console.log('🔌 USID for socket connection:', usid);

        // Solo conectar si hay usuario autenticado
        if (!usid) {
          console.log('🔌 No USID found, skipping socket connection');
          setIsLoading(false);
          return;
        }

        // Limpiar cualquier conexión anterior
        if (globalSocket) {
          console.log('🔌 Cleaning previous socket connection');
          globalSocket.disconnect();
          globalSocket.removeAllListeners();
        }

        console.log('🔌 Creating new socket connection...');
        // Crear una única conexión de socket
        globalSocket = io(`https://notifystage.ding.com.ar?usid=${usid}`, {
          autoConnect: false,
        });

        globalSocket.connect();

        globalSocket.on(`${usid}`, (data: any) => {
          console.log('🔔 Notification received:', data);
          const userId = getIdFromUSID(usid);
          if (userId) {
            setNotificationOnLocalStorage(userId, data);
            setNotifications(state => [...state, objectNotification(data)]);
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
  }, []);

  const cleanup = () => {
    console.log('🔌 Cleaning up socket connection');
    if (globalSocket) {
      globalSocket.disconnect();
      globalSocket.removeAllListeners();
      globalSocket = null;
      isInitialized = false;
    }
  };

  const value = {
    notifications,
    isLoading,
    cleanup,
  };

  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  );
};
