'use client'

import { NotificationApp } from "@/types"
import { Icon } from "@iconify/react/dist/iconify.js"
import Link from "next/link"

export const NotificationItem = ( { linkTo, body, title, type, id } : NotificationApp) => {
    
    const icon = {
        authorization: 'simple-icons:authelia',
        inbox: 'icon-park-outline:email-down',
        alert: 'jam:alert'
    }

    return (
        <li className="">
            <Link href={linkTo} className="">
                <div className="flex gap-6 px-7 py-4 items-center hover:bg-gray-100">
                    <Icon 
                        icon={ icon[type] } 
                        className="h-8 w-8 text-gray-500" 
                    />
                    <div className="flex flex-col text-gray-800 mr-2">
                        <h6 className="text-md font-medium">
                            { title }
                        </h6>
                        <p className="text-sm">
                            { body }
                        </p>
                    </div>
                </div>
            </Link>
        </li>
    )
}