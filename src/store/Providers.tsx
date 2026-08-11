'use client';

import { Provider } from "react-redux";
import { store, useAppDispatch, useAppSelector } from "./";
import { useEffect } from "react";
import { clearRedux, getUserProfile, setAuthState } from "./slices/authSlice";
import { uiModal } from "./slices/uiSlice";
import { useRouter } from "next/navigation";
import { getCategories } from "./slices/categorySlice";
import { getProductAuditsStatuses } from "./slices/productSlice";
import { getStatus } from "./slices/manageUserSlice";
import SessionManager from "@/commons/Classes/SessionManager";
import { NotificationsProvider } from "@/contexts/NotificationsContext";
import CrossTabCookieManager from "@/commons/Classes/CrossTabCookieManager";
import { DASHBOARD_BASE_URL } from "@/commons/helpers/envs";

interface Props {
  children: React.ReactNode;
}

const AuthenticatedDataLoader = () => {
  const dispatch = useAppDispatch();
  const { isLogged, userProfile } = useAppSelector((state) => state.auth);
  const { categories } = useAppSelector((state) => state.category);
  const { productAuditsStatuses } = useAppSelector((state) => state.product);
  const { userStatusArray } = useAppSelector((state) => state.manageUser);

  useEffect(() => {
    if (!isLogged || !userProfile) return;

    if (categories.length === 0) {
      dispatch(getCategories('search?page=1&limit=30'));
    }
    if (productAuditsStatuses.length === 0) {
      dispatch(getProductAuditsStatuses());
    }
    if (userStatusArray.length === 0) {
      dispatch(getStatus());
    }
  }, [
    categories.length,
    dispatch,
    isLogged,
    productAuditsStatuses.length,
    userProfile,
    userStatusArray.length,
  ]);

  return null;
};

export const Providers = ({ children }: Props) => {

  const router = useRouter()

  useEffect(() => {
    // CADA VEZ QUE SE RECARGA LA PÁGINA SE PIERDE EL ESTADO GLOBAL.
    // POR LO TANTO DEBEMOS TRAER LA INFORMACIÓN DE LA SESIÓN ALMACENADA EN EL SESSION STORAGE
    // PARA HIDRATAR TODA LA APLICACIÓN CON LA MISMA.

    const session = SessionManager.getInstance();
    
    // Verificar si realmente hay una sesión válida
    if (session.isAuthenticated()) {
      const authData = session.getAuthData();
      
      if (authData) {
        // Establecer el estado de autenticación con los datos del usuario
        store.dispatch(setAuthState(authData));

        // Hacer una llamada simple para verificar si la sesión es válida
        // Si falla, los interceptors manejarán la redirección
        store.dispatch(getUserProfile());

      } else {
        // Si no hay datos válidos, limpiar el estado
        console.log('Datos de sesión inválidos, limpiando...');
        store.dispatch(clearRedux());
      }
    } else {
      // Si no hay sesión autenticada, limpiar el estado
      store.dispatch(clearRedux());
    }
  }, [router]);

  useEffect(() => {
    // Configurar sincronización de logout/login entre pestañas usando cookies
    const crossTabManager = CrossTabCookieManager.getInstance();
    const session = SessionManager.getInstance();
    
    // Configurar callback para logout desde otras pestañas
    crossTabManager.setLogoutCallback(async () => {
      console.log('🔄 Ejecutando logout sincronizado desde otra pestaña');
      
      // Limpiar estado Redux
      store.dispatch(clearRedux());
      
      // Limpiar sesión local (sin llamada API para evitar duplicados)
      try {
        // Limpiar propiedades del SessionManager manualmente
        (session as any).userSession = null;
        (session as any).authData = null;
        (session as any).token = '';
        (session as any).role = 0;
        (session as any).permission = [];
        (session as any).conn = '';
        
        // Limpiar cookies
        const { CookieUtils } = await import('@/commons/Classes/CookiesUtils');
        CookieUtils.clearSessionCookies();
      } catch (error) {
        console.error('Error limpiando sesión local:', error);
      }
      
      // CLIENTE: No redirigir, solo limpiar estado y mantener en la página actual
      console.log('✅ Sesión limpiada en cliente, estado resetado a sin sesión');
    });

    // Configurar callback para login desde otras pestañas
    crossTabManager.setLoginCallback(async () => {
      console.log('🔄 Login detectado desde otra pestaña, recargando...');
      
      // Recargar la página para hidratar con la nueva sesión
      setTimeout(() => {
        window.location.reload();
      }, 500);
    });

    // Limpiar al desmontar el componente
    return () => {
      crossTabManager.destroy();
    };
  }, []);

  return (
    <Provider store={store}>
      <AuthenticatedDataLoader />
      <NotificationsProvider>
        {children}
      </NotificationsProvider>
    </Provider>
  );
};
