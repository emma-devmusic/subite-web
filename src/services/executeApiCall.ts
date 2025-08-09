// src/services/apiHelper.ts
import { Dispatch } from '@reduxjs/toolkit';
import { clearRedux } from '@/store/slices/authSlice';
import { uiModal } from '@/store/slices/uiSlice';
import { ResponseApiDing } from '@/types/api';
import { CookieUtils } from '@/commons/Classes/CookiesUtils';

export async function executeApiCall<T>(
    setIsLoading: (loading: boolean) => void,
    apiCall: () => Promise<ResponseApiDing<T>>,
    dispatch: Dispatch,
    onSuccess?: (response: ResponseApiDing<T>) => void,
    successMessage?: string,
    onAccept?: () => void
): Promise<ResponseApiDing<T> | void> {
    const redirectToLogin = () => {
        dispatch(clearRedux());
        CookieUtils.clearSessionCookies();
        window.location.href = '/login';
    };
    const onOutOfSession = () => {
        setTimeout(() => {
            redirectToLogin();
        }, 3000);
    };
    const showError = (message: string, onAccept?: () => void, onClose?: () => void) =>
        dispatch(
            uiModal({
                modalFor: 'message',
                modalOpen: true,
                typeMsg: 'error',
                msg: message,
                modalTitle: 'Ups!'
            })
        );

    setIsLoading(true);
    try {
        const response = await apiCall();
        if (response.error) {
            showError(response.code)
            return;
        }
        if (successMessage) {
            dispatch(
                uiModal({
                    modalFor: 'message',
                    typeMsg: 'success',
                    msg: successMessage,
                    modalTitle: 'Éxito'

                })
            );
        }
        if (onSuccess) {
            onSuccess(response);
        }
        return response;
    } catch (error: any) {
        // debugger;
        if (error.code === 401) {
            showError(
                'Tu sesión ha expirado. Por favor, inicia sesión de nuevo.',
                redirectToLogin,
                redirectToLogin
            );
            onOutOfSession();
            return;
        }
        if (typeof error.code === 'string') {
            showError(error.code);
            return;
        }
        if (error.code === 500) {
            showError('Error del servidor. Ponte en contacto con soporte');
            return;
        }
        showError(error.error.detail || error.message || 'Error desconocido');
    } finally {
        setIsLoading(false);
    }
}
