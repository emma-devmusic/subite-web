import DecryptedSession from "@/helpers/Permissions";
import { AuditDocumentResponse, ModulesPermissions, SearchUser, SearchUsersResponse } from "@/types";
import { Dispatch, MiddlewareAPI } from "@reduxjs/toolkit"
import { setDocument, setRole, setUser, setUsers } from "../manageUserSlice";
import { uiModal, uiSetLoading } from "../uiSlice";
import { decryptLoginData } from "@/helpers/EncryptData";
import { fetchData } from "@/services/fetchData";
import Swal from "sweetalert2";


export const manageUserAuditsMiddleware = (state: MiddlewareAPI) => {
    return (next: Dispatch) => async (action: any) => {
        next(action);

        if (action.type === 'manageUser/getUsers') {
            state.dispatch(uiSetLoading(true))
            const userData: any = decryptLoginData()
            try {
                console.log('Llamada a la Api - MANAGE-AUTH - SEARCH USERS')
                const usersSearch: SearchUsersResponse = await fetchData(`/manage-users/${action.payload}`, 'GET', null, userData.data.access.accessToken)
                if (!usersSearch.error) {
                    console.log(usersSearch.data)
                    state.dispatch(setUsers(usersSearch.data.items))
                } else {
                    Swal.fire('Error', usersSearch.message, 'error')
                }
                state.dispatch(uiSetLoading(false))
            } catch (error) {
                state.dispatch(uiSetLoading(false))
                Swal.fire('Error', 'Ocurrió un error al conectar con la base de datos', 'error')
            }

        }


        if (action.type === 'manageUser/getPermissions') {
            const session = new DecryptedSession()
            const isUserAdmin = session.getRoleId() === 1
            state.dispatch(setRole(isUserAdmin))
        }



        if(action.type === 'manageUser/getUser') {
            state.dispatch(uiSetLoading(true))
            const userData: any = decryptLoginData()
            try {
                console.log('Llamada a la Api - MANAGE-AUTH - SEARCH 1 USER')
                const userSearch: SearchUser = await fetchData(`/manage-users/details/${action.payload}`, 'GET', null, userData.data.access.accessToken)
                if (!userSearch.error) {
                    console.log(userSearch.data)
                    state.dispatch(setUser(userSearch.data))
                } else {
                    Swal.fire('Error', userSearch.message, 'error')
                }
                state.dispatch(uiSetLoading(false))
            } catch (error) {
                state.dispatch(uiSetLoading(false))
                Swal.fire('Error', 'Ocurrió un error al conectar con la base de datos', 'error')
            }
        }

        if(action.type === 'manageUser/getDocument') {
            state.dispatch(uiSetLoading(true))
            const userData: any = decryptLoginData()
            try {
                console.log('Llamada a la Api - MANAGE-AUTH - GET DOCUMENT')
                const userDocument: AuditDocumentResponse = await fetchData(`/manage-users/details/${action.payload}`, 'GET', null, userData.data.access.accessToken)
                if (!userDocument.error) {
                    console.log(userDocument.data)
                    state.dispatch(setDocument(userDocument.data))
                    state.dispatch(
                        uiModal({
                            modalOpen: true,
                            modalFor: 'audit_document',
                            modalTitle: 'Auditando Documentación'
                        })
                    )
                } else {
                    Swal.fire('Error', userDocument.message, 'error')
                }
                state.dispatch(uiSetLoading(false))
            } catch (error) {
                state.dispatch(uiSetLoading(false))
                Swal.fire('Error', 'Ocurrió un error al conectar con la base de datos', 'error')
            }
        }


    }
}