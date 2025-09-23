import { DASHBOARD_BASE_URL } from "@/commons/helpers/envs";

export const navigation = {
    pages: [
        { name: 'Subastas', href: '/auctions' },
        { name: 'Sobre Nosotros', href: '/about-us' },
    ]
}

interface NavigationItem {
    name: string;
    href: string;
    external?: boolean;
}

export const navigationMobile = (isLogged: boolean): { pages: NavigationItem[] } => {
    return {
        pages: [
            { name: 'Subastas', href: '/auctions' },
            { name: 'Sobre Nosotros', href: '/about-us' },
            { name: '¿Cómo Subastar?', href: '/como-subastar' },
            { name: '¿Cómo Ofertar?', href: '/como-ofertar' },
            isLogged ? { name: 'Mi Cuenta', href: DASHBOARD_BASE_URL + '/profile' } : { name: 'Ingresar', href: DASHBOARD_BASE_URL + '/login', external: true },
        ]
    }
}