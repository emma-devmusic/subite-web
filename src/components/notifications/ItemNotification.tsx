'use client'

import { ObjectNotification } from "@/types"
import { Icon } from "@iconify/react/dist/iconify.js"
import Link from "next/link"
import { useRouter } from "next/navigation";



export const ItemNotification = ({ title, details, error, message, icon, link }: ObjectNotification) => {

    const router = useRouter()
    const handleGoTo = () => {
        router.push(link)
    }

    if (title === 'Actualización del estado de tu cuenta')
        return <li className="" onClick={handleGoTo}>
            <div className="">
                <div className="flex gap-6 px-7 py-4 items-center hover:bg-gray-100">
                    <Icon
                        icon={icon}
                        className="h-8 w-8 text-gray-500"
                    />
                    <div className="flex flex-col text-gray-800 mr-2">
                        <h6 className="text-md font-medium">
                            {title}
                        </h6>
                        <p className="text-sm">
                            {message}
                        </p>
                    </div>
                </div>
            </div>
        </li>

    return (
        <li className="" onClick={handleGoTo}>
            <div className="">
                <div className="flex gap-6 px-7 py-4 items-center hover:bg-gray-100">
                    <Icon
                        icon={icon}
                        className="h-8 w-8 text-gray-500"
                    />
                    <div className="flex flex-col text-gray-800 mr-2">
                        <h6 className="text-md font-medium">
                            {title}
                        </h6>
                        <p className="text-sm">
                            {message}
                        </p>
                    </div>
                </div>
            </div>
        </li>
    );
};
