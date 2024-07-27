
import { Dispatch, MiddlewareAPI } from "@reduxjs/toolkit";
import { clearRedux, loggear, login } from "../authSlice";
import { decryptLoginData, encryptLoginDataInSessionStorage, getSession,  } from "@/helpers";
import { LoginResponse, TwoFactorResponse } from "@/types/dataFetching";
import { fetchData } from "@/services/fetchData";
import { uiCloseModal, uiModal, uiSetLoading } from "../uiSlice";
import { errorMsg } from "@/mocks/mocks";


export const sessionStorageMiddleware = (state: MiddlewareAPI) => {
    return (next: Dispatch) => async (action: any) => {

        next(action);
        if (action.type === 'auth/loginData') {
            state.dispatch(uiSetLoading(true))
            const loginData = action.payload

            console.log('Llamada a la Api - USER LOGIN - POST DE LOGIN')
            const user: LoginResponse = await fetchData('/manage-auth/signin', 'POST', loginData)
                .catch(err => {
                    state.dispatch(uiSetLoading(false))
                    state.dispatch(
                        uiModal({
                            modalFor: 'message',
                            modalOpen: true,
                            typeMsg: 'error',
                            msg: `${err}`
                        })
                    )
                })
            if(user && !user.error) {
                encryptLoginDataInSessionStorage(user.data);
                if (user.data.two_factor) {
                    state.dispatch( uiSetLoading(false) )
                    state.dispatch(
                        uiModal({
                            modalFor: '2F_code',
                            modalOpen: true,
                        })
                    )
                    return
                }
                state.dispatch( loggear() )
            }
        }


        if (action.type === 'auth/twoFactorAuthentication') {
            state.dispatch(uiSetLoading(true))
            const codeSend = action.payload
            const userData: any = decryptLoginData()

            console.log('Llamada a la Api - USER LOGIN - ENVÍO DE CÓGIO SEGUNDO FACTOR DE AUTENTICACIÓN')
            const codeResponse: TwoFactorResponse = await fetchData('/manage-auth/signin-validation', 'POST', codeSend, userData.data.access.accessToken)
                .catch(err => {
                    state.dispatch(uiSetLoading(false))
                    state.dispatch(
                        uiModal({
                            modalFor: 'message',
                            modalOpen: true,
                            typeMsg: 'error',
                            msg: `${err}`
                        })
                    )
                    sessionStorage.clear();
                })
            if (codeResponse && codeResponse.error) {
                state.dispatch(uiSetLoading(false))
                state.dispatch(
                    uiModal({
                        modalFor: 'message',
                        modalOpen: true,
                        typeMsg: 'error',
                        msg: `${errorMsg[codeResponse.code]}`
                    })
                )
                sessionStorage.clear();
            } else if(codeResponse && !codeResponse.error) {
                state.dispatch( loggear() )
            }
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
            const userDecrypted = getSession()
            state.dispatch( login(userDecrypted.data) )
        }


        if (action.type === 'auth/logout') {

            state.dispatch(uiSetLoading(true))
            state.dispatch(
                uiModal({
                    modalFor: 'message',
                    modalOpen: true,
                    typeMsg: 'success',
                    msg: 'Saliendo...'
                })
            )
            const userData: any = decryptLoginData()
            const token = userData.data.access.accessToken
            console.log('Llamada a la Api - USER LOGOUT')
            const logoutResponse = await fetchData('/manage-auth/signout', 'GET', null, token)
            .catch(err => {
                console.log(err)
                state.dispatch(uiSetLoading(false))
                state.dispatch(
                    uiModal({
                        modalFor: 'message',
                        modalOpen: true,
                        typeMsg: 'error',
                        msg: `${err}`
                    })
                )
                sessionStorage.clear();
                window.location.reload()
            })
            if(!logoutResponse.error){
                state.dispatch(uiSetLoading(false))
                state.dispatch(
                    uiCloseModal()
                )
                state.dispatch(clearRedux())
                sessionStorage.clear();
            }
        }
    }
}


