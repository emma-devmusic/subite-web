'use client'

import { TableAuctions } from "../components/TableAuctions";

export default function NotStartedAuctionsPage() {

    return (
        <TableAuctions auctionStatus="NOT_STARTED" tableTitle="Subastas en espera" />
    );
}
