'use client'
import { useAppDispatch, useAppSelector } from "@/store"
import { cleanSelectCategories, selectingCategory } from "@/store/categorySlice"
import { getUsers } from "@/store/manageUserSlice"
import { clearSelectedProduct, getProducts } from "@/store/productSlice"
import { uiModal } from "@/store/uiSlice"
import { QueryObject } from "@/types"
import { useSearchParams } from "next/navigation"
import { Dispatch, SetStateAction, useEffect, useState } from "react"

interface Props {
    setPagesSearch: Dispatch<SetStateAction<QueryObject>>
    pagesSearch: QueryObject
}

// const initialQueryState = 'search?page=1&limit=30'


export const SearchBar = ({ pagesSearch, setPagesSearch }: Props) => {

    const dispatch = useAppDispatch()
    // const searchParams = useSearchParams()
    // const [paramState, setParamState] = useState(pagesSearch.searchQuerys)
    const { categories, categoriesSelected } = useAppSelector(state => state.category)
    const { productAuditsStatuses } = useAppSelector(state => state.product)


    const [filters, setFilters] = useState({
        term: '',
        sub_categories_id: 0,
        categories_id: 0,
        max_price: '',
        min_price: '',
        product_audit_statuses: 0,
    })

    const handleFilter = (e: any) => {
        setFilters((state: any) => ({
            ...state,
            [e.target.name]: (e.target.type === 'checkbox') ? e.target.checked : e.target.value
        }))
    }


    useEffect(() => {
        if (filters.categories_id) dispatch(selectingCategory(`${filters.categories_id}`))
    }, [filters.categories_id])

    useEffect(() => {
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
            if (value) params.append(key, `${value}`)
        })
        setPagesSearch(state => ({
            ...state,
            searchQuerys: params.toString() && `&${params.toString()}`
        }))
    }, [filters])

    const handleNewProduct = () => {
        dispatch(clearSelectedProduct())
        dispatch(cleanSelectCategories())
        dispatch(
            uiModal({
                modalFor: 'new_product',
                modalOpen: true,
                modalTitle: 'Nuevo Producto'
            })
        )
    }

    const handleSearch = (e: any) => {
        e.preventDefault()
        dispatch(getProducts(pagesSearch.pageQuerys + pagesSearch.searchQuerys))
    }

    return (
        <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 ">
            <div className="mb-1 w-full">
                <div className="mb-4 flex justify-between">
                    <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Productos</h1>
                    <button
                        className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center rounded-lg text-sm px-3 py-2 text-center sm:ml-auto"
                        onClick={handleNewProduct}
                    >Nuevo Producto</button>
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
                                    <label htmlFor="max_price" className="text-xs mt-[1px]">Precio Máx.</label>
                                    <input value={filters.max_price} name="max_price" onChange={handleFilter} type="number" id="max_price" className="w-12 border rounded-lg text-xs p-1" />
                                </div>
                                <div className="flex items-center gap-1">
                                    <label htmlFor="min_price" className="text-xs mt-[1px]">Precio Min.</label>
                                    <input value={filters.min_price} name="min_price" onChange={handleFilter} type="number" id="max_price" className="w-12 border rounded-lg text-xs p-1" />
                                </div>
                                <select value={filters.categories_id} onChange={handleFilter} name="categories_id" className="border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-auto p-1">
                                    <option value="">Categorías</option>
                                    {
                                        categories.length > 0 && categories.map(cat => <option value={cat.id} key={cat.id}>{cat.name}</option>)
                                    }
                                </select>
                                {
                                    categoriesSelected?.id &&
                                    <select value={filters.sub_categories_id} onChange={handleFilter} name="sub_categories_id" className="border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-auto p-1">
                                        <option value="">Subcategorías</option>
                                        {
                                            categoriesSelected.subcategories && categoriesSelected.subcategories.map(scat => <option value={scat.id} key={scat.id}>{scat.name}</option>)
                                        }
                                    </select>
                                }
                                <select value={filters.product_audit_statuses} onChange={handleFilter} name="product_audit_statuses" className="border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-auto p-1">
                                    <option value="">Estado</option>
                                    {
                                        productAuditsStatuses.length > 0 && productAuditsStatuses.map( status => <option value={status.id} key={status.id}>{status.description}</option>)
                                    }
                                </select>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}