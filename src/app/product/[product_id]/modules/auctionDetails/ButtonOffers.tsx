'use client'
import { Button } from '@/components/buttons/Button'
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
    const { isLogged } = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()

    // Verificar si la subasta ha terminado
    const isAuctionEnded = () => {
        if (!product.products_acutions || product.products_acutions.length === 0) {
            return true; // Si no hay subasta activa, considerar como terminada
        }

        const currentAuction = product.products_acutions[0];
        const currentDate = new Date();
        const endDate = new Date(currentAuction.end_date);

        return currentDate > endDate;
    }

    const auctionEnded = isAuctionEnded();

    useEffect(() => {
        dispatch(selectAuction(product as any))
        dispatch(selectProduct(product as any))
    }, [dispatch, product])

    const handleSeeOffers = () => {
        if(isLogged){
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
                text={auctionEnded ? 'Subasta finalizada' : 'Historial de ofertas'}
                variant={auctionEnded ? 'outline-primary' : 'primary'}
                action={handleSeeOffers}
                disabled={auctionEnded}
            />
        </div>
    )
}
