'use client'

import dayjs from "dayjs"
import Image from "next/image"
import { getAuctionStatus } from "@/helpers/auctions"
import { ItemHomeProductsSearchResponse } from "@/types/homeResponse"
import { useEffect, useRef, useState } from "react"

interface TimeRemaining {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

interface Props {
    itemProduct: ItemHomeProductsSearchResponse
}

interface AuctionStatus {
    status: 'pending' | 'running' | 'finish';
    timeRemaining?: TimeRemaining;
}


export const CardProduct = ({ itemProduct }: Props) => {

    const [auctionStatus, setAuctionStatus] = useState<AuctionStatus>({
        status: 'pending',
    });
    const [auction] = useState(itemProduct.products_acutions.find(s => !s.data_deleted))
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    useEffect(() => {
        const updateStatus = () => {
            const status = getAuctionStatus(dayjs(auction?.init_date).format('DD/MM/YYYY'), dayjs(auction?.end_date).format('DD/MM/YYYY'));
            setAuctionStatus(status);
        };

        // Actualizar cada segundo
        updateStatus();
        intervalRef.current = setInterval(updateStatus, 1000);

        // Limpiar el intervalo al desmontar el componente
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    //IMPLEMENTAR EL CONTADOR


    return (
        <div className="group relative border rounded-lg overflow-hidden">
            <div className="relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80 relative">
                    <Image width={300} height={300} src={itemProduct.product_variations[0].productImages[0].url_image} alt="Front of men&#039;s Basic Tee in black." className="h-full w-full object-cover object-center lg:h-full lg:w-full" />
                </div>
                <div>
                    <span className="absolute z-10 inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-teal-500 text-white top-2 right-2">
                        {auctionStatus.status === 'pending' && 'En espera'}
                        {auctionStatus.status === 'running' && 'Activa'}
                        {auctionStatus.status === 'finish' && 'Finalizada'}
                    </span>
                    <div className="card-auction-status absolute w-full bottom-0 py-2">
                        <p className="card-auction-status__text mb-2">
                            {auctionStatus.status === 'pending' && 'Comienza en...'}
                            {auctionStatus.status === 'running' && 'Termina en...'}
                            {auctionStatus.status === 'finish' && 'Finalizada'}
                        </p>
                        {auctionStatus.timeRemaining && (
                            <div className="card-auction-status__time">
                                <div className="card-auction-status__time-box">
                                    <span className="numb">{auctionStatus.timeRemaining.days} </span> <span className="text-xs">días</span>
                                </div>
                                <div className="card-auction-status__time-box">
                                    <span className="numb">{auctionStatus.timeRemaining.hours.toString().padStart(2, '0')}</span><span className="text-xs">hs</span>
                                </div>
                                <div className="card-auction-status__time-box">
                                    <span className="numb">{auctionStatus.timeRemaining.minutes.toString().padStart(2, '0')}</span><span className="text-xs">min</span>
                                </div>
                                <div className="card-auction-status__time-box">
                                    <span className="numb">{auctionStatus.timeRemaining.seconds.toString().padStart(2, '0')}</span><span className="text-xs">seg</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="p-3">
                <div>
                    <h3 className="font-semibold text-xl text-gray-700 mb-3 mt-1">
                        {itemProduct.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">Precio inicial: <strong>${itemProduct.product_variations[0].price}</strong></p>
                    <p className="mt-1 text-sm text-gray-500">Puja mínima: <strong>${auction?.bid_amount}</strong></p>
                    <p className="mt-1 text-sm text-gray-500">Fecha de inicio: <span>{dayjs(auction?.init_date).format('DD/MM/YYYY')}</span></p>
                </div>
            </div>
            <div className="card-box-button mt-3">
                <button className="text-cyan-700 hover:text-white hover:bg-cyan-600 transition-all">
                    Ver Subasta
                </button>
            </div>
        </div>
    )
}

