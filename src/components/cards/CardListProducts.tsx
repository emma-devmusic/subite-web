'use client'

import { useAppSelector } from "@/store"
import { CardProduct } from "./CardProduct"
import { useEffect, useState } from "react"
import { ItemHomeProductsSearchResponse } from "@/types/homeResponse"

export const CardListProducts = () => {

    const { homeProducts } = useAppSelector(state => state.home)
    const [ homeProd, setHomeProd ] = useState<ItemHomeProductsSearchResponse[] | null>()
    
    useEffect( () => {
        setHomeProd(homeProducts)
    }, [homeProducts])

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>
                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {homeProd && homeProd.map( item => <CardProduct key={item.id} itemProduct={item} /> ) }
                </div>
            </div>
        </div>
    )
}
