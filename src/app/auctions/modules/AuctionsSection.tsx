'use client'
import { getProductBySearchParams, SearchParams } from '@/actions/products'
import { ProductsList } from '@/components/cards'
import React from 'react'

interface Props {
    searchParams: SearchParams;
    numberColumns: number;
}

export const AuctionsSection = async ({ searchParams }: Props) => {


    const homeProd = (await getProductBySearchParams(searchParams)).items

    return (
        <>
            <ProductsList homeProd={homeProd} cols={'lg:grid-cols-3'}/>
        </>
    )
}
