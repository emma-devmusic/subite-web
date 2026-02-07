'use client'
import { Icon } from '@iconify/react';
import { useAppDispatch } from "@/store";
import { logout } from "@/store/slices/authSlice";

interface Props {
    show?: boolean;
    text: string;
    link: string;
    icon?: string;
}

export const MenuItem = ({ text, link, icon, show }: Props) => {

    const dispatch = useAppDispatch()

    const handleLogout = () => {
        dispatch(logout());
    }

    if (!show) return
    if (link === '/close-session') return (
        <li onClick={handleLogout}>
            <div className="text-base text-gray-900 font-normal rounded-lg flex p-3 hover:bg-gray-100 hover:cursor-pointer">
                {icon && <Icon icon={`${icon}`} className='w-6 h-6 text-gray-500' />}
                <span className="ml-3">{text}</span>
            </div>
        </li>
    )
    return (
        <a href={link}>
            <div className="text-base text-gray-900 font-normal rounded-lg flex p-3 hover:bg-gray-100 hover:cursor-pointer">
                {icon && <Icon icon={`${icon}`} className='w-6 h-6 text-gray-500' />}
                <span className="ml-3">{text}</span>
            </div>
        </a>
    )

}
