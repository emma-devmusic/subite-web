'use client'

import { PopoverApp } from "@/components/popover"
import { BellAlertIcon } from "@heroicons/react/24/outline"
import { useEffect, useState } from "react"
import { getIdFromUSID, getNotificationsFromLocalStorage, getUSID, objectNotification, setNotificationOnLocalStorage } from "@/helpers"
import { io } from 'socket.io-client'
import { ObjectNotification } from "@/types"
import { ItemNotification } from "@/components/notifications/ItemNotification"


export const Notifications = () => {
    const usid = getUSID()?.data
    const [notifications, setNotifications] = useState<ObjectNotification[]>([])

    useEffect(() => {
        const socketConection = io(`https://notifystage.ding.com.ar?usid=${usid}`, {autoConnect: false})
        if (typeof usid !== 'undefined') {
            socketConection.connect()
            socketConection.on(`${usid}`, (data: any) => {
                setNotificationOnLocalStorage(`${getIdFromUSID(usid)}`, data)
                setNotifications(state => [...state, objectNotification(data)])
            })
        }
        return () => {
            socketConection.off(`${usid}`)
            socketConection.disconnect()
        }
    }, [])

    return (
        <PopoverApp
            button={
                <div className="relative">
                    <BellAlertIcon />
                    {
                        notifications.length > 0 &&
                        <div className="absolute top-0 left-0 text-white text-xs bg-red-500 font-extralight rounded-full w-4 h-4 flex justify-center items-center" >
                            {notifications.length}
                        </div>
                    }
                </div>
            }
            classOpen='w-7 mr-4 text-cyan-800'
            classClose='text-cyan-600 hover:text-cyan-700 hover:cursor-pointer w-7 mr-4'
            position='end'
        >
            <ul className='flex flex-col'>
                {
                    notifications.map((item, i) =>
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
                    notifications.length === 0 &&
                    <span className="p-3">Aún no hay notificaciones.</span>
                }
            </ul>
        </PopoverApp>
    )
}