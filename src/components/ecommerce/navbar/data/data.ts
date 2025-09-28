import { DASHBOARD_BASE_URL } from "@/commons/helpers/envs";

export const navigation = {
    pages: [
        { name: 'Subastas', href: '/auctions' },
        { name: 'Sobre Nosotros', href: '/about-us' },
        { name: 'Contacto', href: '/contact' },
    ],
    instructives: [
        { name: '¿Cómo Subastar?', href: '/como-subastar' },
        { name: '¿Cómo Ofertar?', href: '/como-ofertar' },
    ],
    legals: [
        { name: 'Términos y Condiciones', href: '/terminos-y-condiciones' },
        { name: 'Política de Privacidad', href: '/politica-de-privacidad' },
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
            { name: 'Contacto', href: '/contact' },
            isLogged ? { name: 'Mi Cuenta', href: DASHBOARD_BASE_URL + '/profile' } : { name: 'Ingresar', href: DASHBOARD_BASE_URL + '/login', external: true },
        ]
    }
}