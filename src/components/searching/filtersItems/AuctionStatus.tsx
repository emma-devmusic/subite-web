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
                className="block w-full rounded-md border border-gray-200 bg-white px-2.5 py-2.5 text-sm text-gray-700 transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none disabled:pointer-events-none disabled:bg-gray-50 disabled:text-gray-400"
            >
                <option defaultValue="0">Selecciona un estado</option>
                <option value="ACTIVE">Activas</option>
                <option value="FINISHED">Finalizadas</option>
                <option value="NOT_STARTED">No iniciadas</option>
            </select>
        </div>
    )
}
