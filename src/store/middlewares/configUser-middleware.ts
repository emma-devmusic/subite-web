import { fetchData } from "@/services/fetchData";
import { EmailChangeResponse, PasswordChangeResponse, TwoFactorChangeResponse, ValidateNewEmailResponse } from "@/types";
import { Dispatch, MiddlewareAPI } from "@reduxjs/toolkit";
import { uiModal, uiSetLoading } from "../uiSlice";
import { decryptLoginData } from "@/helpers";
import { clearRedux } from "../authSlice";


export const configUserMiddleware = (state: MiddlewareAPI) => {
    return (next: Dispatch) => async (action: any) => {

        next(action);

        if (action.type === 'auth/newPassword') {
            state.dispatch(uiSetLoading(true))
            const userData: any = decryptLoginData()
            try {
                console.log('Llamada a la Api - NEW PASSWORD')
                const resp: PasswordChangeResponse = await fetchData('/user-config/auth-data', 'PATCH', action.payload, userData.data.access.accessToken)
                if (!resp.error) {
                    state.dispatch(uiSetLoading(false))
                    state.dispatch(
                        uiModal({
                            modalFor: 'message',
                            modalOpen: true,
                            typeMsg: 'success',
                            msg: `Contraseña Actualizada.`
                        }))
                }
            } catch (resp) {
                state.dispatch(uiSetLoading(false))
                state.dispatch(
                    uiModal({
                        modalFor: 'message',
                        modalOpen: true,
                        typeMsg: 'error',
                        msg: `${resp}`
                    }))
            }
        }



        if (action.type === 'auth/changeEmail') {
            state.dispatch(uiSetLoading(true))
            const userData: any = decryptLoginData()
            try {
                const resp: EmailChangeResponse = await fetchData('/user-config/auth-data', 'PATCH', action.payload, userData.data.access.accessToken)
                if (!resp.error) {
                    state.dispatch(uiSetLoading(false))
                    state.dispatch(
                        uiModal({
                            modalFor: 'validate_new_email',
                            modalOpen: true,
                            typeMsg: 'success',
                            msg: `${resp.data[0]}`
                        }))
                }
            } catch (error) {
                state.dispatch(uiSetLoading(false))
                state.dispatch(
                    uiModal({
                        modalFor: 'message',
                        modalOpen: true,
                        typeMsg: 'error',
                        msg: `${error}`
                    }))
            }
        }




        if (action.type === 'auth/validate_email') {
            state.dispatch(uiSetLoading(true))
            const userData: any = decryptLoginData()
            try {
                const resp: ValidateNewEmailResponse = await fetchData('/user-config/validate-email', 'POST', action.payload, userData.data.access.accessToken)
                if (!resp.error) {
                    state.dispatch(uiSetLoading(false))
                    state.dispatch(
                        uiModal({
                            modalFor: 'message',
                            modalOpen: true,
                            typeMsg: 'success',
                            msg: `Email Actualizado`
                        }))
                    location.reload()
                }
            } catch (error) {
                state.dispatch(uiSetLoading(false))
                state.dispatch(
                    uiModal({
                        modalFor: 'message',
                        modalOpen: true,
                        typeMsg: 'error',
                        msg: `${error}`
                    }))
            }
        }


        //********************************ENVIO DEL TRUE O FALSE DEL SEGUNDO FACTOR DE AUTETICACION */
        if (action.type === 'auth/two_factor_change') {
            state.dispatch(uiSetLoading(true))
            const userData: any = decryptLoginData()
            try {
                const resp: TwoFactorChangeResponse = await fetchData('/user-config/auth-data', 'PATCH', action.payload, userData.data.access.accessToken)
                if (!resp.error) {
                    state.dispatch(uiSetLoading(false))
                    state.dispatch(
                        uiModal({
                            modalFor: '2F_code_change',
                            modalOpen: true,
                        }))
                } else {
                    state.dispatch(uiSetLoading(false))
                    state.dispatch(
                        uiModal({
                            modalFor: 'message',
                            modalOpen: true,
                            typeMsg: 'error',
                            msg: `${resp.message}`
                        }))
                }
            } catch (error) {
                state.dispatch(uiSetLoading(false))
                state.dispatch(
                    uiModal({
                        modalFor: 'message',
                        modalOpen: true,
                        typeMsg: 'error',
                        msg: `${error}`
                    }))
            }
        }


        //******************ENVÍO DEL CÓDIGO */
        if (action.type === 'auth/send_two_factor_code_change') {
            state.dispatch(uiSetLoading(true))
            const userData: any = decryptLoginData()

            try {
                const resp = await fetchData(
                    '/user-config/validate-sec',
                    'POST',
                    action.payload,
                    userData.data.access.accessToken,
                    { verify: `${process.env.NEXT_PUBLIC_VERIFY}` }
                )

                if (!resp.error) {
                    state.dispatch(uiSetLoading(false))
                    state.dispatch(
                        uiModal({
                            modalFor: 'message',
                            modalOpen: true,
                            typeMsg: 'success',
                            msg: 'Hecho. Ya cambió su configuración.'
                        }))
                }
                location.reload()
            } catch (error) {
                state.dispatch(uiSetLoading(false))
                state.dispatch(
                    uiModal({
                        modalFor: 'message',
                        modalOpen: true,
                        typeMsg: 'error',
                        msg: `${error}`
                    }))
            }
        }



        if (action.type === 'auth/delete_account') {
            state.dispatch(uiSetLoading(true))
            const userData: any = decryptLoginData()
            try {
                const resp = await fetchData(
                    '/user-config/delete-user',
                    'DELETE',
                    null,
                    userData.data.access.accessToken
                )

                if (!resp.error) {
                    state.dispatch(uiSetLoading(false))
                    state.dispatch(
                        uiModal({
                            modalFor: 'message',
                            modalOpen: true,
                            typeMsg: 'success',
                            msg: 'Lamentamos mucho que te vayas. ¡Sientete libre de volve cuando quieras!'
                        }))
                }
                sessionStorage.clear()
                state.dispatch( clearRedux() )
                location.replace('/')

            } catch (error) {
                state.dispatch(uiSetLoading(false))
                state.dispatch(
                    uiModal({
                        modalFor: 'message',
                        modalOpen: true,
                        typeMsg: 'error',
                        msg: `${error}`
                    }))
                
            }
        }

        if(action.type === 'auth/verify_account') {
            state.dispatch(uiSetLoading(true))
            const userData: any = decryptLoginData()
            const formData = new FormData();
            action.payload.document.forEach((file: any) => {
                formData.append('document', file)
            })
            formData.append('selfie', action.payload.selfie[0])

            try {
                const response: any = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/manage-users-audits/request-validation`, {
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
                            msg: response.message
                        })
                    )
                    state.dispatch(uiSetLoading(false))
                    throw new Error(response.statusText);

                }

                const resp = await response.json();

                if (!resp.error) {
                    state.dispatch(
                        uiModal({
                            modalFor: 'message',
                            modalOpen: true,
                            typeMsg: 'success',
                            msg: 'Documentación enviada correctamente.'
                        })
                    )
                    state.dispatch(uiSetLoading(false))
                    window.location.reload()
                    state.dispatch(uiSetLoading(false))

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
                state.dispatch(uiSetLoading(false))

            }
        }

    }
}