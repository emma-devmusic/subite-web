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

type AuctionDate = string | Date;

export const parseAuctionDate = (value: AuctionDate): Date => {
    if (value instanceof Date) {
        return new Date(
            value.getUTCFullYear(),
            value.getUTCMonth(),
            value.getUTCDate(),
            value.getUTCHours(),
            value.getUTCMinutes(),
            value.getUTCSeconds(),
            value.getUTCMilliseconds()
        );
    }

    // El backend expresa las fechas de la subasta con una Z, pero representan
    // la fecha y hora local configuradas. Se toman sus componentes sin aplicar
    // una conversión de zona horaria para no moverlas al día anterior.
    const isoDate = value.match(
        /^(\d{4})-(\d{2})-(\d{2})(?:[T ](\d{2}):(\d{2})(?::(\d{2}))?)?/
    );
    if (isoDate) {
        const [, year, month, day, hour = '0', minute = '0', second = '0'] =
            isoDate;
        return new Date(
            Number(year),
            Number(month) - 1,
            Number(day),
            Number(hour),
            Number(minute),
            Number(second)
        );
    }

    const localDate = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    if (localDate) {
        const [, day, month, year] = localDate;
        return new Date(Number(year), Number(month) - 1, Number(day));
    }

    return new Date(Number.NaN);
};

export const formatAuctionDate = (value?: AuctionDate | null): string => {
    if (!value) return '-';

    const date = parseAuctionDate(value);
    if (Number.isNaN(date.getTime())) return '-';

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${day}/${month}/${date.getFullYear()}`;
};

export const getParamsAuctionState = (str: string): string => {

    let param = ''
    if (str.includes('not-started-auctions')) param = 'NOT_STARTED'
    if (str.includes('finished-auctions')) param = 'FINISHED'
    if (str.includes('active-auctions')) param = 'ACTIVE'
    return param
}

export const getAuctionStatus = (auctionStartDate: AuctionDate, auctionEndDate: AuctionDate): AuctionStatus => {
    const calculateTimeRemaining = (diff: number): TimeRemaining => {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        return { days, hours, minutes, seconds };
    };

    const now = new Date();
    const startDate = parseAuctionDate(auctionStartDate);
    const endDate = parseAuctionDate(auctionEndDate);

    if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
        return { status: 'finish' };
    }

    if (now < startDate) {
        // Subasta aún no ha comenzado (estado 'pending')
        const diff = startDate.getTime() - now.getTime();
        return {
            status: 'pending',
            timeRemaining: calculateTimeRemaining(diff)
        };
    } else if (now >= startDate && now < endDate) {
        // Subasta en curso (estado 'running')
        const diff = endDate.getTime() - now.getTime();
        return {
            status: 'running',
            timeRemaining: calculateTimeRemaining(diff)
        };
    } else {
        // Subasta finalizada (estado 'finish')
        return { status: 'finish' };
    }
};
