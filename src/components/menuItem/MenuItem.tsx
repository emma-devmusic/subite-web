'use client'
import Link from "next/link"
import { Icon } from '@iconify/react';

interface Props {
    show: boolean;
    text: string;
    link: string;
    icon?: string;
}

export const MenuItem = ({ text , link, icon, show }: Props) => {

    if(!show) return;
    return (
        <li>
            <Link href={link} className="text-base text-gray-900 font-normal rounded-lg flex p-3 hover:bg-gray-100">
                {
                    icon && <Icon icon={`${icon}`} className='w-6 h-6 text-gray-500' />
                }
                <span className="ml-3">{text}</span>
            </Link>
        </li>
    )
}
