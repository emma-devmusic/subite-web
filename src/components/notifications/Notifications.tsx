'use client'

import { PopoverApp } from "@/components/popover"
import { useNotifications } from "@/contexts/NotificationsContext"
import { ItemNotification } from "@/components/notifications/ItemNotification"
import { Icon } from "@iconify/react/dist/iconify.js"
import { DASHBOARD_BASE_URL } from "@/commons/helpers/envs";

const NotificationsContent = () => {
    const { notifications, isLoading, markAsRead, markAllAsRead, clearNotifications } = useNotifications();

    const MAX_VISIBLE_NOTIFICATIONS = 5;
    const visibleNotifications = notifications.slice(0, MAX_VISIBLE_NOTIFICATIONS);
    const hasMoreNotifications = notifications.length > MAX_VISIBLE_NOTIFICATIONS;

    const handleNotificationClick = (index: number) => {
        markAsRead(index);
    };

    return (
        <ul className="mt-2 flex max-h-[500px] w-[320px] flex-col overflow-y-auto">
            {/* Título */}
            <li className="border-b border-gray-200 px-4 py-3">
                <h3 className="text-lg font-semibold text-gray-800">
                    Notificaciones
                </h3>
            </li>

            {!isLoading &&
                visibleNotifications.map((item, i) => (
                    <ItemNotification
                        key={`${item.date}-${i}`}
                        details={item.details}
                        error={item.error}
                        message={item.message}
                        title={item.title}
                        icon={item.icon}
                        date={item.date}
                        link={item.link}
                        read={item.read ?? false}
                        onClick={() => handleNotificationClick(i)}
                    />
                ))}

            {!isLoading && hasMoreNotifications && (
                <li className="border-gray-200 p-1 text-center">
                    <button
                        type="button"
                        className="text-xs font-medium text-orange-600 hover:text-orange-700 hover:underline"
                        onClick={() => {
                            window.location.href = `${DASHBOARD_BASE_URL}/notifications`;
                        }}
                    >
                        Ver más ({notifications.length})
                    </button>
                </li>
            )}

            {!isLoading && notifications.length === 0 && (
                <span className="mx-auto p-3">
                    Aún no hay notificaciones.
                </span>
            )}

            {isLoading && <span className="mx-auto p-3">Cargando...</span>}

            {!isLoading && notifications.length > 0 && (
                <li className="border-t border-gray-200 p-4 py-3">
                    <div className="flex items-center justify-between">
                        <button
                            type="button"
                            className="text-sm font-medium text-red-600 hover:underline"
                            onClick={clearNotifications}
                        >
                            Limpiar
                        </button>
                        <button
                            type="button"
                            className="text-xs text-gray-500 hover:text-gray-700"
                            onClick={markAllAsRead}
                        >
                            Marcar todo como leído
                        </button>
                    </div>
                </li>
            )}
        </ul>
    );
};

export const Notifications = () => {
    const { unreadCount, isLoading, notifications } = useNotifications();

    console.log('🔔 Notifications component render:', { unreadCount, isLoading, notificationsCount: notifications.length });

    return (
        <PopoverApp
            button={
                <div className="relative">
                    <Icon
                        icon="ic:round-notifications"
                        className="h-8 w-8 text-orange-500"
                    />
                    {!isLoading && unreadCount > 0 && (
                        <div className="absolute top-0 left-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-extralight text-white">
                            {unreadCount}
                        </div>
                    )}
                </div>
            }
        >
            <NotificationsContent />
        </PopoverApp>
    );
};