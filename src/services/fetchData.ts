export const fetchData = async (
    path: string,
    method: 'POST' | 'GET' | 'DELETE' | 'PUT',
    body: any | null,
    authorization?: string, // Hacer que authorization sea opcional
    header?: { [key:string]: string; }
) => {
    // Configurar las cabeceras iniciales
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...(header && header)
    };

    // Añadir la cabecera de Authorization si se proporciona
    if (authorization) {
        headers["Authorization"] = `Bearer ${authorization}`;
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${path}`, {
            method,
            headers,
            ...(body && { body: JSON.stringify(body) }),
        });

        if (!response.ok) {
            throw new Error(`${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};