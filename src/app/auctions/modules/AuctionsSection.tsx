
import { getProductByPage, getProductBySearchParams, getProductsFromDB } from '@/actions/products'
import { ProductsList } from '@/components/cards'
import React from 'react'

interface Props {
    searchParams: {
        page: number;
        limit: number;
        category_id: string;
        subcategory_id: string;
        term: string;
    }
}

export const AuctionsSection = async ({ searchParams }: Props) => {


    const homeProd = (await getProductBySearchParams(searchParams)).items

    return (
        <>
            <ProductsList homeProd={homeProd} />
        </>
    )
}
