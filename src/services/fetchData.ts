export const fetchData = async (path: string, method: 'POST' | 'GET' | 'DELETE' | 'PUT', body: any) => {

    const data = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${path}`, {
        method,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
    })

    return data.json()

}