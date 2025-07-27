'use client'

import { PopoverApp } from "@/components/popover"
import { BellAlertIcon } from "@heroicons/react/24/outline"
import { useEffect, useState } from "react"
import { getIdFromUSID, objectNotification, setNotificationOnLocalStorage } from "@/commons/helpers"
import { io } from 'socket.io-client'
import { ObjectNotification } from "@/types"
import { ItemNotification } from "@/components/notifications/ItemNotification"
import SessionManager from "@/commons/Classes/SessionManager"


export const Notifications = () => {

    const [usid, setUsid] = useState<string | null>(null)
    const [notifications, setNotifications] = useState<ObjectNotification[]>([])

    useEffect(() => {
        const session = SessionManager.getInstance();
        const sessionUsid = session.getUSID();
        setUsid(sessionUsid);
    }, []);

    useEffect(() => {
        if (!usid) return;

        const socketConection = io(`https://notifystage.ding.com.ar?usid=${usid}`, {autoConnect: false})
        
        socketConection.connect()
        socketConection.on(`${usid}`, (data: any) => {
            const userId = getIdFromUSID(usid);
            if (userId) {
                setNotificationOnLocalStorage(userId, data)
                setNotifications(state => [...state, objectNotification(data)])
            }
        })

        return () => {
            socketConection.off(`${usid}`)
            socketConection.disconnect()
        }
    }, [usid])

    return (
        <PopoverApp
            button={
                <div className="relative">
                    <BellAlertIcon className="w-8 h-8 text-primary" />
                    {
                        notifications.length > 0 &&
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