import { Action, Dispatch, MiddlewareAPI } from "@reduxjs/toolkit";
import { RootState } from "..";

export const registerUserMiddleware = (state: MiddlewareAPI) => {
    return (next: Dispatch) => async (action: Action) => {

        next( action );

        if(action.type ==='auth/registerUser') {
            const { 
                auth: { newUser }, 
                iu: { loading } 
            } = state.getState() as RootState

            console.log(newUser)
        }

    }
}