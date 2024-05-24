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

            state.dispatch(uiModal({ modalFor: 'new_user', modalOpen: true, }))
            state.dispatch(uiSetLoading(true))

            const userRegister = await fetchData(`/manage-auth/create/${process.env.NEXT_PUBLIC_API_TENANT}`, 'POST', newUser)
                .catch(err => {
                    state.dispatch(
                        uiModalMessage({ msg: `${errorMsg[err.message]}`, typeMsg: 'error' })
                    )
                })
            if (userRegister && userRegister.error) {
                console.log(userRegister)
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

            const userValidationResponse = await fetchData(`/manage-auth/email-validation/${process.env.NEXT_PUBLIC_API_TENANT}`, 'POST', validateUserData)
                .catch(err => {
                    state.dispatch(
                        uiModalMessage({ msg: 'Parece que hubo un error al comunicar al servidor. Revisa tu conexión.', typeMsg: 'error' })
                    )
                })
            if (userValidationResponse.error) {
                console.log(userValidationResponse)
                state.dispatch(
                    uiModalMessage({ msg: userValidationResponse.message, typeMsg: 'error' })
                )
            }
            state.dispatch( 
                uiModalMessage({ msg: '¡Validación exitosa! Ahora puedes ingresar a la plataforma', typeMsg: 'success' })
            )
            state.dispatch(uiSetLoading(false))
        }

    }
}