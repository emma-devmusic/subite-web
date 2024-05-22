import { Action, Dispatch, MiddlewareAPI } from "@reduxjs/toolkit";
import { RootState, store } from "..";
import { fetchData } from "@/services/fetchData";
import { RegisterResponse } from "@/types/dataFetching";
import { uiMenu, uiModal, uiSetLoading } from "../uiSlice";

export const registerUserMiddleware = (state: MiddlewareAPI) => {
    return (next: Dispatch) => async (action: Action) => {

        next( action );

        if(action.type ==='auth/registerUser') {
            const { 
                auth: { newUser }, 
                ui: { loading } 
            } = state.getState() as RootState
            
            state.dispatch( uiSetLoading(true) )
            state.dispatch( uiModal({modalFor:'new_user', modalOpen: true}) )

            setTimeout( () => {
                
                console.log(newUser)
                state.dispatch( uiSetLoading(false) )
            }, 2000)

            // const userRegister:RegisterResponse = await fetchData(`/manage-auth/create/:${process.env.NEXT_PUBLIC_API_TENANT}`, 'POST', newUser)
            // if(!userRegister.error) {
            // } 
        }

    }
}