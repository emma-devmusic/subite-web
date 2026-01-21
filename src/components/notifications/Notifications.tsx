'use client'

import { PopoverApp } from "@/components/popover"
import { BellAlertIcon } from "@heroicons/react/24/outline"
import { useNotifications } from "@/contexts/NotificationsContext"
import { ItemNotification } from "@/components/notifications/ItemNotification"
import { Icon } from "@iconify/react/dist/iconify.js"
import { useRouter } from "next/navigation";


export const Notifications = () => {
    const { notifications, isLoading, unreadCount, markAsRead, markAllAsRead } = useNotifications();
    const router = useRouter();

    return (
        <PopoverApp
            button={
                <div className="relative">
                    <Icon icon="ic:round-notifications" className="w-8 h-8 text-primary" />
                    {!isLoading && unreadCount > 0 && (
                        <div className="absolute top-0 left-0 text-white text-xs bg-red-500 font-extralight rounded-full w-4 h-4 flex justify-center items-center">
                            {unreadCount}
                        </div>
                    )}
                </div>
            }
            classOpen='w-7text-cyan-800'
            classClose='text-cyan-600 hover:text-cyan-700 hover:cursor-pointer w-7'
            position='end'
        >
            <ul className='flex flex-col w-[320px]'>
                {!isLoading && notifications.map((item, i) => (
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
                        onClick={() => markAsRead(i)}
                    />
                ))}

                {!isLoading && notifications.length === 0 && (
                    <span className="p-3">Aún no hay notificaciones.</span>
                )}

                {isLoading && <span className="p-3">Cargando...</span>}

                <li className="mt-2 border-t px-3 py-2">
                    <div className="flex items-center justify-between">
                        <button
                            type="button"
                            className="text-sm font-medium text-primary hover:underline"
                            onClick={() => {
                                markAllAsRead();
                                router.push('/dashboard/notifications');
                            }}
                        >
                            Ver todas
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
            </ul>
        </PopoverApp>
    )
}