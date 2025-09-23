'use client'

import { PopoverApp } from "@/components/popover"
import { BellAlertIcon } from "@heroicons/react/24/outline"
import { useNotifications } from "@/contexts/NotificationsContext"
import { ItemNotification } from "@/components/notifications/ItemNotification"
import { Icon } from "@iconify/react/dist/iconify.js"


export const Notifications = () => {
    const { notifications, isLoading } = useNotifications();

    return (
        <PopoverApp
            button={
                <div className="relative">
                    <Icon icon="ic:round-notifications" className="w-8 h-8 text-primary" />
                    {
                        !isLoading && notifications.length > 0 &&
                        <div className="absolute top-0 left-0 text-white text-xs bg-red-500 font-extralight rounded-full w-4 h-4 flex justify-center items-center" >
                            {notifications.length}
                        </div>
                    }
                </div>
            }
            classOpen='w-7text-cyan-800'
            classClose='text-cyan-600 hover:text-cyan-700 hover:cursor-pointer w-7'
            position='end'
        >
            <ul className='flex flex-col'>
                {
                    !isLoading && notifications.map((item, i) =>
                        <ItemNotification
                            key={i}
                            details={item.details}
                            error={item.error}
                            message={item.message}
                            title={item.title}
                            icon={item.icon}
                            date={item.date}
                            link={item.link}
                        />
                    )
                }
                {
                    !isLoading && notifications.length === 0 &&
                    <span className="p-3">Aún no hay notificaciones.</span>
                }
                {
                    isLoading &&
                    <span className="p-3">Cargando...</span>
                }
            </ul>
        </PopoverApp>
    )
}