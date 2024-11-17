'use client'

import { useEffect, useState } from "react";
import { QueryObject } from "@/types";
import { useAppDispatch, useAppSelector } from "@/store";
import { TableLayout } from "@/components/tables/TableLayout";
import { getProductAuditsStatuses, getProducts } from "@/store/slices/productSlice";
import { getCategories } from "@/store/slices/categorySlice";
import { Spinner } from "@/components/spinner/Spinner";
import { HandlePage } from "../../users/components/HandlePage";
import { SearchBar } from "../../products/components/SearchBar";
import { TableAuctionsRow } from "../components/TableAuctionsRow";
import { auctionColumns } from "@/utils/objects";
import { TableAuctions } from "../components/TableAuctions";



const initialQueryState = 'search?page=1&limit=10'


export default function NotStartedAuctionsPage() {

    return (
        <TableAuctions auctionStatus="NOT_STARTED" tableTitle="Subastas en espera" />
    );
}
