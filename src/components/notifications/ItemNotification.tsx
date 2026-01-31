'use client'

import { DASHBOARD_BASE_URL } from "@/commons/helpers/envs";
import { ObjectNotification } from "@/types"
import { Icon } from "@iconify/react/dist/iconify.js"
import Link from "next/link"
import { useRouter } from "next/navigation";

type Props = ObjectNotification & {
    onClick?: () => void;
};

export const ItemNotification = ({ 
    title, 
    details, 
    error, 
    message, 
    icon, 
    link, 
    read,
    date,
    onClick 
}: Props) => {

    const router = useRouter()
    const handleGoTo = () => {
        onClick?.();
        window.location.href = DASHBOARD_BASE_URL + link!;
        console.log(link)
    }

    return (
        <li 
            className={`cursor-pointer transition-colors ${
                read ? 'bg-white' : 'bg-blue-50'
            } border-b border-gray-100 last:border-b-0 hover:bg-gray-100`}
            onClick={handleGoTo}
        >
            <div className="flex gap-3 p-4">
                <div className="flex flex-1 flex-col">
                    <h6
                        className={`text-sm ${
                            read ? 'font-normal' : 'font-semibold'
                        } text-gray-800`}
                    >
                        {title}
                    </h6>
                    <p className="text-xs text-gray-600">{message}</p>
                    {date && (
                        <span className="text-[10px] text-gray-400">
                            {date}
                        </span>
                    )}
                </div>
                {/* Indicador visual de no leído */}
                <div className="flex items-start pt-1">
                    {!read && (
                        <div className="mr-2 h-2 w-2 rounded-full bg-blue-500"></div>
                    )}
                </div>
            </div>
        </li>
    );
};
