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



export const getParamsAuctionState = (str: string): string => {

    let param = ''
    if (str.includes('not-started-auctions')) param = 'NOT_STARTED'
    if (str.includes('finished-auctions')) param = 'FINISHED'
    if (str.includes('active-auctions')) param = 'ACTIVE'
    return param
}

export const getAuctionStatus = (auctionStartDate: string, auctionEndDate: string): AuctionStatus => {
    const convertToDate = (dateString: string): Date => {
        const [day, month, year] = dateString.split('/').map(Number);
        return new Date(year, month - 1, day);
    };

    const calculateTimeRemaining = (diff: number): TimeRemaining => {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        return { days, hours, minutes, seconds };
    };

    const now = new Date();
    const startDate = convertToDate(auctionStartDate);
    const endDate = convertToDate(auctionEndDate);

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