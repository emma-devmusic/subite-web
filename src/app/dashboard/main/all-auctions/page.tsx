'use client'

import { useEffect, useState } from "react";
import { QueryObject } from "@/types";
import { useAppDispatch, useAppSelector } from "@/store";
import { TableLayout } from "@/components/tables/TableLayout";
import { HandlePage } from "../../users/components/HandlePage";
import { SearchBar } from "../../products/components/SearchBar";
import { getHomeProducts } from "@/store/slices/homeSlice";
import { getHomeCategories } from "@/store/slices/homeCategoriesSlice";
import { TableRowHomeAuctions } from "../components/TableRowHomeAuctions";



const initialQueryState = 'search?page=1&limit=10'

const columns = ['Producto', 'Fecha de inicio', 'Fecha de finalización', 'Precio', 'Acciones']

export default function AllAuctionsPage() {

    const dispatch = useAppDispatch()
    const { homeProducts } = useAppSelector(state => state.home)
    const { homeCategories } = useAppSelector(state => state.homeCategories)

    const [queryObject, setQueryObject] = useState<QueryObject>({
        pageQuerys: 'search?page=1&limit=10',
        searchQuerys: ''
    });


    useEffect(() => {
        dispatch(getHomeProducts(queryObject.pageQuerys + queryObject.searchQuerys))
    }, [])

    useEffect(() => {
        if (homeCategories.length === 0) dispatch(getHomeCategories())
    }, [])


    return (
        <div>
            <SearchBar pagesSearch={queryObject} setPagesSearch={setQueryObject} titleSearch="Todas Las Subastas" forHome/>
            <TableLayout withCheckbox={false} columns={columns} >
                {
                    homeProducts.map((prod, i) =>
                        <TableRowHomeAuctions key={i} {...prod} />
                    )
                }
            </TableLayout>
            <HandlePage setPagesSearch={setQueryObject} limit={10} stop={homeProducts.length < 10 }/>
        </div>
    );
}



