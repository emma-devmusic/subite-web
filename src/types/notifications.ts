export type NotificationTypes = 'authorization' | 'inbox' | 'alert'
export interface NotificationApp {
    id: string;
    title: string;
    linkTo: string;
    body?: string;
    type: NotificationTypes;
}