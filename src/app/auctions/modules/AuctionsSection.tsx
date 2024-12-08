
import { ProductsList } from '@/components/cards'
import { getProductsFromDB } from '@/services/products'
import React from 'react'

export const AuctionsSection = async () => {

    const homeProd = (await getProductsFromDB('search?page=1&limit=10')).items

    return (
        <>
            <h3>Buscador</h3>
            <ProductsList homeProd={homeProd} />
        </>
    )
}
