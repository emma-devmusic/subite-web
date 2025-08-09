import { useEffect, useState } from 'react';
import { CookieUtils } from '@/commons/Classes/CookiesUtils';

/**
 * Hook personalizado para sincronizar el estado de autenticación con cookies
 * Detecta cambios en las cookies de sesión desde otras aplicaciones
 */
export const useCookieSync = () => {
    // Inicializar estado directamente desde cookies
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
        const cookieSessionData = CookieUtils.getSessionData();
        const cookieToken = CookieUtils.getAccessToken();
        return !!(cookieSessionData && cookieToken);
    });
    
    const [sessionData, setSessionData] = useState<any>(() => {
        return CookieUtils.getSessionData();
    });

    // Función para verificar el estado de las cookies
    const checkCookieStatus = () => {
        const cookieSessionData = CookieUtils.getSessionData();
        const cookieToken = CookieUtils.getAccessToken();
        
        const isAuthenticatedFromCookies = !!(cookieSessionData && cookieToken);
        
        setIsAuthenticated(isAuthenticatedFromCookies);
        setSessionData(cookieSessionData);
        
        return {
            isAuthenticated: isAuthenticatedFromCookies,
            sessionData: cookieSessionData,
            token: cookieToken,
            usid: CookieUtils.getUSID(),
            userData: CookieUtils.getUserData()
        };
    };

    useEffect(() => {
        // Verificar el estado inicial
        checkCookieStatus();

        // Función para detectar cambios en las cookies
        const handleCookieChange = () => {
            checkCookieStatus();
        };

        // Detectar cambios en el foco de la ventana (cuando el usuario regresa de otra pestaña/aplicación)
        const handleVisibilityChange = () => {
            if (!document.hidden) {
                checkCookieStatus();
            }
        };

        // Detectar cambios en el almacenamiento (aunque no es directo para cookies, es útil para otras pestañas)
        const handleStorageChange = (e: StorageEvent) => {
            // Aunque las cookies no disparan eventos de storage, 
            // podemos usar esto para sincronización manual si es necesario
            if (e.key === 'cookie_sync_trigger') {
                checkCookieStatus();
            }
        };

        // Agregar event listeners
        document.addEventListener('visibilitychange', handleVisibilityChange);
        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('focus', handleCookieChange);

        // Verificar periódicamente las cookies (cada 5 segundos)
        const interval = setInterval(checkCookieStatus, 5000);

        // Cleanup
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('focus', handleCookieChange);
            clearInterval(interval);
        };
    }, []);

    // Función manual para forzar la sincronización
    const forceSyncCheck = () => {
        return checkCookieStatus();
    };

    // Función para disparar sincronización en otras pestañas
    const triggerSyncInOtherTabs = () => {
        // Dispara un evento en localStorage que otras pestañas pueden detectar
        localStorage.setItem('cookie_sync_trigger', Date.now().toString());
        localStorage.removeItem('cookie_sync_trigger');
    };

    return {
        isAuthenticated,
        sessionData,
        forceSyncCheck,
        triggerSyncInOtherTabs,
        checkCookieStatus
    };
};

export default useCookieSync;
