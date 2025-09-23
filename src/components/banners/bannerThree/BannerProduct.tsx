'use client'
import dayjs from "dayjs";
import Image from "next/image";
import { getAuctionStatus } from "@/commons/helpers/auctions";
import { useAppSelector } from "@/store";
import { ItemHomeProductsSearchResponse } from "@/types/homeResponse";
import { useEffect, useRef, useState } from "react";

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
    itemProduct?: ItemHomeProductsSearchResponse;
    itemAlternative?: { img: string; name: string; };
}
export const BannerProduct = ({ itemProduct, itemAlternative }: Props) => {

    const { isLogged } = useAppSelector(state => state.auth)
    const [isClient, setIsClient] = useState(false);

    const [auctionStatus, setAuctionStatus] = useState<AuctionStatus>({
        status: 'pending',
    });

    const [auction] = useState(itemProduct?.products_acutions.find(s => !s.data_deleted))
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // Marcar que estamos en el cliente
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!isClient || !auction) return;

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
    }, [isClient, auction]);



    return (
        <div className="relative flex justify-center items-center banner3-box w-full">
            <button className="banner3-box-button border-2 rounded-md px-4 py-2 transition-all text-sm sm:w-auto md:text-xl text-white hover:bg-primaryHover hover:border-primaryHover">
                {!isLogged ? '¡Registrate para participar!' : 'Ver Subasta'}
            </button>
            <div className="flex flex-col md:flex-row items-center md:items-end absolute z-20 w-11/12 text-center m-auto h-[90%] justify-end md:justify-between text-white gap-4">
                <h4 className="text-3xl font-semibold">{itemProduct?.name || itemAlternative?.name}</h4>
                {
                    itemProduct && isClient &&
                    <div className="banner-auction-status bottom-0 py-2">
                        <p className="banner-auction-status__text mb-2">
                            {auctionStatus.status === 'pending' && 'Comienza en...'}
                            {auctionStatus.status === 'running' && 'Termina en...'}
                            {auctionStatus.status === 'finish' && 'Finalizada'}
                        </p>
                        {auctionStatus.timeRemaining && (
                            <div className="banner-auction-status__time">
                                <div className="banner-auction-status__time-box">
                                    <span className="numb">{auctionStatus.timeRemaining.days} </span> <span className="text-xs">días</span>
                                </div>
                                <div className="banner-auction-status__time-box">
                                    <span className="numb">{auctionStatus.timeRemaining.hours.toString().padStart(2, '0')}</span><span className="text-xs">hs</span>
                                </div>
                                <div className="banner-auction-status__time-box">
                                    <span className="numb">{auctionStatus.timeRemaining.minutes.toString().padStart(2, '0')}</span><span className="text-xs">min</span>
                                </div>
                                <div className="banner-auction-status__time-box">
                                    <span className="numb">{auctionStatus.timeRemaining.seconds.toString().padStart(2, '0')}</span><span className="text-xs">seg</span>
                                </div>
                            </div>
                        )}
                    </div>
                }
            </div>

            <div className="absolute w-full rounded-xl h-full bg-gradient-to-t from-[#000000b0] from-5% via-[#0404047d] to-[#0000003b] to-95% z-10"></div>
            <Image src={itemProduct?.product_variations[0].productImages[0].url_image || itemAlternative?.img || ''} height={600} width={1200} alt="textimg" className="rounded-lg m-auto h-[400px] md:h-[600px] object-cover relative " />
        </div>
    );
};
