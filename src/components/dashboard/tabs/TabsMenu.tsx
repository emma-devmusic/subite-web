'use client'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'

export const TabsMenu = () => {

    const pathname = usePathname()

    const path = pathname.split('/')[3]

    const links = ['all-auctions', 'today-auctions', 'record-auctions']

    return (
        <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 px-3 pt-3">
            <li className="me-2">
                <Link href={'/dashboard/auctions/all-auctions'} className={`inline-block p-4 hover:text-cyan-600  rounded-t-lg ${path === links[0] && 'active bg-gray-200' }`}>Subastas</Link>
            </li>
            <li className="me-2">
                <Link href={'/dashboard/auctions/today-auctions'} className={`inline-block p-4 rounded-t-lg hover:text-cyan-600 hover:bg-gray-50 ${path === links[1] && 'active bg-gray-200'}` } >Subastas del Día</Link>
            </li>
            <li className="me-2">
                <Link href={'/dashboard/auctions/record-auctions'} className={`inline-block p-4 rounded-t-lg hover:text-cyan-600 hover:bg-gray-50 ${path === links[2] && 'active bg-gray-200'}` } >Historial</Link>
            </li>
        </ul>
    )
}
