import React, { useEffect, useState } from 'react';

interface TimeRemaining {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

interface AuctionCounterProps {
    auctionStartDate: string; // Fechas en formato string que luego se convierten a Date
    auctionEndDate: string;
}

export const AuctionCounter: React.FC<AuctionCounterProps> = ({ auctionStartDate, auctionEndDate }) => {

    const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    const [status, setStatus] = useState<'waiting' | 'running' | 'finished'>('waiting');

    useEffect(() => {
        const convertToDate = (dateString: string): Date => {
            const [day, month, year] = dateString.split('/').map(Number);
            return new Date(year, month - 1, day); // Crear fecha en formato válido
        };

        const updateCounter = () => {
            const now = new Date();
            const startDate = convertToDate(auctionStartDate);
            const endDate = convertToDate(auctionEndDate);


            if (now < startDate) {
                // Subasta aún no ha comenzado
                const diff = startDate.getTime() - now.getTime();
                setStatus('waiting');
                setTimeRemaining(calculateTimeRemaining(diff));
            } else if (now >= startDate && now < endDate) {
                // Subasta en curso
                const diff = endDate.getTime() - now.getTime();
                setStatus('running');
                setTimeRemaining(calculateTimeRemaining(diff));
            } else {
                // Subasta finalizada
                setStatus('finished');
                setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        };

        const calculateTimeRemaining = (diff: number): TimeRemaining => {
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            const seconds = Math.floor((diff / 1000) % 60);

            return { days, hours, minutes, seconds };
        };

        const interval = setInterval(updateCounter, 1000);

        return () => clearInterval(interval); // Limpiar el intervalo al desmontar el componente

    }, []);

    return (
        <div className=''>
            <p>
                {status === 'waiting'
                    ? 'Tiempo restante para el inicio:'
                    : status === 'running'
                        ? 'Tiempo restante para finalizar:'
                        : 'La subasta ha finalizado'}
            </p>
            {status !== 'finished' && (
                <p>
                    <strong>{timeRemaining.days}</strong> días, {' '} 
                    <strong>{timeRemaining.hours.toString().length === 1 ? `0${timeRemaining.hours}` : timeRemaining.hours}</strong>:
                    <strong>{timeRemaining.minutes.toString().length === 1 ? `0${timeRemaining.minutes}` : timeRemaining.minutes}</strong>:
                    <strong>{timeRemaining.seconds.toString().length === 1 ? `0${timeRemaining.seconds}` : timeRemaining.seconds}</strong>
                </p>
            )}
        </div>
    );
};

