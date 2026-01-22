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
    const TENANT_ID = process.env.TENANT_ID || process.env.NEXT_PUBLIC_API_TENANT || '1';

    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        "access": ACCESS_KEY,
        "tenant-id": TENANT_ID, // Agregar tenant-id que podría ser necesario
        ...(header && header)
    };

    if (authorization) {
        headers["Authorization"] = `Bearer ${authorization}`;
    }

    let response: any = null;
    try {
        const url = `${API_BASE_URL}${path}`;
        
        console.log(`[Server Action] ========================================`);
        console.log(`[Server Action] Fetching: ${method} ${url}`);
        console.log(`[Server Action] Headers:`, {
            ...headers,
            access: headers.access ? `${headers.access.substring(0, 10)}...` : 'MISSING' // Mostrar solo inicio del token
        });
        
        response = await fetch(url, {
            method,
            headers,
            ...(body && { body: JSON.stringify(body) }),
            cache: 'no-store',
            next: { revalidate: 0 }
        });

        console.log(`[Server Action] Response status: ${response.status}`);

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`[Server Action] Error response:`, errorText);
            console.error(`[Server Action] Full headers sent:`, headers);
            throw new Error(`${errorMsg[response.status] || 'Error en la petición'}: ${errorText}`);
        }
        
        const data = await response.json();
        console.log(`[Server Action] Success! Items count:`, data?.data?.items?.length || data?.data?.length || 'N/A');
        console.log(`[Server Action] ========================================`);
        
        return data;
    } catch (error: any) {
        console.error('[Server Action] ========================================');
        console.error('[Server Action] FETCH ERROR:', error.message);
        console.error('[Server Action] Error details:', error);
        console.error('[Server Action] ========================================');
        
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
