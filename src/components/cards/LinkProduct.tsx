'use client'
import { useAppDispatch } from '@/store'
import { selectAuction } from '@/store/slices/auctionSlice'
import { selectProduct } from '@/store/slices/productSlice'
import { ItemHomeProductsSearchResponse } from '@/types/homeResponse'
import { ItemProductSearchResponse } from '@/types/products'
import Link from 'next/link'
import React from 'react'

export const LinkProduct = ({ product }: { product: ItemHomeProductsSearchResponse }) => {

    const dispatch = useAppDispatch()
    const handleSelectProduct = () => {
        dispatch(selectProduct( product as any))
        dispatch(selectAuction(product as any))
    }

    return (
        <div className="card-box-button mt-3">
            <Link
                className="card-product-link block text-center text-primary hover:text-white hover:bg-primary transition-all"
                href={`/product/${product.id}`}
                onClick={handleSelectProduct}
            >
                Ver Subasta
            </Link>
        </div>
    )
}
