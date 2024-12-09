'use client'

import { TableAuctions } from "../components/TableAuctions";


export default function ActiveAuctionsPage() {

    return (
        <TableAuctions auctionStatus="ACTIVE" tableTitle="Subastas activas" />
    );
}



