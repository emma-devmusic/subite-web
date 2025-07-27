'use client';

import { Provider } from "react-redux";
import { store } from "./";
import { useEffect } from "react";
import { clearRedux, getUserProfile, setAuthState } from "./slices/authSlice";
import { uiModal } from "./slices/uiSlice";
import { useRouter } from "next/navigation";
import { getCategories } from "./slices/categorySlice";
import { getProductAuditsStatuses } from "./slices/productSlice";
import { getStatus } from "./slices/manageUserSlice";
import SessionManager from "@/commons/Classes/SessionManager";

interface Props {
  children: React.ReactNode;
}

export const Providers = ({ children }: Props) => {

  const router = useRouter()

  useEffect(() => {
    // CADA VEZ QUE SE RECARGA LA PÁGINA SE PIERDE EL ESTADO GLOBAL.
    // POR LO TANTO DEBEMOS TRAER LA INFORMACIÓN DE LA SESIÓN ALMACENADA EN EL SESSION STORAGE
    // PARA HIDRATAR TODA LA APLICACIÓN CON LA MISMA.

    const session = SessionManager.getInstance();

    if (session.isAuthenticated()) {
      const authData = session.getAuthData();
      debugger
      if (authData) {
        // Establecer el estado de autenticación con los datos del usuario
        store.dispatch(setAuthState(authData));

        // Obtener el perfil del usuario
        store.dispatch(getUserProfile());

        // Cargar datos adicionales si no están disponibles
        if (store.getState().category.categories.length === 0) {
          store.dispatch(getCategories('search?page=1&limit=30'));
        }
        if (store.getState().product.productAuditsStatuses.length === 0) {
          store.dispatch(getProductAuditsStatuses());
        }
        if (store.getState().manageUser.userStatusArray.length === 0) {
          store.dispatch(getStatus());
        }
      } else {
        // Si no hay datos válidos, limpiar el estado
        store.dispatch(clearRedux());
        store.dispatch(
          uiModal({
            modalFor: 'message',
            msg: 'No se pudo cargar el usuario.',
            modalOpen: true,
            typeMsg: 'error'
          })
        );
        router.push('/login');
      }
    } else {
      // Si no hay sesión autenticada, limpiar el estado
      store.dispatch(clearRedux());
    }
  }, [router]);

  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};