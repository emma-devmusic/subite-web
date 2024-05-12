export const getSession = () => {
    return JSON.parse(sessionStorage.getItem('user') ?? '{}')
}

export const setInSessionStorage = (id: string, data: any) => {
    sessionStorage.setItem( id, JSON.stringify( data ) )
}