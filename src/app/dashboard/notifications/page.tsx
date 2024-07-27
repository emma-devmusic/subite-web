'use client'

import { TableNotif } from "./components/TableNotif";
import { HeaderLayout } from "@/components/dashboard/headerLayout/HeaderLayout";
import { getIdFromUSID, getNotificationsFromLocalStorage, getUSID } from "@/helpers";
import { useAppSelector } from "@/store";
import { useEffect, useState } from "react";
import { ObjectNotification } from "@/types";


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
                    <button
                        type="button"
                        data-modal-toggle="add-product-modal"
                        className="text-cyan-600 w-[100px] flex justify-center bg-white border-[1px] border-cyan-600 hover:bg-cyan-700 focus:ring-4 hover:text-white transition-all focus:ring-cyan-200 font-medium inline-flex items-center rounded-lg text-sm px-3 py-2 text-center sm:ml-auto"
                        onClick={handleUpdate}
                    >
                        Actualizar
                    </button>
                    <button
                        type="button"
                        data-modal-toggle="add-product-modal"
                        className="text-white w-[100px] flex justify-center bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center rounded-lg text-sm px-3 py-2 text-center sm:ml-auto"
                        onClick={handleClean}
                    >
                        Limpiar
                    </button>
                </div>
            </HeaderLayout>
            <TableNotif notifications={notifications} />
        </div>
    );
}