
import { getProductByPage, getProductBySearchParams, getProductsFromDB, SearchParams } from '@/actions/products'
import { ProductsList } from '@/components/cards'
import React from 'react'

interface Props {
    searchParams: SearchParams;
    numberColumns: number;
}

export const AuctionsSection = async ({ searchParams, numberColumns = 4 }: Props) => {


    const homeProd = (await getProductBySearchParams(searchParams)).items

    return (
        <>
            <ProductsList homeProd={homeProd} numberColumns={numberColumns}/>
        </>
    )
}
