'use client'

import { ProductsView } from "@/components/dashboard/views";
import { SearchBar } from "./components/SearchBar";
import { useEffect, useState } from "react";
import { QueryObject } from "@/types";
import { useAppDispatch, useAppSelector } from "@/store";
import { redirect } from "next/navigation";
import { HandlePage } from "./components/HandlePage";
import { TableProducts } from "./components/TableProducts";
import { TableLayout } from "@/components/tables/TableLayout";
import { TableProductsRow } from "./components/TableProductsRow";

const initialQueryState = 'search?page=1&limit=30'

const columns = ['Titulo', 'Categoría', 'Subcategoría', 'Descripción', 'Precio', 'Stock']

export default function ProductsPage() {

    const dispatch = useAppDispatch()
    // const { isAdmin } = useAppSelector(state => state.manageUser)
    const { users } = useAppSelector(state => state.manageUser)

    const [queryObject, setQueryObject] = useState<QueryObject>({
        pageQuerys: initialQueryState,
        searchQuerys: ''
    });

    useEffect(() => {
        // dispatch(getUsers(queryObject.pageQuerys + queryObject.searchQuerys))
    }, [queryObject.pageQuerys])





    return (
        <div>
            <SearchBar pagesSearch={queryObject} setPagesSearch={setQueryObject} />

            <TableLayout withCheckbox={false} columns={columns} >
                {
                    users.map((user, i) =>
                        <TableProductsRow key={i} {...user} />
                    )
                }
            </TableLayout>
            <HandlePage setPagesSearch={setQueryObject} />
        </div>
    );
}