import { access } from "@/commons/helpers/envs";
import { errorMsg } from "@/mocks/mocks";

export const fetchData = async (
    path: string,
    method: 'POST' | 'GET' | 'DELETE' | 'PUT' | 'PATCH',
    body: any | null,
    authorization?: string | null, // Hacer que authorization sea opcional
    header?: { [key:string]: string; }
) => {
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
    let response:any = null;
    try {
        response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${path}`, {
            method,
            headers,
            ...(body && { body: JSON.stringify(body) }),
            cache: 'no-store' // Deshabilitar cache para obtener datos frescos
        });

        if (!response.ok) throw new Error(`${errorMsg[response.status]}`);
        return await response.json();
    } catch (error) {
        throw await response.json()
    }
};