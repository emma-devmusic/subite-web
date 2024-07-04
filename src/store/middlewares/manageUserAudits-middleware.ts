import DecryptedSession from "@/helpers/Permissions";
import { Dispatch, MiddlewareAPI } from "@reduxjs/toolkit"


export const manageUserAuditsMiddleware = (state: MiddlewareAPI) => {
    return (next: Dispatch) => async (action: any) => {
        next(action);

        if (action.type === 'manageUser/getUsers') {

            const session = new DecryptedSession();
            const userConfigId = session.getPermissionsId()['manage-users-audits']
            const permissionsUserConfig = session.getModuleById(userConfigId)
            console.log(session.getPermissionsId())
            console.log(permissionsUserConfig)

        }

    }
}