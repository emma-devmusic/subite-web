import DecryptedSession from "@/helpers/Permissions";
import { AuditDocumentResponse, ModulesPermissions, SearchUser, SearchUsersResponse, SetNewUserStatusResponse, UserStatusResponse } from "@/types";
import { Dispatch, MiddlewareAPI } from "@reduxjs/toolkit"
import { setDocument, setRole, setSelectStatus, setUser, setUsers } from "../manageUserSlice";
import { uiModal, uiSetLoading } from "../uiSlice";
import { decryptLoginData } from "@/helpers";
import { fetchData } from "@/services/fetchData";
import Swal from "sweetalert2";


export const manageUserAuditsMiddleware = (state: MiddlewareAPI) => {
    return (next: Dispatch) => async (action: any) => {
        next(action);

        if (action.type === 'manageUser/getUsers') {
            state.dispatch(uiSetLoading(true))
            const userData: any = decryptLoginData()
            try {
                console.log('Llamada a la Api - MANAGE-USER-AUDITS - SEARCH USERS')
                const usersSearch: SearchUsersResponse = await fetchData(`/manage-users/${action.payload}`, 'GET', null, userData.data.access.accessToken)
                if (!usersSearch.error) {
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




        if (action.type === 'manageUser/getUser') {
            state.dispatch(uiSetLoading(true))
            const userData: any = decryptLoginData()
            try {
                console.log('Llamada a la Api - MANAGE-USER-AUDITS - SEARCH 1 USER')
                const userSearch: SearchUser = await fetchData(`/manage-users/details/${action.payload}`, 'GET', null, userData.data.access.accessToken)
                if (!userSearch.error) {
                    state.dispatch(setUser(userSearch.data))
                } else {
                    Swal.fire('Error', userSearch.message, 'error')
                    location.replace('/dashboard/users')
                }
                state.dispatch(uiSetLoading(false))
            } catch (error) {
                state.dispatch(uiSetLoading(false))
                Swal.fire('Error', 'Ocurrió un error al conectar con la base de datos', 'error')
                location.replace('/dashboard/users')

            }
        }


        if (action.type === 'manageUser/getDocument') {
            state.dispatch(uiSetLoading(true))
            const userData: any = decryptLoginData()
            try {
                console.log('Llamada a la Api - MANAGE-USER-AUDITS - GET DOCUMENT')
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



        if (action.type === 'manageUser/getStatus') {
            state.dispatch(uiSetLoading(true))
            const userData: any = decryptLoginData()
            try {
                console.log('Llamada a la Api - MANAGE-USER-AUDITS - GET STATUS')
                const userDocument: UserStatusResponse = await fetchData(`/manage-users-audits/get-status`, 'GET', null, userData.data.access.accessToken)
                if (!userDocument.error) {
                    state.dispatch(setSelectStatus(userDocument.data))
                } else {
                    Swal.fire('Error', userDocument.message, 'error')
                }
                state.dispatch(uiSetLoading(false))
            } catch (error) {
                state.dispatch(uiSetLoading(false))
                Swal.fire('Error', 'Ocurrió un error al conectar con la base de datos', 'error')
            }
        }


        if (action.type === 'manageUser/setStatusAccount') {
            state.dispatch(uiSetLoading(true))
            const userData: any = decryptLoginData()
            try {
                const userIdToChangeStatus = action.payload.id;
                const dataBody = {
                    status: parseInt(action.payload.status),
                    note: action.payload.note
                }

                console.log('Llamada a la Api - MANAGE-USER-AUDITS - SET STATUS ACCOUNT')
                const resp: SetNewUserStatusResponse = await fetchData(`/manage-users-audits/audit-identity/${userIdToChangeStatus}`, 'PATCH', dataBody , userData.data.access.accessToken)
                if (!resp.error) {
                    Swal.fire('Estado de Cuenta Actualizado', resp.message, 'success')
                } else {
                    Swal.fire('Error', resp.message, 'error')
                }
                state.dispatch(uiSetLoading(false))
            } catch (error) {
                state.dispatch(uiSetLoading(false))
                Swal.fire('Error', 'Ocurrió un error al conectar con la base de datos', 'error')
            }
        }


        if (action.type === 'manageUser/deleteUser') {
            state.dispatch(uiSetLoading(true))
            const userData: any = decryptLoginData()
            try {
                console.log('Llamada a la Api - MANAGE-USER-AUDITS - DELETE USER')
                const resp: any = await fetchData(`/manage-users/delete-user/${action.payload}`, 'DELETE', null , userData.data.access.accessToken)
                if (!resp.error) {
                    Swal.fire('Baja de Usuario', resp.message, 'success')
                } else {
                    Swal.fire('Error', resp.message, 'error')
                }
                state.dispatch(uiSetLoading(false))
                location.reload()
            } catch (error) {
                state.dispatch(uiSetLoading(false))
                Swal.fire('Error', 'Ocurrió un error al conectar con la base de datos', 'error')
            }
        }
        

    }
}