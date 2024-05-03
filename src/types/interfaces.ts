export interface SidebarMenuItem {
    admin: boolean;
    text: string;
    link: string;
    icon: string;
}
export interface MenuItem {
    isLogged: boolean;
    text: string;
    link: string;
    icon: string;
}

export type NotificationTypes = 'authorization' | 'inbox' | 'alert'
export interface NotificationApp {
    id: string;
    title: string;
    linkTo: string;
    body?: string;
    type: NotificationTypes;
}

export interface User {
    name: string;
    id: string;
    email: string;
    phone: string;
    urlImg: string;
}