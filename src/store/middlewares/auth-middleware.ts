
import { Dispatch, MiddlewareAPI } from "@reduxjs/toolkit";
import { clearRedux, loggear, login } from "../slices/authSlice";
import { LoginResponse, TwoFactorResponse } from "@/types/dataFetching";
import { fetchData } from "@/services/fetchData";
import { executeApiCall } from "@/services/executeApiCall";
import { uiCloseModal, uiModal, uiSetLoading } from "../slices/uiSlice";
import { errorMsg } from "@/mocks/mocks";
import { UserLoginResponse } from "@/types";
import { cleanProducts } from "../slices/productSlice";
import { clearOffers } from "../slices/offersSlice";
import { clearAuctionState } from "../slices/auctionSlice";
import SessionManager from "@/commons/Classes/SessionManager";
import { LoginActionPayload } from "@/types/authPayloads";
import { CookieUtils } from "@/commons/Classes/CookiesUtils";


export const authMiddleware = (state: MiddlewareAPI) => {
    // Solo inicializar SessionManager en el cliente
    const session = typeof window !== 'undefined' ? SessionManager.getInstance() : null;
    
    const showError = (
        message: string,
        onAccept?: () => void,
        onClose?: () => void
    ) =>
        state.dispatch(
            uiModal({
                modalFor: 'message',
                typeMsg: 'error',
                msg: message,
                modalTitle: 'Ups!',
                onAccept: onAccept || null,
                onClose: onClose,
            })
        );
    // Función para setear el loading usando el dispatch
    const setIsLoading = (loading: boolean) => state.dispatch(uiSetLoading(loading));
    return (next: Dispatch) => async (action: any) => {
        next(action);
        
        // Si no estamos en el cliente, no ejecutar lógica de autenticación
        if (typeof window === 'undefined' || !session) {
            return;
        }
        
        const token = session.getToken()
        if (action.type === 'auth/loginData') {
            const { path, setIsLoading, user, navigate } = action.payload as LoginActionPayload
            console.log('Llamada a la Api - USER LOGIN - POST DE LOGIN')
            debugger
            try {
                await session.login(user);

                if(session.hasTwoFactorAuthenticate()) {
                    state.dispatch(
                        uiModal({ modalFor: '2F_code'})
                    )
                    return;
                }
                state.dispatch(loggear())

            } catch (error: any) {
                console.log(error)
                showError(error)
            }
        }

        if (action.type === 'auth/twoFactorAuthentication') {
            const codeSend = action.payload
            console.log('Llamada a la Api - USER LOGIN - ENVÍO DE CÓGIO SEGUNDO FACTOR DE AUTENTICACIÓN')
            await executeApiCall(
                setIsLoading,
                () => fetchData('/manage-auth/signin-validation', 'POST', codeSend, token),
                state.dispatch,
                (codeResponse: any) => {
                    if (codeResponse && codeResponse.error) {
                        state.dispatch(
                            uiModal({
                                modalFor: 'message',
                                modalOpen: true,
                                typeMsg: 'error',
                                msg: `${errorMsg[codeResponse.code]}`
                            })
                        )
                        console.log('llamada 3');
                        CookieUtils.clearSessionCookies();
                    } else if (codeResponse && !codeResponse.error) {
                        state.dispatch(loggear())
                    }
                }
            );
        }

        if (action.type === 'auth/loggear') {
            state.dispatch(uiSetLoading(false))
            state.dispatch(
                uiModal({
                    modalFor: 'message',
                    modalOpen: true,
                    typeMsg: 'success',
                    msg: 'Ingresando...'
                })
            )
            setTimeout(() => {
                state.dispatch(
                    uiCloseModal()
                )
            }, 2000)
            console.log('hasta acá todo bien y normal')
            const userDecrypted = session.getAuthData()
            debugger
            if (userDecrypted) state.dispatch(login(userDecrypted))
        }

        if (action.type === 'auth/logout') {
            console.log('Llamada a la Api - USER LOGOUT')
            await executeApiCall(
                setIsLoading,
                () => fetchData('/manage-auth/signout', 'GET', null, token),
                state.dispatch,
                (logoutResponse: any) => {
                    if (!logoutResponse.error) {
                        state.dispatch(
                            uiCloseModal()
                        )
                        state.dispatch(clearRedux())
                        state.dispatch(clearOffers())
                        state.dispatch(clearAuctionState())
                        console.log('llamada 5');
                        CookieUtils.clearSessionCookies();
                    }
                },
                'Saliendo...'
            ).catch((err) => {
                console.log(err)
                state.dispatch(cleanProducts())
                console.log('llamada 4');
                CookieUtils.clearSessionCookies();
                window.location.reload()
            });
        }
    }
}


