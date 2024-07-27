'use client'

import { ProductsView } from "@/components/dashboard/views";
import { SearchBar } from "./components/SearchBar";
import { useEffect, useState } from "react";
import { QueryObject } from "@/types";
import { useAppDispatch, useAppSelector } from "@/store";
import { redirect } from "next/navigation";
import { HandlePage } from "./components/HandlePage";
import { TableProducts } from "./components/TableProducts";

const initialQueryState = 'search?page=1&limit=30'

export default function ProductsPage() {

    const dispatch = useAppDispatch()
    // const { isAdmin } = useAppSelector(state => state.manageUser)

    const [queryObject, setQueryObject] = useState<QueryObject>({
        pageQuerys: initialQueryState,
        searchQuerys: ''
    });

    useEffect(() => {
        // dispatch(getUsers(queryObject.pageQuerys + queryObject.searchQuerys))
    }, [queryObject.pageQuerys])


    // if(!isAdmin) redirect('/dashboard/user-profile')


    return (
        <div>
            <SearchBar pagesSearch={queryObject} setPagesSearch={setQueryObject} />
                <TableProducts />
            <HandlePage setPagesSearch={setQueryObject}/>
        </div>
    );
}