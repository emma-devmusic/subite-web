import type { Middleware } from '@reduxjs/toolkit';
import { CookieUtils } from '@/commons/Classes/CookiesUtils';
import { setAuthState, clearRedux } from '@/store/slices/authSlice';

/**
 * Middleware para sincronizar el estado de Redux con las cookies
 * Se ejecuta en cada acción para mantener coherencia entre las aplicaciones
 */
export const cookieSyncMiddleware: Middleware = (store) => (next) => (action) => {
    const result = next(action);

    // Solo ejecutar en el cliente
    if (typeof window === 'undefined') {
        return result;
    }

    // Después de cada acción, verificamos si las cookies han cambiado
    const state = store.getState();
    const currentAuthState = state.auth;

    try {
        // Obtener datos actuales de las cookies
        const cookieData = {
            sessionIndicator: CookieUtils.getSessionData(), // Solo un indicador pequeño
            token: CookieUtils.getAccessToken(),
            usid: CookieUtils.getUSID(),
            userData: CookieUtils.getUserData()
        };

        // Verificar si el usuario está autenticado según las cookies
        const isAuthenticatedFromCookies = !!(cookieData.sessionIndicator && cookieData.token);

        // Si el estado de Redux no coincide con las cookies, sincronizar
        if (currentAuthState.isLogged !== isAuthenticatedFromCookies) {
            if (isAuthenticatedFromCookies && cookieData.userData) {
                // Usuario autenticado en cookies pero no en Redux - sincronizar
                store.dispatch(setAuthState(cookieData.userData));
                
                console.log('🔄 Cookie sync: User authenticated from cookies');
            } else if (!isAuthenticatedFromCookies && currentAuthState.isLogged) {
                // Usuario desautenticado en cookies pero autenticado en Redux - limpiar Redux
                store.dispatch(clearRedux());
                console.log('🔄 Cookie sync: User logged out from cookies');
            }
        }

        // Sincronizar datos de usuario si han cambiado
        if (isAuthenticatedFromCookies && cookieData.userData) {
            const currentUser = currentAuthState.user;
            const cookieUser = cookieData.userData;
            
            // Comparación básica para evitar actualizaciones innecesarias
            if (JSON.stringify(currentUser) !== JSON.stringify(cookieUser)) {
                store.dispatch(setAuthState(cookieUser));
                console.log('🔄 Cookie sync: User data updated from cookies');
            }
        }

    } catch (error) {
        console.error('❌ Cookie sync middleware error:', error);
    }

    return result;
};

export default cookieSyncMiddleware;
