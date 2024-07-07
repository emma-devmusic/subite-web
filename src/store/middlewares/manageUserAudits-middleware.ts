import DecryptedSession from "@/helpers/Permissions";
import { ModulesPermissions, SearchUsersResponse } from "@/types";
import { Dispatch, MiddlewareAPI } from "@reduxjs/toolkit"
import { setRole, setUsers } from "../manageUserSlice";
import { isAdmin } from "@/helpers";
import { uiSetLoading } from "../uiSlice";
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
                console.log('Llamada a la Api - MANAGE-AUTH - SEARCH')
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

    }
}