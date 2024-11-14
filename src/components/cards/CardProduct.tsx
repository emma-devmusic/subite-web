'use client'

import { getAuctionStatus } from "@/helpers/auctions"
import { ItemHomeProductsSearchResponse } from "@/types/homeResponse"
import dayjs from "dayjs"
import Image from "next/image"
import { useEffect, useState } from "react"

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


    useEffect(() => {
        const updateStatus = () => {
            const status = getAuctionStatus(dayjs(auction?.init_date).format('DD/MM/YYYY'), dayjs(auction?.end_date).format('DD/MM/YYYY'));
            setAuctionStatus(status);
        };

        // Actualizar cada segundo
        updateStatus();
        const interval = setInterval(updateStatus, 1000);

        // Limpiar el intervalo al desmontar el componente
        return () => clearInterval(interval);
    }, [auction?.init_date, auction?.end_date]);

    //IMPOLEMENTAR EL CONTADOR


    return (
        <div className="group relative border rounded-lg overflow-hidden">
            <div className="relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80 relative">
                    <Image width={300} height={300} src={itemProduct.product_variations[0].productImages[0].url_image} alt="Front of men&#039;s Basic Tee in black." className="h-full w-full object-cover object-center lg:h-full lg:w-full" />
                </div>
                <div>
                    <span className="absolute z-10 inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-teal-500 text-white top-2 right-2">En Proceso</span>
                    <div>
                        <p>
                            {auctionStatus.status === 'pending' && 'Comienza en'}
                            {auctionStatus.status === 'running' && 'Termina en'}
                            {auctionStatus.status === 'finish' && 'Finalizada'}
                        </p>
                        {auctionStatus.timeRemaining && (
                            <p>
                                <span>{auctionStatus.timeRemaining.days} </span> días,{' '}
                                <span>{auctionStatus.timeRemaining.hours.toString().padStart(2, '0')}</span>:
                                <span>{auctionStatus.timeRemaining.minutes.toString().padStart(2, '0')}</span>:
                                <span>{auctionStatus.timeRemaining.seconds.toString().padStart(2, '0')}</span>
                            </p>
                        )}
                    </div>
                </div>
            </div>
            <div className="p-3">
                <div>
                    <h3 className="font-semibold text-xl text-gray-700">
                        {itemProduct.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">Precio inicial: <strong>${itemProduct.product_variations[0].price}</strong></p>
                </div>
                <p className="text-sm font-medium text-gray-900">$35</p>
            </div>
        </div>
    )
}

