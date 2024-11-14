'use client';


import { Provider } from "react-redux";
import { store } from "./";
import { useEffect } from "react";
import { getFromSessionStorage, getSession } from "@/helpers";
import { clearRedux, getUserProfile, setAuthState } from "./slices/authSlice";
import { uiModal } from "./slices/uiSlice";
import { useRouter } from "next/navigation";
import { getCategories } from "./slices/categorySlice";
import { getProductAuditsStatuses } from "./slices/productSlice";
import { getStatus } from "./slices/manageUserSlice";
import { getHomeProducts } from "./slices/homeSlice";

interface Props {
  children: React.ReactNode;
}

export const Providers = ({ children }: Props) => {

  const router = useRouter()

  useEffect(() => {
    
    store.dispatch( getHomeProducts('search?page=1&limit=10') )

    // CADA VEZ QUE SE RECARGA LA PÁGINA SE PIERDE EL ESTADO GLOBAL.
    // POR LO TANTO DEBEMOS TRAER LA INFORMACIÓN DE LA SESIÓN ALMACENADA EN EL SESSION STORAGE
    // PARA HIDRATAR TODA LA APLICACIÓN CON LA MISMA.
    if (getFromSessionStorage('user-login-data')) {
      const user = getSession()
      if (!user?.error) {
        store.dispatch(setAuthState(user?.data))
        store.dispatch( getUserProfile() )

        if(store.getState().category.categories.length === 0) {
          store.dispatch( getCategories('search?page=1&limit=30') )
        }
        if(store.getState().product.productAuditsStatuses.length === 0){
          store.dispatch( getProductAuditsStatuses() )
        }
        if(store.getState().manageUser.userStatusArray.length === 0){
          store.dispatch( getStatus() )
        }
        
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