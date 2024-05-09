export const getSession = () => {
    return JSON.parse(sessionStorage.getItem('user') ?? '{}')
}