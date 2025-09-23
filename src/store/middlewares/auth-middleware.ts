
import { Dispatch, MiddlewareAPI } from "@reduxjs/toolkit";
import { clearRedux } from "../slices/authSlice";
import { uiCloseModal, uiSetLoading } from "../slices/uiSlice";
import { cleanProducts } from "../slices/productSlice";
import { clearOffers } from "../slices/offersSlice";
import { clearAuctionState } from "../slices/auctionSlice";
import SessionManager from "@/commons/Classes/SessionManager";


export const authMiddleware = (state: MiddlewareAPI) => {
    // Solo inicializar SessionManager en el cliente
    const session = typeof window !== 'undefined' ? SessionManager.getInstance() : null;
    
    // Función para setear el loading usando el dispatch
    const setIsLoading = (loading: boolean) => state.dispatch(uiSetLoading(loading));
    
    return (next: Dispatch) => async (action: any) => {
        next(action);
        
        // Si no estamos en el cliente, no ejecutar lógica de autenticación
        if (typeof window === 'undefined' || !session) {
            return;
        }
        
        // Solo manejar logout - el login se hace desde el dashboard
        if (action.type === 'auth/logout') {
            console.log('Llamada a la Api - USER LOGOUT')
            setIsLoading(true);
            
            try {
                const logoutSuccess = await session.logout();
                
                if (logoutSuccess) {
                    state.dispatch(uiCloseModal())
                    state.dispatch(clearRedux())
                    state.dispatch(clearOffers())
                    state.dispatch(clearAuctionState())
                    console.log('Logout exitoso desde cliente');
                } else {
                    console.log('Error en logout, limpiando estado local');
                    state.dispatch(cleanProducts())
                    state.dispatch(clearRedux())
                    state.dispatch(clearOffers())
                    state.dispatch(clearAuctionState())
                }
            } catch (error) {
                console.log('Error en logout:', error)
                state.dispatch(cleanProducts())
                state.dispatch(clearRedux())
                state.dispatch(clearOffers())
                state.dispatch(clearAuctionState())
                console.log('Error en logout, limpiando cookies y recargando');
                window.location.reload()
            } finally {
                setIsLoading(false);
            }
        }
    }
}


