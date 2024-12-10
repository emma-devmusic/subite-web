'use client'
import { useAppDispatch } from "@/store"
import { getUsers } from "@/store/slices/manageUserSlice"
import { QueryObject } from "@/types"
import { Dispatch, SetStateAction, useEffect, useState } from "react"


interface Props {
    setPagesSearch: Dispatch<SetStateAction<QueryObject>>
    pagesSearch: QueryObject
}

const initialQueryState = 'search?page=1&limit=30'


export const SearchBar = ({ pagesSearch, setPagesSearch }: Props) => {

    const dispatch = useAppDispatch()

    const [paramState, setParamState] = useState(pagesSearch.searchQuerys)

    const [filters, setFilters] = useState({
        term: '',
        name: 'off',
        last_name: 'off',
        order: '',
        role_description: '',
    })

    const handleFilter = (e: any) => {
        setFilters((state: any) => {
            return {
                ...state,
                [e.target.name]: (e.target.type === 'checkbox') ? e.target.checked : e.target.value
            }
        })
    }


    const createQueryParams = () => {
        let text = ''
        let inputText = filters.term
        for (const [key, value] of Object.entries(filters)) {
            if (value.length === 0 || value === 'off') continue
            if (value) {
                if (key === 'name' || key === 'last_name') {
                    text = text + '&' + key + '=' + inputText
                } else {
                    text = text + '&' + key + '=' + value
                }
            }

        }
        return text
    }


    useEffect(() => {
        const param = createQueryParams()
        setParamState(param)
        setPagesSearch(state => {
            return {
                ...state,
                searchQuerys: param
            }
        })
    }, [filters])

    const handleSearch = (e: any) => {
        e.preventDefault()
        dispatch(getUsers(initialQueryState + paramState))
    }

    return (
        <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 ">
            <div className="mb-1 w-full">
                <div className="mb-4">
                    <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Usuarios</h1>
                </div>
                <div className="block sm:flex items-center md:divide-x md:divide-gray-100">
                    <form className="sm:pr-3 mb-4 sm:mb-0 flex flex-col gap-2">
                        <div className="mt-1 relative flex gap-2">
                            <input
                                type="text"
                                name="term"
                                value={filters.term}
                                onChange={handleFilter}
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                placeholder="Búsqueda"
                            />
                            <button
                                type="submit"
                                className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center rounded-lg text-sm px-3 py-2 text-center sm:ml-auto"
                                onClick={handleSearch}
                            >
                                Buscar
                            </button>
                        </div>
                        <div className="flex gap-2 items-center flex-wrap">
                            <strong className="text-sm mt-2 text-gray-500">Filtrar:</strong>
                            <div className="flex gap-3 mt-2 items-center flex-wrap">
                                <div className="flex items-center gap-1">
                                    <input value={filters.name} name="name" onChange={handleFilter} type="checkbox" id="name" className="" />
                                    <label htmlFor="name" className="text-xs mt-[1px]">Nombre</label>
                                </div>
                                <div className="flex items-center gap-1">
                                    <input value={filters.last_name} name="last_name" onChange={handleFilter} type="checkbox" id="last_name" className="" />
                                    <label htmlFor="last_name" className="text-xs mt-[1px]">Apellido</label>
                                </div>
                                <select value={filters.role_description} onChange={handleFilter} name="role_description" className="border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-auto p-1">
                                    <option value="">Admin/Cliente</option>
                                    <option value="client">Cliente</option>
                                    <option value="administrator">Administrador</option>
                                </select>
                                <select value={filters.order} onChange={handleFilter} name="order" className="border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-auto p-1">
                                    <option value="">Orden Alfabético</option>
                                    <option value="last_name:asc">Ascendente</option>
                                    <option value="last_name:desc">Descendente</option>
                                </select>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}