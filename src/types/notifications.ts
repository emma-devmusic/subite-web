export type NotificationTypes = 'authorization' | 'inbox' | 'alert'


export interface NotificationApp {
    id: string;
    title: string;
    linkTo: string;
    body?: string;
    type: NotificationTypes;
}


export interface NotificationFromDB {
    title: NotificationTitle;
    details: string;
    error: boolean;
    message: string;
    product_id?: number;
}


export type NotificationTitle = 'Actualización del estado de tu cuenta.' | 'Nueva solicitud de Auditoria de Cliente' | 'Nueva Solicitud de Auditoría de Producto' | 'Solicitud de Auditoría Actualizada'

export interface ObjectNotification {
    title: NotificationTitle;
    details: string;
    error: boolean;
    message: string;
    date: string;
    icon: string;
    link: string;
    product_id?: number;
    read: boolean; // indica si el usuario ya la abrió / navegó
}
