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
    const API_BASE_URL = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || 'https://acstapi.ding.com.ar/api/v1';
    const ACCESS_KEY = process.env.SESSION || process.env.NEXT_PUBLIC_SESSION || '';

    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        "access": ACCESS_KEY,
        ...(header && header)
    };

    if (authorization) {
        headers["Authorization"] = `Bearer ${authorization}`;
    }

    let response: any = null;
    try {
        const url = `${API_BASE_URL}${path}`;
        
        console.log(`[Server Action] Fetching: ${method} ${url}`); // Debug log
        
        response = await fetch(url, {
            method,
            headers,
            ...(body && { body: JSON.stringify(body) }),
            cache: 'no-store',
            next: { revalidate: 0 }
        });

        console.log(`[Server Action] Response status: ${response.status}`); // Debug log

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`[Server Action] Error response:`, errorText);
            throw new Error(`${errorMsg[response.status] || 'Error en la petición'}`);
        }
        
        const data = await response.json();
        console.log(`[Server Action] Success, items count:`, data?.data?.items?.length || 'N/A'); // Debug log
        
        return data;
    } catch (error: any) {
        console.error('[Server Action] Fetch error:', error);
        
        // Si hay response, intentar extraer el error
        if (response) {
            try {
                const errorData = await response.json();
                throw errorData;
            } catch {
                throw new Error(error.message || 'Error desconocido en la petición');
            }
        }
        
        throw error;
    }
};
