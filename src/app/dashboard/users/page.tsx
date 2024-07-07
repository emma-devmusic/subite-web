'use client'

import { TableUsers } from "./components/TableUsers";
import { SearchBar } from "./components/SearchBar";
import { useEffect, useState } from "react";
import { HandlePage } from "./components/HandlePage";

export default function UsersPage() {

    
    const [queryObject, setQueryObject] = useState({
        pageQuerys: `search?page=1&limit=30`,
        searchQuerys: ''
    });

    useEffect(() => {
        console.log(queryObject)
    }, [queryObject])

    return (
        <div>
            <SearchBar pagesSearch={queryObject} setQueryObject={setQueryObject} />
            <TableUsers />
            <HandlePage setPagesSearch={setQueryObject} />
        </div>
    );
}