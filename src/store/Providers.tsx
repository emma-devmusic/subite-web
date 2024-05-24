'use client';


import { Provider } from "react-redux";
import { store } from "./";
import { useEffect } from "react";
import { getSession } from "@/helpers";
import { setAuthState } from "./authSlice";
import { useRouter } from "next/navigation";


interface Props {
  children: React.ReactNode;
}

export const Providers = ({ children }: Props) => {


  useEffect(() => {
    const user = getSession();
    store.dispatch( setAuthState( user.data ) )
  },[])

  return (
    <Provider store={ store }>
      { children }
    </Provider>
  )
}