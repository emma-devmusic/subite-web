'use client'
import { getDashboardUrl } from '@/commons/helpers/envs'
import { parseAuctionDate } from '@/commons/helpers/auctions'
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

    const { isLogged } = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()
    const currentAuction = product.products_acutions?.find(
        auction => !auction.data_deleted
    )

    // Verificar si la subasta ha terminado
    const isAuctionEnded = () => {
        if (!currentAuction) {
            return true; // Si no hay subasta activa, considerar como terminada
        }

        const currentDate = new Date();
        const endDate = parseAuctionDate(currentAuction.end_date);

        return currentDate > endDate;
    }

    const auctionEnded = isAuctionEnded();

    const isAuctionNotStarted = () => {
        if (!currentAuction) {
            return true
        }

        const currentDate = new Date()
        const startDate = parseAuctionDate(currentAuction.init_date)

        return currentDate < startDate
    }

    const auctionNotStarted = isAuctionNotStarted()

    useEffect(() => {
        dispatch(selectAuction(product as any))
        dispatch(selectProduct(product as any))
    }, [dispatch, product])

    const handleSeeOffers = () => {
        if(isLogged){
            window.location.href = getDashboardUrl(`/auctions/offers/${product.id}`)
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
                disabled={auctionEnded || auctionNotStarted || !isLogged}
                tooltip={isLogged ? (auctionNotStarted ? 'La subasta aún no ha comenzado' : auctionEnded ? 'La subasta ha finalizado' : 'Ver historial de ofertas') : 'Inicia sesión para ver el historial de ofertas'}
            />
        </div>
    )
}
