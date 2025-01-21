'use client'

import { useAppDispatch, useAppSelector } from "@/store";
import { getOffers } from "@/store/slices/offersSlice";
import { SmallSpinner } from "@/components/spinner/Spinner";
import { BlobOffer } from "./BlobOffer";
import { uiModal } from "@/store/slices/uiSlice";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import Swal from "sweetalert2";

export const Offers = () => {


    const dispatch = useAppDispatch()
    const { auctionSelected } = useAppSelector(state => state.auction)
    const { productSelected } = useAppSelector(state => state.product)
    const { loading } = useAppSelector(state => state.ui)
    const { isAdmin } = useAppSelector(state => state.manageUser)
    const { offers, bestOffer } = useAppSelector(state => state.offers)
    const [status, setStatus] = useState<'waiting' | 'running' | 'finished'>('waiting')

    useEffect(() => {
        if (auctionSelected) {
            const convertToDate = (dateString: string): Date => {
                const [day, month, year] = dateString.split('/').map(Number);
                return new Date(year, month - 1, day); // Crear fecha en formato válido
            };
            const now = new Date();
            const startDate = convertToDate(dayjs(auctionSelected?.init_date).format('DD/MM/YYYY'));
            const endDate = convertToDate(dayjs(auctionSelected?.end_date).format('DD/MM/YYYY'));
            if (now < startDate) {
                setStatus('waiting')
            } else if (now > endDate) {
                setStatus('finished')
            } else {
                setStatus('running')
            }
        }
    }, [productSelected])


    const handleRefresh = () => {
        dispatch(getOffers(`${auctionSelected.id}`))
    }

    const handleNewOffer = () => {

        // if(status === 'running') {
            dispatch(uiModal({
                modalFor: 'new_offer',
                modalOpen: true,
                modalTitle: `Nueva Oferta - ${productSelected.name}`
            }))
        // } else {
        //     Swal.fire('No Permitido', 'No puedes ofertar en este momento porque la subasta no comenzó, o bien, ya finalizó.', 'info')
        // }

    }

    return (
        <form action="" >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div>
                    <h6 className="text-center mb-6">Revisa las <span className="text-primaryHover">ofertas</span> minuto a minuto.</h6>
                </div>
                {/* <div className='bg-slate-100 p-4 border-l-2 border-gray-400'>
                    <p className='text-gray-600 text-xs'>Si lo deseas puedes crear una <span className="text-primaryHover hover:cursor-pointer hover:text-primary">nueva oferta</span> para algún usuario en particular.</p>
                </div> */}
                <div className="flex my-6 justify-between items-center">
                    {
                        !isAdmin &&
                        <button
                            type="button"
                            className="rounded text-white py-1 px-4 border-[1px] border-green-600 bg-green-600  hover:border-green-600 hover:bg-white hover:text-green-600 transition-all "
                            onClick={handleNewOffer}
                        >
                            Ofertar
                        </button>
                    }
                    <h6 className="text-end "><span className="text-primaryHover">Mejor</span> oferta: ${bestOffer.amount}</h6>
                </div>

                <div className="flex flex-col gap-2 overflow-auto max-h-80 ">
                    {
                        loading
                            ? <div><SmallSpinner /></div>
                            : offers.length === 0
                                ? <i className="text-center w-full py-7 border rounded-md text-gray-500">No hay ofertas hasta el momento.</i>
                                : offers.map(offer => <BlobOffer key={offer.amount} offer={offer} />)}
                </div>

            </div>
            <div className="bg-gray-50 px-4 py-4 pb-6 flex sm:px-6 justify-between gap-2">
                <button
                    type="button"
                    className={`w-full rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primaryHover sm:mr-3 sm:w-auto`}
                    onClick={handleRefresh}
                >
                    Refrescar
                </button>
            </div>
        </form>
    );
};
