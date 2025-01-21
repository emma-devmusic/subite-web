export const navigation = {
    pages: [
        { name: 'Subastas', href: '/auctions' },
        { name: 'Sobre Nosotros', href: '/about-us' },
    ]
}


export const navigationMobile = (isLogged: boolean) => {
    return {
        pages: [
            { name: 'Subastas', href: '/auctions' },
            { name: 'Sobre Nosotros', href: '/about-us' },
            { name: '¿Cómo Subastar?', href: '/como-subastar' },
            { name: '¿Cómo Ofertar?', href: '/como-ofertar' },
            isLogged ? { name: 'Mi Cuenta', href: '/dashboard' } : { name: 'Ingresar', href: '/login' },
        ]
    }
}