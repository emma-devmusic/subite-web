'use client'
import { getAuctionStatus } from '@/helpers/auctions';
import { ItemHomeProductsSearchResponse } from '@/types/homeResponse';
import dayjs from 'dayjs';
import React, { useEffect, useRef, useState } from 'react'

interface TimeRemaining {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}


interface AuctionStatus {
    status: 'pending' | 'running' | 'finish';
    timeRemaining?: TimeRemaining;
}


interface Props {
    itemProduct: ItemHomeProductsSearchResponse
}

export const CounterCardProduct = ({ itemProduct }: Props) => {

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

    return (
        <div>
            <span className="absolute z-10 inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-secondary text-white top-2 right-2">
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
    )
}
