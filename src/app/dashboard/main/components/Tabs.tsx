'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Tabs = () => {

    const pathname = usePathname()

    const path = pathname.split('/')[3]

    const links = ['all-auctions', 'dash']

    return (
        <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 px-3 pt-3">
            <li className="me-2">
                <Link href={'/dashboard/main/all-auctions'} className={`inline-block p-4 hover:text-cyan-600  rounded-t-lg ${path === links[0] && 'active bg-gray-200'}`}>Subastas</Link>
            </li>
            <li className="me-2">
                <Link href={'/dashboard/main/dash'} className={`inline-block p-4 rounded-t-lg hover:text-cyan-600 hover:bg-gray-50 ${path === links[1] && 'active bg-gray-200'}`} >Tu Tablero</Link>
            </li>
        </ul>
    )
};
