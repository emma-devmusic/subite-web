'use client'

import { TableNotif } from "./components/TableNotif";
import { HeaderLayout } from "@/components/dashboard/headerLayout/HeaderLayout";
import { getIdFromUSID, getNotificationsFromLocalStorage, getUSID } from "@/helpers";
import { useAppSelector } from "@/store";
import { useEffect, useState } from "react";
import { ObjectNotification } from "@/types";
import { Button } from "@/components/buttons/Button";


export default function NotificationsPage() {

    const { userProfile } = useAppSelector(state => state.auth)
    const [notifications, setNotifications] = useState<ObjectNotification[]>([])

    useEffect(() => {
        handleUpdate()
    }, [])

    const handleClean = () => {
        localStorage.removeItem(`notif-${userProfile?.id}`)
        setNotifications([])
    }

    const handleUpdate = () => {
        const usid = getUSID()?.data
        if (typeof usid !== 'undefined') {
            const notif = getNotificationsFromLocalStorage(getIdFromUSID(usid))
            setNotifications(notif)
        }
    }

    return (
        <div>
            <HeaderLayout title={'Notificaciones'}>
                <div className="flex justify-between sm:justify-end gap-2">
                    <Button
                        text="Actualizar"
                        variant="outline-primary"
                        action={handleUpdate}
                    />
                    <Button
                        text="Limpiar"
                        variant="primary"
                        action={handleClean}
                    />
                </div>
            </HeaderLayout>
            <TableNotif notifications={notifications} />
        </div>
    );
}