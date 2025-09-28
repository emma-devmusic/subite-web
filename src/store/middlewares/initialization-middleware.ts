import type { Middleware } from '@reduxjs/toolkit';
import { CookieUtils } from '@/commons/Classes/CookiesUtils';
import { setAuthState } from '@/store/slices/authSlice';

/**
 * Middleware de inicialización que se ejecuta una sola vez al inicio de la aplicación
 * Sincroniza el estado inicial de Redux con las cookies existentes
 */
export const initializationMiddleware: Middleware = (store) => {
    let initialized = false;

    return (next) => (action) => {
        // Solo ejecutar en el cliente y en la primera acción
        if (!initialized && typeof window !== 'undefined') {
            initialized = true;
            
            try {
                // Obtener datos de cookies al inicializar
                const sessionData = CookieUtils.getSessionData();
                const token = CookieUtils.getAccessToken();
                const usid = CookieUtils.getUSID();
                const userData = CookieUtils.getUserData();

                // Si hay datos de sesión válidos, restaurar el estado
                if (sessionData && token && userData) {
                    // console.log('🚀 Initialization: Restoring session from cookies');
                    
                    store.dispatch(setAuthState(userData));
                    
                    // console.log('✅ Initialization: Session restored successfully');
                } else {
                    // console.log('ℹ️ Initialization: No valid session found in cookies');
                }
            } catch (error) {
                console.error('❌ Initialization middleware error:', error);
            }
        }

        return next(action);
    };
};

export default initializationMiddleware;
