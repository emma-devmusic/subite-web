import { Dispatch, MiddlewareAPI } from "@reduxjs/toolkit";


export const configUserMiddleware = (state: MiddlewareAPI) => {
    return (next: Dispatch) => async (action: any) => {
        next(action);
 
        if (action.type === 'auth/newPassword') {
            
            

        }
 
    }
}