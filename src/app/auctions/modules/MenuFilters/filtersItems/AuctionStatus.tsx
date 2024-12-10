'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback } from 'react'

const AUCTION_STATUS = ['FINISHED' , 'ACTIVE' , 'NOT_STARTED']

export const AuctionStatus = () => {

    const params = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const createQueryString = useCallback((name: string, value: string, forDelete?: string) => {
        const newUrl = new URLSearchParams(params.toString())
        if (forDelete) {
            newUrl.delete(forDelete)
        }
        newUrl.set(name, value)
        return newUrl.toString()
    }, [params])

    const deleteQueryString = useCallback((names: string[]) => {
        const newUrl = new URLSearchParams(params.toString())
        names.forEach(name => newUrl.delete(name))
        return newUrl.toString()
    }, [params])

    const handleAuctionStatusChange = (e: any) => {
        if(!AUCTION_STATUS.includes(e.target.value)){
            deleteQueryString(['with_auction'])
        }
        router.push(pathname + '?' + createQueryString('with_auction', `${e.target.value}`))
    }

    return (
        <div>
            <label htmlFor="hs-select-label" className="block text-sm font-medium mb-2">Categoría</label>
            <select
                onChange={handleAuctionStatusChange}
                className="py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "
            >
                <option defaultValue="0">Selecciona un estado</option>
                <option value="ACTIVE">Activas</option>
                <option value="FINISHED">Finalizadas</option>
                <option value="NOT_STARTED">No iniciadas</option>
            </select>
        </div>
    )
}
