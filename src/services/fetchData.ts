import { access, API_BASE_URL } from '@/commons/helpers/envs';
import { errorMsg } from "@/mocks/mocks";

type ApiErrorPayload = {
    code?: string | number;
    message?: string;
    detail?: string;
    error?: { detail?: string } | boolean;
    type_error?: string;
    [key: string]: unknown;
};

export type ApiRequestError = Error & {
    status: number;
    code: string | number;
    type_error?: string;
    payload?: ApiErrorPayload | string | null;
};

const readResponseBody = async (
    response: Response,
): Promise<ApiErrorPayload | string | null> => {
    const rawBody = await response.text();
    if (!rawBody) return null;

    try {
        return JSON.parse(rawBody) as ApiErrorPayload;
    } catch {
        return rawBody;
    }
};

export const getApiErrorMessage = (error: unknown): string => {
    if (error instanceof Error && error.message) return error.message;
    return 'No pudimos completar la solicitud. Intentá nuevamente.';
};

export const fetchData = async <T = any>(
    path: string,
    method: 'POST' | 'GET' | 'DELETE' | 'PUT' | 'PATCH',
    body: any | null,
    authorization?: string | null, // Hacer que authorization sea opcional
    header?: { [key:string]: string; }
): Promise<T> => {
    // Configurar las cabeceras iniciales
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        "access": `${access}`,
        ...(header && header)
    };

    // Añadir la cabecera de Authorization si se proporciona
    if (authorization) {
        headers["Authorization"] = `Bearer ${authorization}`;
    }
    try {
        const response = await fetch(`${API_BASE_URL}${path}`, {
            method,
            headers,
            ...(body && { body: JSON.stringify(body) }),
            cache: 'no-store' // Deshabilitar cache para obtener datos frescos
        });

        const responseBody = await readResponseBody(response);

        if (!response.ok) {
            const payload =
                typeof responseBody === 'object' && responseBody !== null
                    ? responseBody
                    : null;
            const nestedDetail =
                payload && typeof payload.error === 'object'
                    ? payload.error?.detail
                    : undefined;
            const message =
                payload?.message ||
                payload?.detail ||
                nestedDetail ||
                errorMsg[response.status] ||
                `El servidor respondió con un error (${response.status}).`;

            throw Object.assign(new Error(message), {
                name: 'ApiRequestError',
                status: response.status,
                code: payload?.code ?? response.status,
                type_error: payload?.type_error,
                payload: responseBody,
            }) as ApiRequestError;
        }

        return responseBody as T;
    } catch (error) {
        if (error instanceof Error && error.name === 'ApiRequestError') {
            throw error;
        }

        throw Object.assign(
            new Error(
                'No pudimos conectarnos con el servidor. Intentá nuevamente en unos minutos.',
            ),
            {
                name: 'ApiRequestError',
                status: 0,
                code: 'NETWORK_ERROR',
                payload: null,
                cause: error,
            },
        ) as ApiRequestError;
    }
};
