
import { Dispatch, MiddlewareAPI } from "@reduxjs/toolkit";
import { UserProfileToRedux, loggear, login } from "../authSlice";
import { getSession } from "@/helpers";
import { ImagesProfileSendResponse, LoginResponse, SendEmailVerificationResponse, TwoFactorResponse, UserDataLogin } from "@/types/dataFetching";
import { fetchData } from "@/services/fetchData";
import EncryptData, { decryptLoginData, encryptLoginDataInSessionStorage } from "@/helpers/EncryptData";
import { uiCloseModal, uiModal, uiSetLoading } from "../uiSlice";
import { errorMsg } from "@/mocks/mocks";
import { GetUserProfile } from "@/types";

export const profileUserMiddleware = (state: MiddlewareAPI) => {
    return (next: Dispatch) => async (action: any) => {

        next(action);
        if (action.type === 'auth/getUserProfile') {
            state.dispatch(uiSetLoading(true))
            const userData: any = decryptLoginData()
            console.log('Llamada a la Api - USER PROFILE')
            const user: GetUserProfile = await fetchData('/user-profile/search', 'GET', null, userData.data.access.accessToken)
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
            if (!user.error) {
                state.dispatch(
                    UserProfileToRedux(user.data)

                )
                state.dispatch(
                    uiModal({
                        modalFor: 'message',
                        modalOpen: true,
                        typeMsg: 'success',
                        msg: 'Datos cargados correctamente'
                    })
                )
                state.dispatch(uiSetLoading(false))
            }
        }

        if (action.type === 'auth/sendMailVerification') {
            state.dispatch(uiSetLoading(true))
            const userData: any = decryptLoginData()
            console.log('Llamada a la Api - USER PROFILE - ENVIO DE EMAIL PARA VERIFICACION')
            const resp: SendEmailVerificationResponse = await fetchData('/user-profile/verify-email', 'GET', null, userData.data.access.accessToken)
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
            if (!resp.error) {
                state.dispatch(uiSetLoading(false))
            } else {
                state.dispatch(uiSetLoading(false))
                state.dispatch(
                    uiModal({
                        modalFor: 'message',
                        modalOpen: true,
                        typeMsg: 'error',
                        msg: `${errorMsg[resp.message]}`
                    })
                )
            }
        }

        if (action.type === 'auth/savingImages') {
            state.dispatch(uiSetLoading(true))
            const formData = new FormData();
            action.payload.images.forEach( (file:any) => {
                formData.append('files', file);
            })
            formData.append('default', action.payload.imageSelected.name)
            
            // const objToDatabase = {
            //     files: action.payload.images,
            //     default: action.payload.imageSelected.name
            // }

            const userData: any = decryptLoginData()
            
            const resp: ImagesProfileSendResponse = await fetchData(
                '/user-profile/add/image',
                'POST',
                formData,
                userData.data.access.accessToken,
                { "Content-Type": "multipart/form-data" }
            )
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
            if (!resp.error) {
                console.log(resp);
            }
        }
    }
}
