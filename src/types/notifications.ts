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
}


export type NotificationTitle = 'Actualización del estado de tu cuenta.' | 'Nueva solicitud de Auditoría de Cliente'

export interface ObjectNotification {
    title: NotificationTitle;
    details: string;
    error: boolean;
    message: string;
    date: string;
    icon: string;
    link: string;
}
