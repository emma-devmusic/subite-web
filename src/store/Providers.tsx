'use client';


import { Provider } from "react-redux";
import { store } from "./";
import { useEffect } from "react";
import { getSession } from "@/helpers";
import { setAuthState } from "./authSlice";
import { uiModal, uiModalMessage } from "./uiSlice";
import { useRouter } from "next/navigation";


interface Props {
  children: React.ReactNode;
}

export const Providers = ({ children }: Props) => {

  const router = useRouter()

  useEffect(() => {
    const user = getSession()
    if(!user.error) {
      store.dispatch( setAuthState( user.data ) )
    } else {
       store.dispatch(
        uiModal({
          modalFor: 'message',
          msg: 'No se pudo cargar el usuario.',
          modalOpen: true,
          typeMsg: 'error'
        })
       )
       router.push('/login')
    }
  },[])

  return (
    <Provider store={ store }>
      { children }
    </Provider>
  )
}