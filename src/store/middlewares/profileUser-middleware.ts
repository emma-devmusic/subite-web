
import { Dispatch, MiddlewareAPI } from "@reduxjs/toolkit";
import { UserProfileToRedux } from "../authSlice";
import { ImagesProfileUpdateResponse, SendEmailVerificationResponse } from "@/types/dataFetching";
import { fetchData } from "@/services/fetchData";
import { decryptLoginData } from "@/helpers";
import { uiModal, uiSetLoading } from "../uiSlice";
import { errorMsg } from "@/mocks/mocks";
import { GetUserProfile, ImageProfileState } from "@/types";
import DecryptedSession from "@/helpers/Permissions";

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
                            msg: `${err}`
                        })
                    )
                })
            if (user && !user.error) {
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
            } else {
                state.dispatch(
                    uiModal({
                        modalFor: 'message',
                        modalOpen: true,
                        typeMsg: 'error',
                        msg: 'No se puede cargar el usuario'
                    })
                )
                state.dispatch(uiSetLoading(false))
                window.location.replace('/login')
                sessionStorage.clear()
            }
        }




        if (action.type === 'auth/sendMailVerification') {
            state.dispatch(uiSetLoading(true))
            const userData: any = decryptLoginData()
            console.log('Llamada a la Api - USER PROFILE - ENVIO DE EMAIL PARA VERIFICACION')
            const resp: SendEmailVerificationResponse = await fetchData('/user-profile/verify-email', 'GET', null, userData.data.access?.accessToken)
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
                state.dispatch(
                    uiModal({
                        modalFor: 'validate_code',
                        modalOpen: true,
                    })
                )
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
            action.payload.images.forEach((file: any) => {
                formData.append('files', file);
            })
            formData.append('default', action.payload.imageSelected.name)
            const userData: any = decryptLoginData()
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user-profile/add/image`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${userData.data.access.accessToken}`
                    },
                    body: formData
                });

                if (!response.ok) {
                    state.dispatch(uiSetLoading(true))
                    state.dispatch(
                        uiModal({
                            modalFor: 'message',
                            modalOpen: true,
                            typeMsg: 'error',
                            msg: 'Ocurrió un error en el envío de datos'
                        })
                    )
                    throw new Error(response.statusText);
                }

                const resp = await response.json();

                if (!resp.error) {
                    state.dispatch(
                        uiModal({
                            modalFor: 'message',
                            modalOpen: true,
                            typeMsg: 'success',
                            msg: 'Datos enviados correctamente.'
                        })
                    )
                    state.dispatch(uiSetLoading(false))
                    window.location.reload()
                }

            } catch (err: any) {
                state.dispatch(uiSetLoading(true))
                state.dispatch(
                    uiModal({
                        modalFor: 'message',
                        modalOpen: true,
                        typeMsg: 'error',
                        msg: 'Ocurrió un error en el envío de datos'
                    })
                )
            }
        }


        if (action.type === 'auth/updateImageProfile') {
            const imgState: ImageProfileState = action.payload
            state.dispatch(uiSetLoading(true))
            const userData: any = decryptLoginData()
            const imgProfileUpdate = {
                ...(imgState.imageProfileSelected && { default: imgState.imageProfileSelected?.id }),
                ...(imgState.imagesToDelete.length > 0 && { delete: imgState.imagesToDelete })
            }
            console.log('Llamada a la Api - USER PROFILE - UPDATE IMAGES PROFILE')
            const resp: ImagesProfileUpdateResponse = await fetchData('/user-profile/update/image', 'PATCH', imgProfileUpdate, userData.data.access?.accessToken)
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
                    window.location.reload()

                })
            if (!resp.error) {
                state.dispatch(uiSetLoading(false))
                state.dispatch(
                    uiModal({
                        modalFor: 'message',
                        modalOpen: true,
                        typeMsg: 'success',
                        msg: '¡Actualización Exitosa!'
                    })
                )
                window.location.reload()
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


    }
}
