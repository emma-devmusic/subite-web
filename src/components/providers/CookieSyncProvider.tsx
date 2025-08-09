import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { useCookieSync } from '@/hooks/useCookieSync';
import { setAuthState, clearRedux } from '@/store/slices/authSlice';

interface CookieSyncProviderProps {
    children: React.ReactNode;
}

/**
 * Provider que maneja la sincronización automática entre cookies y Redux
 * Debe envolver toda la aplicación para funcionar correctamente
 */
export const CookieSyncProvider: React.FC<CookieSyncProviderProps> = ({ children }) => {
    const dispatch = useAppDispatch();
    const authState = useAppSelector((state) => state.auth);
    const { 
        isAuthenticated: cookieAuth, 
        sessionData: cookieSessionData,
        forceSyncCheck,
        triggerSyncInOtherTabs 
    } = useCookieSync();

    useEffect(() => {
        // Sincronización inicial
        const initialSync = forceSyncCheck();
        
        if (initialSync.isAuthenticated && initialSync.userData) {
            // Si hay sesión en cookies pero no en Redux, restaurar
            if (!authState.isLogged) {
                dispatch(setAuthState(initialSync.userData));
                console.log('🔄 CookieSync Provider: Session restored on mount');
            }
        } else if (!initialSync.isAuthenticated && authState.isLogged) {
            // Si no hay sesión en cookies pero sí en Redux, limpiar Redux
            dispatch(clearRedux());
            console.log('🔄 CookieSync Provider: Session cleared on mount');
        }
    }, []);

    useEffect(() => {
        // Sincronizar cuando cambia el estado de autenticación en cookies
        if (cookieAuth !== authState.isLogged) {
            const syncData = forceSyncCheck();
            
            if (cookieAuth && syncData.userData) {
                dispatch(setAuthState(syncData.userData));
                console.log('🔄 CookieSync Provider: User logged in from cookies');
            } else if (!cookieAuth) {
                dispatch(clearRedux());
                console.log('🔄 CookieSync Provider: User logged out from cookies');
            }
        }
    }, [cookieAuth, authState.isLogged]);

    // Detectar cambios en Redux y actualizarlos en otras pestañas
    useEffect(() => {
        if (authState.isLogged) {
            triggerSyncInOtherTabs();
        }
    }, [authState.isLogged, authState.user]);

    return <>{children}</>;
};

export default CookieSyncProvider;
