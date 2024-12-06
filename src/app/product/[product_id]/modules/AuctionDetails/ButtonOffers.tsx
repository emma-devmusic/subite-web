'use client'
import { Button } from '@/components/buttons/Button'
import * as apiProducts from '@/services/products'
import { useAppDispatch, useAppSelector } from '@/store'
import { selectAuction } from '@/store/slices/auctionSlice'
import { getOffers } from '@/store/slices/offersSlice'
import { selectProduct } from '@/store/slices/productSlice'
import { uiModal } from '@/store/slices/uiSlice'
import { DataHomeProductResponse } from '@/types/homeProductResponse'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'
import Swal from 'sweetalert2'


interface Props {
    product: DataHomeProductResponse
}
export const ButtonOffers = ({ product }: Props) => {

    const params = useParams()
    const { auctionSelected } = useAppSelector(state => state.auction)
    useEffect(() => {
        // if (auctionSelected) {
        //     apiProducts.getProductById(params.product_id as string)
        //         .then(
        //             (prod) => {

        //             }
        //         )
        //         .catch(e => Swal.fire('Error', 'Error al cargar producto', 'error'))
        //     }
        dispatch(selectAuction(product as any))
        dispatch(selectProduct(product as any))
    }, [])

    const dispatch = useAppDispatch()
    const handleSeeOffers = () => {
        dispatch(getOffers(`${auctionSelected.id}`))
        dispatch(uiModal({
            modalFor: 'offers',
            modalOpen: true,
            modalTitle: 'Ofertas'
        }))
    }

    return (
        <div>
            <Button
                text='Historial de ofertas'
                variant='primary'
                action={handleSeeOffers}
            />
        </div>
    )
}
