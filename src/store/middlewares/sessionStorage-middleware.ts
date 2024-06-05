
import { Dispatch, MiddlewareAPI } from "@reduxjs/toolkit";
import { loggear, login } from "../authSlice";
import { getSession } from "@/helpers";
import { LoginResponse, TwoFactorResponse, UserDataLogin } from "@/types/dataFetching";
import { fetchData } from "@/services/fetchData";
import EncryptData, { decryptLoginData, encryptLoginDataInSessionStorage } from "@/helpers/EncryptData";
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
                            msg: `${errorMsg[err.message]}`
                        })
                    )
                })
            if(user && !user.error) {
                // const encrypter = new EncryptData(`${process.env.NEXT_PUBLIC_SERVER_SECRET}`);
                // console.log(encrypter.decrypt(user.data.permissions))
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

            const userData: any = decryptLoginData()
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

            console.log('Llamada a la Api - USER LOGOUT')
            const logoutResponse = await fetchData('/manage-auth/signout', 'GET', null, userData.data.access.accessToken)
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


