import { NavigateAction } from "next/dist/client/components/router-reducer/router-reducer-types";
import { Dispatch, SetStateAction } from "react";

export interface DingPayload {
    setIsLoading: Dispatch<SetStateAction<boolean>>
    navigate?: NavigateAction
}

export interface LoginActionPayload extends DingPayload{
    path: string;
    user: {
        email: string;
        password: string;
    }
}