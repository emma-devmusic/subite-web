'use client'
import { Button } from '@/components/buttons/Button'
import { getFromSessionStorage } from '@/commons/helpers'
import { useAppDispatch, useAppSelector } from '@/store'
import { selectAuction } from '@/store/slices/auctionSlice'
import { getOffers } from '@/store/slices/offersSlice'
import { selectProduct } from '@/store/slices/productSlice'
import { uiModal } from '@/store/slices/uiSlice'
import { DataHomeProductResponse } from '@/types/homeProductResponse'
import { useEffect } from 'react'
import Swal from 'sweetalert2'


interface Props {
    product: DataHomeProductResponse
}
export const ButtonOffers = ({ product }: Props) => {

    const { auctionSelected } = useAppSelector(state => state.auction)
    useEffect(() => {
        dispatch(selectAuction(product as any))
        dispatch(selectProduct(product as any))
    }, [])

    const dispatch = useAppDispatch()
    const handleSeeOffers = () => {
        if(getFromSessionStorage('user-login-data')){
            dispatch(getOffers(`${auctionSelected.id}`))
            dispatch(uiModal({
                modalFor: 'offers',
                modalOpen: true,
                modalTitle: 'Ofertas'
            }))
        } else {
            Swal.fire('Inicia Sesión', 'Para visualizar el historial de ofertas debes iniciar sesión.', 'info')
        }
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
