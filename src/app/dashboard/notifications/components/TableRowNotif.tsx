import { ObjectNotification } from "@/types";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { useEffect, useState } from "react";


export const TableRowNotif = (notif:ObjectNotification) => {

    const [linkTo, setLinkTo] = useState('')

    useEffect(() => {
        if(notif.title === 'Nueva Solicitud de Auditoría de Producto'){
            setLinkTo('/dashboard/products/' + notif?.product_id)
        }
    },[])
console.log(notif)
    return (
        <tr className="hover:bg-gray-100">
            <td className="p-4 items-center whitespace-nowrap space-x-6 mr-12 lg:mr-0">
                <Icon icon={notif.icon} className="text-gray-600 text-2xl" />
            </td>
            <td className="p-4 items-center whitespace-nowrap space-x-6 mr-12 lg:mr-0">
                <div className="flex flex-col gap-2">
                    <p>
                        {notif.title}
                    </p>
                    <p className="text-gray-600 text-sm">
                        {notif.details}
                    </p>
                </div>
            </td>
            <td className="p-4 items-center whitespace-nowrap space-x-6 mr-12 lg:mr-0">
                {notif.date}
            </td>
            <td className="p-4 whitespace-nowrap space-x-2 text-end">
                <div className="flex items-center gap-1 justify-center">
                    <Link
                        href={linkTo}
                        className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center"
                    >
                        Ver
                    </Link>
                </div>
            </td>
        </tr>
    );
};
