/**
 * CrossTabLogoutManager
 * Maneja la sincronización de logout entre pestañas usando BroadcastChannel API
 */
class CrossTabLogoutManager {
    private static instance: CrossTabLogoutManager;
    private channel: BroadcastChannel;
    private onLogoutCallback?: () => void;
    private isCurrentTabInitiator = false;

    private constructor() {
        // Canal compartido para comunicación entre pestañas
        this.channel = new BroadcastChannel('auction-logout-sync');
        this.setupListener();
    }

    public static getInstance(): CrossTabLogoutManager {
        if (!CrossTabLogoutManager.instance) {
            CrossTabLogoutManager.instance = new CrossTabLogoutManager();
        }
        return CrossTabLogoutManager.instance;
    }

    private setupListener() {
        this.channel.addEventListener('message', (event) => {
            if (event.data.type === 'LOGOUT_REQUEST') {
                // console.log('🔄 Logout recibido desde otra pestaña/aplicación');
                
                // Solo ejecutar callback si esta pestaña NO fue la que inició el logout
                if (!this.isCurrentTabInitiator) {
                    this.onLogoutCallback?.();
                }
                
                // Reset del flag después de un breve delay
                setTimeout(() => {
                    this.isCurrentTabInitiator = false;
                }, 1000);
            }
        });
    }

    /**
     * Configura el callback que se ejecutará cuando se reciba un logout desde otra pestaña
     */
    public setLogoutCallback(callback: () => void) {
        this.onLogoutCallback = callback;
    }

    /**
     * Envía una señal de logout a todas las otras pestañas
     */
    public broadcastLogout() {
        // console.log('📡 Enviando logout a otras pestañas/aplicaciones');
        
        // Marcar esta pestaña como la iniciadora del logout
        this.isCurrentTabInitiator = true;
        
        // Enviar mensaje a otras pestañas
        this.channel.postMessage({ 
            type: 'LOGOUT_REQUEST', 
            timestamp: Date.now(),
            source: 'client' // Cliente solo limpia estado, no redirige
        });
    }

    /**
     * Cierra el canal de comunicación
     */
    public close() {
        this.channel.close();
    }
}

export default CrossTabLogoutManager;
