/**
 * CrossTabCookieManager
 * Maneja la sincronización de logout/login entre pestañas usando cookies
 * Funciona entre diferentes dominios (localhost:3000 y localhost:3001)
 */
class CrossTabCookieManager {
    private static instance: CrossTabCookieManager;
    private onLogoutCallback?: () => void;
    private onLoginCallback?: () => void;
    private pollingInterval?: NodeJS.Timeout;
    private lastSessionState: boolean = false;
    private readonly COOKIE_NAME = 'auction_session_sync';
    private readonly POLL_INTERVAL = 1000; // Verificar cada segundo

    private constructor() {
        this.lastSessionState = this.getSessionState();
        this.startPolling();
    }

    public static getInstance(): CrossTabCookieManager {
        if (!CrossTabCookieManager.instance) {
            CrossTabCookieManager.instance = new CrossTabCookieManager();
        }
        return CrossTabCookieManager.instance;
    }

    /**
     * Obtiene el estado actual de la sesión desde las cookies
     */
    private getSessionState(): boolean {
        if (typeof document === 'undefined') return false;
        
        try {
            // Verificar si existe alguna cookie de sesión
            const cookies = document.cookie.split(';');
            const hasSessionCookie = cookies.some(cookie => {
                const [name] = cookie.trim().split('=');
                return ['auction_token', 'auction_user', 'auction_auth'].includes(name);
            });
            
            return hasSessionCookie;
        } catch (error) {
            console.error('Error leyendo cookies:', error);
            return false;
        }
    }

    /**
     * Establece una cookie de sincronización
     */
    private setSyncCookie(action: 'login' | 'logout') {
        if (typeof document === 'undefined') return;
        
        const timestamp = Date.now();
        const value = `${action}_${timestamp}`;
        
        // Cookie que expire en 5 segundos (solo para sincronización)
        const expires = new Date(Date.now() + 5000).toUTCString();
        
        // Con domain=localhost para compartir entre puertos diferentes
        document.cookie = `${this.COOKIE_NAME}=${value}; expires=${expires}; path=/; domain=localhost; SameSite=Lax`;
        
        console.log(`🍪 Cliente: Cookie de sincronización creada: ${action}`);
    }

    /**
     * Lee la cookie de sincronización
     */
    private getSyncCookie(): { action: 'login' | 'logout', timestamp: number } | null {
        if (typeof document === 'undefined') return null;
        
        try {
            const cookies = document.cookie.split(';');
            const syncCookie = cookies.find(cookie => 
                cookie.trim().startsWith(`${this.COOKIE_NAME}=`)
            );
            
            if (!syncCookie) return null;
            
            const value = syncCookie.split('=')[1];
            const [action, timestamp] = value.split('_');
            
            return {
                action: action as 'login' | 'logout',
                timestamp: parseInt(timestamp)
            };
        } catch (error) {
            return null;
        }
    }

    /**
     * Inicia el polling para detectar cambios
     */
    private startPolling() {
        this.pollingInterval = setInterval(() => {
            const currentSessionState = this.getSessionState();
            const syncCookie = this.getSyncCookie();
            
            // Detectar cambio de estado de sesión
            if (currentSessionState !== this.lastSessionState) {
                console.log(`🔄 Cambio de estado detectado: ${this.lastSessionState ? 'Logout' : 'Login'}`);
                
                if (!currentSessionState && this.lastSessionState) {
                    // Logout detectado
                    this.onLogoutCallback?.();
                } else if (currentSessionState && !this.lastSessionState) {
                    // Login detectado
                    this.onLoginCallback?.();
                }
                
                this.lastSessionState = currentSessionState;
            }
            
            // Verificar cookie de sincronización
            if (syncCookie) {
                const timeDiff = Date.now() - syncCookie.timestamp;
                
                // Si la cookie es reciente (menos de 3 segundos)
                if (timeDiff < 3000) {
                    if (syncCookie.action === 'logout') {
                        console.log('🍪 Logout sincronizado detectado via cookie');
                        this.onLogoutCallback?.();
                    } else if (syncCookie.action === 'login') {
                        console.log('🍪 Login sincronizado detectado via cookie');
                        this.onLoginCallback?.();
                    }
                }
            }
        }, this.POLL_INTERVAL);
    }

    /**
     * Configura el callback para logout
     */
    public setLogoutCallback(callback: () => void) {
        this.onLogoutCallback = callback;
    }

    /**
     * Configura el callback para login
     */
    public setLoginCallback(callback: () => void) {
        this.onLoginCallback = callback;
    }

    /**
     * Notifica logout a otras pestañas
     */
    public broadcastLogout() {
        console.log('📡 Notificando logout a otras pestañas via cookies');
        this.setSyncCookie('logout');
    }

    /**
     * Notifica login a otras pestañas
     */
    public broadcastLogin() {
        console.log('📡 Notificando login a otras pestañas via cookies');
        this.setSyncCookie('login');
    }

    /**
     * Detiene el polling y limpia recursos
     */
    public destroy() {
        if (this.pollingInterval) {
            clearInterval(this.pollingInterval);
            this.pollingInterval = undefined;
        }
    }
}

export default CrossTabCookieManager;
