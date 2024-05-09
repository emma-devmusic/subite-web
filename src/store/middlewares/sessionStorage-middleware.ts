import { Action, Dispatch, MiddlewareAPI } from "@reduxjs/toolkit";
import { RootState } from "..";


export const sessionStorageMiddleware = (state: MiddlewareAPI) => {
    return ( next: Dispatch ) => ( action: Action ) => {
        next( action );
        if(action.type === 'auth/login') {
            const { auth } = state.getState() as RootState
            sessionStorage.setItem('user', JSON.stringify( auth.user ))
        }
        if(action.type === 'auth/logout') {
            sessionStorage.clear();
        }
    }
}