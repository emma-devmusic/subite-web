
import { Action, Dispatch, MiddlewareAPI } from "@reduxjs/toolkit";
import { RootState } from "..";
import { login } from "../authSlice";
import { setInSessionStorage } from "@/helpers";
import { LoginResponse } from "@/types/dataFetching";
import { fetchData } from "@/services/fetchData";
import EncryptData from "@/helpers/EncryptData";


export const sessionStorageMiddleware = (state: MiddlewareAPI) => {
    return ( next: Dispatch ) => async ( action: Action ) => {

        next( action );


        if(action.type ==='auth/loginData') {
            
            const { 
                auth: { loginData }, 
            } = state.getState() as RootState

            const user:LoginResponse = await fetchData('/manage-auth/signin', 'POST', loginData)
            
            // setInSessionStorage('user', user.data)
            console.log(user.data.permissions)
            const encryptData = new EncryptData(`${process.env.NEXT_PUBLIC_SERVER_SECRET}`)
            const dataDecrypted = encryptData.decrypt(user.data.permissions)
            console.log(dataDecrypted)
        }
        // 

        if(action.type === 'auth/login') {
            const { auth } = state.getState() as RootState
            sessionStorage.setItem('user', JSON.stringify( auth.user ))
            
        }


        if(action.type === 'auth/logout') {
            sessionStorage.clear();
        }

    }
}


