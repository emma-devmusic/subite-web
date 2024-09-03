'use client'

import { useAppDispatch } from "@/store";
import { filteringInPage } from "@/store/categorySlice";
import { QueryObject } from "@/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface Props {
    setPagesSearch: Dispatch<SetStateAction<QueryObject>>;
    pagesSearch: QueryObject;
}

// const router = useRouter()
// const pathname = usePathname()
// const searchParams = useSearchParams()
// const params = new URLSearchParams(searchParams.toString())
// params.set('term', inputSearch.term)
// router.push(pathname + '?' + params)

export const SearchCategoriesBar = ({ pagesSearch, setPagesSearch }: Props) => {

    const dispatch = useAppDispatch()
    const [inputSearch, setInputSearch] = useState({
        term: ''
    })

    useEffect(() => {
        dispatch(filteringInPage(inputSearch))
    },[inputSearch])
   

    return (
                <div className="block sm:flex items-center md:divide-x md:divide-gray-100 ">
                    <form className="sm:pr-3 mb-4 sm:mb-0 flex flex-col gap-2" onSubmit={(e) => {e.preventDefault()}}>
                        <div className="mt-1 relative flex gap-2">
                            <input
                                type="text"
                                name="term"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 sm:min-w-96"
                                placeholder="Búsqueda por paginado"
                                value={inputSearch.term}
                                onChange={(e) => setInputSearch({ term: e.target.value })}
                            />
                            <button
                                type="submit"
                                className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center rounded-lg text-sm px-3 py-2 text-center sm:ml-auto"
                            >
                                Buscar
                            </button>
                        </div>
                        
                    </form>
                </div>
    );
};
