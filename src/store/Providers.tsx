'use client';


import { Provider } from "react-redux";
import { store } from "./";
import { useEffect } from "react";
import { getFromSessionStorage, getSession } from "@/helpers";
import { clearRedux, getUserProfile, setAuthState } from "./authSlice";
import { uiModal } from "./uiSlice";
import { useRouter } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

export const Providers = ({ children }: Props) => {

  const router = useRouter()

  useEffect(() => {
    // CADA VEZ QUE SE RECARGA LA PÁGINA SE PIERDE EL ESTADO GLOBAL.
    // POR LO TANTO DEBEMOS TRAER LA INFORMACIÓN DE LA SESIÓN ALMACENADA EN EL SESSION STORAGE
    // E HIDRATAR TODA LA APLICACIÓN CON LA MISMA.
    if (getFromSessionStorage('user-login-data')) {
      const user = getSession()
      if (!user.error) {
        store.dispatch(setAuthState(user.data))
        store.dispatch( getUserProfile() )
      } else {
        store.dispatch( clearRedux() )
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
    }
  }, [])

  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}