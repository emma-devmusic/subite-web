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
import { getProducts } from "@/store/productSlice";
import { getCategories } from "@/store/categorySlice";
import { Spinner } from "@/components/spinner/Spinner";

const initialQueryState = 'search?page=1&limit=10'

const columns = ['Titulo', 'Subcategoría', 'Descripción', 'Precio', 'Stock', 'Acciones']

export default function ProductsPage() {

    const dispatch = useAppDispatch()
    // const { isAdmin } = useAppSelector(state => state.manageUser)
    const { products } = useAppSelector(state => state.product)
    const { categories } = useAppSelector(state => state.category)

    const [queryObject, setQueryObject] = useState<QueryObject>({
        pageQuerys: initialQueryState,
        searchQuerys: ''
    });

    useEffect(() => {
        if (categories.length === 0) dispatch(getCategories('search?page=1&limit=30'))
        dispatch(getProducts(queryObject.pageQuerys + queryObject.searchQuerys))
    }, [queryObject.pageQuerys])




    if (categories.length === 0) return <Spinner />
    return (
        <div>
            <SearchBar pagesSearch={queryObject} setPagesSearch={setQueryObject} />

            <TableLayout withCheckbox={false} columns={columns} >

                {

                    products.map((prod, i) =>
                        <TableProductsRow key={i} {...prod} />
                    )
                }
            </TableLayout>
            <HandlePage setPagesSearch={setQueryObject} />
        </div>
    );
}