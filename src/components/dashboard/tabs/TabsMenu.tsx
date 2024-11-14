'use client'
import { useAppDispatch } from '@/store'
import { getProducts } from '@/store/slices/productSlice'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const TabsMenu = () => {

    const pathname = usePathname()
    const dispatch = useAppDispatch()
    const path = pathname.split('/')[3]
    const links = ['active-auctions', 'not-started-auctions', 'finished-auctions']


    const handleActiveAuctions = () => {
        dispatch(getProducts('search?page=1&limit=10&with_auction=ACTIVE'))
    }
    const handleNotStartedAuctions = () => {
        dispatch(getProducts('search?page=1&limit=10&with_auction=NOT_STARTED'))
    }
    const handleFinishedAuctions = () => {
        dispatch(getProducts('search?page=1&limit=10&with_auction=FINISHED'))
    }

    return (
        <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 px-3 pt-3">
            <li className="me-2">
                <Link
                    href={'/dashboard/auctions/active-auctions'} 
                    className={`inline-block p-4 hover:text-cyan-600  rounded-t-lg ${path === links[0] && 'active bg-gray-200'}`}
                    onClick={handleActiveAuctions}
                >Activas</Link>
            </li>
            <li className="me-2">
                <Link 
                    href={'/dashboard/auctions/not-started-auctions'} 
                    className={`inline-block p-4 rounded-t-lg hover:text-cyan-600 hover:bg-gray-50 ${path === links[1] && 'active bg-gray-200'}`} 
                    onClick={handleNotStartedAuctions}
                >No Iniciadas</Link>
            </li>
            <li className="me-2">
                <Link 
                    href={'/dashboard/auctions/finished-auctions'} 
                    className={`inline-block p-4 rounded-t-lg hover:text-cyan-600 hover:bg-gray-50 ${path === links[2] && 'active bg-gray-200'}`} 
                    onClick={handleFinishedAuctions}
                >Finalizadas</Link>
            </li>
        </ul>
    )
}
