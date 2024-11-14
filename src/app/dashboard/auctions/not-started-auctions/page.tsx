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



const initialQueryState = 'search?page=1&limit=10'

const columns = ['Producto', 'Fecha de inicio', 'Fecha de finalización', 'Precio', 'Acciones']

export default function NotStartedAuctionsPage() {

    const dispatch = useAppDispatch()
    const { products, productAuditsStatuses } = useAppSelector(state => state.product)
    const { categories } = useAppSelector(state => state.category)

    const [queryObject, setQueryObject] = useState<QueryObject>({
        pageQuerys: 'search?page=1&limit=10&with_auction=NOT_STARTED',
        searchQuerys: ''
    });

    // useEffect(() => {
    //     dispatch(getProducts(queryObject.pageQuerys + queryObject.searchQuerys))
    // }, [])

    useEffect(() => {
        if (categories.length === 0) dispatch(getCategories('search?page=1&limit=30'))
        if (productAuditsStatuses.length === 0) dispatch(getProductAuditsStatuses())
        console.log(products)

    }, [])


    if (categories.length === 0) return <Spinner />


    return (
        <div>
            <SearchBar pagesSearch={queryObject} setPagesSearch={setQueryObject} titleSearch="Subastas Inactivas" forAuction />
            <TableLayout withCheckbox={false} columns={columns} >
                {
                    products.map((prod, i) =>
                        <TableAuctionsRow key={i} {...prod} />
                    )
                }
            </TableLayout>
            <HandlePage setPagesSearch={setQueryObject} limit={10} />
        </div>
    );
}
