import { errorMsg } from "@/mocks/mocks";

/**
 * fetchData específico para Server Actions y Server Components
 * NO usa variables NEXT_PUBLIC_* que pueden no estar disponibles en el servidor
 */
export const fetchDataServer = async (
    path: string,
    method: 'POST' | 'GET' | 'DELETE' | 'PUT' | 'PATCH',
    body: any | null,
    authorization?: string | null,
    header?: { [key:string]: string; }
) => {
    // Usar variables de entorno SIN NEXT_PUBLIC_ para el servidor
    const API_BASE_URL =
        process.env.API_BASE_URL ||
        process.env.NEXT_PUBLIC_API_BASE_URL ||
        'https://api.subite.ar/api/v1';
    const ACCESS_KEY = process.env.SESSION || process.env.NEXT_PUBLIC_SESSION || '';
    const TENANT_ID = process.env.TENANT_ID || process.env.NEXT_PUBLIC_API_TENANT || '1';

    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        "access": ACCESS_KEY,
        "tenant-id": TENANT_ID,
        "User-Agent": "Mozilla/5.0 (compatible; NextJS/14.0; +https://subite.ar)", // Cloudflare suele bloquear sin User-Agent
        ...(header && header)
    };

    if (authorization) {
        headers["Authorization"] = `Bearer ${authorization}`;
    }

    try {
        const url = `${API_BASE_URL}${path}`;

        const response = await fetch(url, {
            method,
            headers,
            ...(body && { body: JSON.stringify(body) }),
            cache: 'no-store' // Suficiente para deshabilitar el cache
        });

        const rawBody = await response.text();
        let responseBody: any = null;

        if (rawBody) {
            try {
                responseBody = JSON.parse(rawBody);
            } catch {
                responseBody = rawBody;
            }
        }

        if (!response.ok) {
            const message =
                (typeof responseBody === 'object' &&
                    (responseBody?.message || responseBody?.detail)) ||
                errorMsg[response.status] ||
                `El servidor respondió con un error (${response.status}).`;

            throw Object.assign(new Error(message), {
                status: response.status,
                code:
                    typeof responseBody === 'object'
                        ? responseBody?.code ?? response.status
                        : response.status,
            });
        }

        return responseBody;
    } catch (error: any) {
        console.error('[Server Action] API request failed:', error.message);
        throw error;
    }
};
