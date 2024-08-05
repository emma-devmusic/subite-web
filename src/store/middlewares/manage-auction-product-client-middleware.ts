import { Dispatch, MiddlewareAPI } from "@reduxjs/toolkit";

export const manageUserAuditsMiddleware = (state: MiddlewareAPI) => {
    return (next: Dispatch) => async (action: any) => {
        next(action);


        



    }
}