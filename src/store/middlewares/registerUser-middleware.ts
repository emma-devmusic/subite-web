import { Action, Dispatch, MiddlewareAPI } from "@reduxjs/toolkit";
import { RootState, store } from "..";
import { fetchData } from "@/services/fetchData";
import { RegisterResponse } from "@/types/dataFetching";
import { uiMenu, uiModal, uiModalMessage, uiSetLoading } from "../uiSlice";
import Swal from 'sweetalert2'
import { errorMsg } from "@/mocks/mocks";

export const registerUserMiddleware = (state: MiddlewareAPI) => {
    return (next: Dispatch) => async (action: Action) => {

        next(action);

        if (action.type === 'auth/registerUser') {

            const {
                auth: { newUser },
            } = state.getState() as RootState

            state.dispatch(uiModal({ modalFor: 'validate_code', modalOpen: true, }))
            state.dispatch(uiSetLoading(true))

            console.log('Llamada a la Api - USER REGISTER - POST DE NUEVO USUARIO')
            const userRegister = await fetchData(`/manage-auth/create/${process.env.NEXT_PUBLIC_API_TENANT}`, 'POST', newUser)
                .catch(err => {
                    state.dispatch(
                        uiModalMessage({ msg: `${errorMsg[err.message]}`, typeMsg: 'error' })
                    )
                })
            if (userRegister && userRegister.error) {
                state.dispatch(
                    uiModalMessage({ msg: userRegister.message, typeMsg: 'info' })
                )
            }
            state.dispatch(uiSetLoading(false))
        }

        if (action.type === 'auth/email_validation') {
            const {
                auth: { validateUserData },
            } = state.getState() as RootState
            state.dispatch(uiSetLoading(true))

            console.log('Llamada a la Api - USER REGISTER - ENVIO DE EMAIL PARA VERIFICACION')
            const userValidationResponse = await fetchData(`/manage-auth/email-validation/${process.env.NEXT_PUBLIC_API_TENANT}`, 'POST', validateUserData)
                .catch(err => {
                    state.dispatch(uiSetLoading(false))
                    state.dispatch(
                        uiModalMessage({ msg: err, typeMsg: 'error' })
                    )
                })
            if (userValidationResponse.error) {
                state.dispatch(uiSetLoading(false))
                state.dispatch(
                    uiModalMessage({ msg: userValidationResponse.message, typeMsg: 'error' })
                )
            } else {
                state.dispatch( 
                    uiModalMessage({ msg: '¡Validación exitosa! Ahora puedes ingresar a la plataforma', typeMsg: 'success' })
                )
                state.dispatch(uiSetLoading(false))
            }
        }

    }
}