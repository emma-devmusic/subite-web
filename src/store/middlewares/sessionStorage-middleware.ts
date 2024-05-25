
import { Dispatch, MiddlewareAPI } from "@reduxjs/toolkit";
import { loggear, login } from "../authSlice";
import { getFromSessionStorage, setInSessionStorage } from "@/helpers";
import { LoginResponse, TwoFactorResponse } from "@/types/dataFetching";
import { fetchData } from "@/services/fetchData";
import EncryptData from "@/helpers/EncryptData";
import { uiCloseModal, uiModal, uiSetLoading } from "../uiSlice";
import { errorMsg } from "@/mocks/mocks";


export const sessionStorageMiddleware = (state: MiddlewareAPI) => {
    return (next: Dispatch) => async (action: any) => {

        next(action);
        if (action.type === 'auth/loginData') {
            state.dispatch(uiSetLoading(true))
            const loginData = action.payload
            const user: LoginResponse = await fetchData('/manage-auth/signin', 'POST', loginData)
                .catch(err => {
                    state.dispatch(uiSetLoading(false))
                    state.dispatch(
                        uiModal({
                            modalFor: 'message',
                            modalOpen: true,
                            typeMsg: 'error',
                            msg: `${errorMsg[err.message]}`
                        })
                    )
                })
            if(user && !user.error) {
                setInSessionStorage('user-login-data', user.data)
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
            const userData: any = JSON.parse( getFromSessionStorage('user-login-data') || '' )
            const codeResponse: TwoFactorResponse = await fetchData('/manage-auth/signin-validation', 'POST', codeSend, userData.access.accessToken)
                .catch(err => {
                    state.dispatch(uiSetLoading(false))
                    state.dispatch(
                        uiModal({
                            modalFor: 'message',
                            modalOpen: true,
                            typeMsg: 'error',
                            msg: `${errorMsg[err.message]}`
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
                    uiCloseModal()
                )
            }, 2000)

            const encryptData = new EncryptData(`${process.env.NEXT_PUBLIC_SERVER_SECRET}`)
            const userDecrypted = encryptData.decrypt(userData.permissions)
            state.dispatch(login(userDecrypted.data))
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
            const userData: any = JSON.parse( getFromSessionStorage('user-login-data') || '' )
            const logoutResponse = await fetchData('/manage-auth/signout', 'GET', null, userData.access.accessToken)
            .catch(err => {
                console.log(err)
                state.dispatch(uiSetLoading(false))
                state.dispatch(
                    uiModal({
                        modalFor: 'message',
                        modalOpen: true,
                        typeMsg: 'error',
                        msg: `${errorMsg[err.message]}`
                    })
                )
                sessionStorage.clear();
            })
            if(!logoutResponse.error){
                state.dispatch(uiSetLoading(false))
                state.dispatch(
                    uiCloseModal()
                )
                sessionStorage.clear();
            }
        }
    }
}


