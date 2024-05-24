
import { Action, Dispatch, MiddlewareAPI } from "@reduxjs/toolkit";
import { RootState } from "..";
import { loggear, login } from "../authSlice";
import { getFromSessionStorage, setInSessionStorage } from "@/helpers";
import { LoginResponse, TwoFactorResponse } from "@/types/dataFetching";
import { fetchData, fetchDataAuth } from "@/services/fetchData";
import EncryptData from "@/helpers/EncryptData";
import { uiModal, uiSetLoading } from "../uiSlice";
import { LoginData } from "@/types";


export const sessionStorageMiddleware = (state: MiddlewareAPI) => {
    return (next: Dispatch) => async (action: any) => {

        next(action);
        if (action.type === 'auth/loginData') {

            const loginData: LoginData = action.payload
            state.dispatch(uiSetLoading(true))
            const user: LoginResponse = await fetchData('/manage-auth/signin', 'POST', loginData)
                .catch(err => {
                    state.dispatch(uiSetLoading(false))
                    state.dispatch(
                        uiModal({
                            modalFor: 'message',
                            modalOpen: true,
                            typeMsg: 'error',
                            msg: 'Parece que hubo un error. Revisa tu conexión.'
                        })
                    )
                })
            setInSessionStorage('user-login-data', user.data)
            if (user.data.two_factor) {
                state.dispatch(
                    uiModal({
                        modalFor: '2F_code',
                        modalOpen: true,
                    })
                )
                return
            }

            state.dispatch( loggear() )

            // state.dispatch(uiSetLoading(false))
            // state.dispatch(
            //     uiModal({
            //         modalFor: 'message',
            //         modalOpen: true,
            //         typeMsg: 'success',
            //         msg: 'Ingresando...'
            //     })
            // )
            // setTimeout(() => {
            //     state.dispatch(
            //         uiModal({
            //             modalFor: null,
            //             modalOpen: false,
            //         })
            //     )
            // }, 2000)

            // const encryptData = new EncryptData(`${process.env.NEXT_PUBLIC_SERVER_SECRET}`)
            // const userDecrypted = encryptData.decrypt(user.data.permissions)
            // state.dispatch( login( userDecrypted.data ))
        }

        if (action.type === 'auth/twoFactorAuthentication') {
            const codeSend = action.payload
            state.dispatch(uiSetLoading(true))
            const userData: any = JSON.parse( getFromSessionStorage('user-login-data') || '' )
            const codeResponse: TwoFactorResponse = await fetchDataAuth('/manage-auth/signin-validation', 'POST', codeSend, userData.access.accessToken)
                .catch(err => {
                    state.dispatch(uiSetLoading(false))
                    state.dispatch(
                        uiModal({
                            modalFor: 'message',
                            modalOpen: true,
                            typeMsg: 'error',
                            msg: 'Parece que hubo un error. Revisa tu conexión.'
                        })
                    )
                    sessionStorage.clear();
                })
            if (codeResponse.error) {
                state.dispatch(uiSetLoading(false))
                state.dispatch(
                    uiModal({
                        modalFor: 'message',
                        modalOpen: true,
                        typeMsg: 'error',
                        msg: 'Parece que tu código está mal. Intenta nuevamente'
                    })
                )
                sessionStorage.clear();
            } else {
                state.dispatch( loggear() )
            }
        }

        if (action.type === 'auth/loggear') {

            const userData: any = JSON.parse( getFromSessionStorage('user-login-data') || '' )
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
                    uiModal({
                        modalFor: null,
                        modalOpen: false,
                    })
                )
            }, 2000)

            const encryptData = new EncryptData(`${process.env.NEXT_PUBLIC_SERVER_SECRET}`)
            const userDecrypted = encryptData.decrypt(userData.permissions)
            state.dispatch(login(userDecrypted.data))

        }

        if (action.type === 'auth/logout') {
            sessionStorage.clear();
        }

    }
}


