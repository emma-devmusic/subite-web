import { SidebarMenuItem, MenuItem, NotificationApp, User, NotificationFromDB  } from "@/types";

export const sidebarData : SidebarMenuItem[] = [
    {
        forAdmin: false,
        text: 'Tablero',
        link: '/dashboard',
        icon: 'tabler:chart-pie-filled'
    },
    {
        forAdmin: false,
        text: 'Notificaciones',
        link: '/dashboard/notifications',
        icon: 'ic:round-notifications-active'
    },
    // {
    //     forAdmin: false,
    //     text: 'Autorizaciones',
    //     link: '/dashboard/authorizations',
    //     icon: 'simple-icons:authelia'
    // },
    {
        forAdmin: false,
        text: 'Subastas',
        link: '/dashboard/auctions',
        icon: 'mingcute:auction-fill'
    },
    {
        forAdmin: false,
        text: 'Productos',
        link: '/dashboard/products',
        icon: 'icon-park-outline:ad-product',
    },
    {
        forAdmin: true,
        text: 'Categorias',
        link: '/dashboard/categories',
        icon: 'ic:round-category'
    },
    {
        forAdmin: true,
        text: 'Usuarios',
        link: '/dashboard/users',
        icon: 'mdi:users'
    },
]

export const accountMenuData: MenuItem[] = [
    {
        isBoth: false,
        isLogged: false,
        text: 'Ingresar',
        link: '/login',
        icon: 'ic:round-log-in'
    },
    {
        isBoth: false,
        isLogged: false,
        text: 'Regisrarse',
        link: '/register',
        icon: 'mdi:register',
    },
    {
        isBoth: false,
        isLogged: true,
        text: 'Perfil',
        link: '/dashboard/user-profile',
        icon: 'gg:profile',
    },
    {
        isBoth: false,
        isLogged: true,
        text: 'Ajustes',
        link: '/dashboard/user-config',
        icon: 'solar:settings-bold',
    },
    {
        isBoth: false,
        isLogged: true,
        text: 'Plataforma',
        link: '/dashboard',
        icon: 'mage:dashboard-check-fill'
    },
    {
        isBoth: false,
        isLogged: true,
        text: 'Ir a la Web',
        link: '/',
        icon: 'mdi:web'
    },
    {
        isBoth: false,
        isLogged: true,
        text: 'Cerrar Cuenta',
        link: '/close-session',
        icon: 'ic:round-log-out'
    },
]

export const notificationsData: NotificationApp[] = [
    {
        id: 'lkdsfgkjebg',
        title: 'Nuevo Usuario',
        body: 'Ingresa para autorizar.',
        linkTo: '/dashboard/authorizations',
        type: 'authorization'
    },
    {
        id: 'nlqeitadlfjjhee',
        title: 'Nuevo Mensaje',
        body: 'Léelo en el buzón.',
        linkTo: '/dashboard/inbox',
        type: 'inbox'
    },
    {
        id: 'lkdsfgkjebsdfxg',
        title: 'No se pudo enviar un msj',
        body: 'Revisalo en las notificaciones',
        linkTo: '/dashboard/authorizations',
        type: 'alert'
    }
]

export const dataNotifications: NotificationFromDB[] = [
    {
        details: 'Detalles del mensaje',
        error: false,
        message: 'Mensaje',
        title : 'Actualización del estado de tu cuenta'
    }
]


export const errorMsg:any = {
    400: "Hubo un problema con tu solicitud. Por favor, verifica los datos e inténtalo de nuevo.",
    401: "Por favor, revisa los datos.",
    403: "No estás autorizado o el registro ya existe.",
    404: "No encontramos lo que estás buscando. Por favor, verifica la URL o intenta más tarde.",
    409: "Datos inválidos.", // Añadido para el código 409
    500: "¡Ups! Algo salió mal en nuestro servidor. Por favor, inténtalo de nuevo más tarde.",
    502: "El servidor está teniendo problemas. Por favor, inténtalo de nuevo más tarde.",
    503: "El servicio no está disponible en este momento. Por favor, inténtalo de nuevo más tarde.",
    504: "El servidor está tardando demasiado en responder. Por favor, inténtalo de nuevo más tarde.",
    default: "Ocurrió un error desconocido. Por favor, inténtalo de nuevo más tarde.",
};