'use client'

import { TableUsers } from "./components/TableUsers";
import { SearchBar } from "./components/SearchBar";
import { useEffect, useState } from "react";
import { HandlePage } from "./components/HandlePage";
import { useAppDispatch, useAppSelector } from "@/store";
import { getUsers } from "@/store/manageUserSlice";
import { redirect } from "next/navigation";

export interface QueryObject {
    pageQuerys: string;
    searchQuerys: string;
}

const initialQueryState = 'search?page=1&limit=30'

export default function UsersPage() {

    const dispatch = useAppDispatch()
    const { isAdmin } = useAppSelector(state=> state.manageUser)

    const [queryObject, setQueryObject] = useState<QueryObject>({
        pageQuerys: initialQueryState,
        searchQuerys: ''
    });

    useEffect(() => {
        dispatch( getUsers( queryObject.pageQuerys) )
    }, [])

    useEffect(() => {
        dispatch( getUsers( queryObject.pageQuerys + queryObject.searchQuerys ) )
    }, [queryObject.pageQuerys])

    if(!isAdmin) redirect('/dashboard/user-profile')

    return (
        <div>
            <SearchBar pagesSearch={queryObject} setPagesSearch={setQueryObject} />
            <TableUsers />
            <HandlePage setPagesSearch={setQueryObject} />
        </div>
    );
}