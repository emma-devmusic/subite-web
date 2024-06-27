import { fetchData } from "@/services/fetchData";
import { PasswordChangeResponse } from "@/types";
import { Dispatch, MiddlewareAPI } from "@reduxjs/toolkit";
import { uiModal, uiSetLoading } from "../uiSlice";
import { errorMsg } from "@/mocks/mocks";
import { decryptLoginData } from "@/helpers/EncryptData";


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
                            msg: `Contraseña Actualizado`
                        })
                    )
                } 
                // else {
                //     console.log(resp)
                //     state.dispatch(uiSetLoading(false))
                //     state.dispatch(
                //         uiModal({
                //             modalFor: 'message',
                //             modalOpen: true,
                //             typeMsg: 'error',
                //             msg: `${errorMsg[resp.message]}`
                //         })
                //     )
                // }

            } catch (resp) {
                state.dispatch(uiSetLoading(false))
                state.dispatch(
                    uiModal({
                        modalFor: 'message',
                        modalOpen: true,
                        typeMsg: 'error',
                        msg: `${resp}`
                    })
                )
            }
        }

    }
}