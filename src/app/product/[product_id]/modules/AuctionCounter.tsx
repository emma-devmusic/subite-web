
'use client'
import { Tag } from '@/components/tags/Tag';
import { getAuctionStatus } from '@/helpers/auctions';
import { AuctionProductItem } from '@/types/products';
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
    auction: AuctionProductItem;
}

export const AuctionCounter = ({ auction }: Props) => {

    const [auctionStatus, setAuctionStatus] = useState<AuctionStatus>({
        status: 'pending',
    });

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
        <div className='flex flex-col sm:flex-row justify-between rounded-lg shadow bg-white p-4 gap-4'>
            <div className='flex justify-center sm:justify-normal items-center'>
                <Tag tagClass='!bg-primary md:!text-2xl'>
                    {auctionStatus.status === 'pending' && 'En espera'}
                    {auctionStatus.status === 'running' && 'Activa'}
                    {auctionStatus.status === 'finish' && 'Finalizada'}
                </Tag>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 items-center">
                <p className="text-end text-2xl">
                    {auctionStatus.status === 'pending' && 'Comienza en:'}
                    {auctionStatus.status === 'running' && 'Termina en:'}
                    {auctionStatus.status === 'finish' && 'Finalizada'}
                </p>
                {auctionStatus.timeRemaining && (
                    <div className="flex gap-3 flex-wrap">
                        <div className="">
                            <span className="text-xl">{auctionStatus.timeRemaining.days} </span> <span className="text-sm">días</span>
                        </div>
                        <div className="">
                            <span className="text-xl">{auctionStatus.timeRemaining.hours.toString().padStart(2, '0')}</span><span className="text-sm">hs</span>
                        </div>
                        <div className="">
                            <span className="text-xl">{auctionStatus.timeRemaining.minutes.toString().padStart(2, '0')}</span><span className="text-sm">min</span>
                        </div>
                        <div className="">
                            <span className="text-xl">{auctionStatus.timeRemaining.seconds.toString().padStart(2, '0')}</span><span className="text-sm">seg</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
