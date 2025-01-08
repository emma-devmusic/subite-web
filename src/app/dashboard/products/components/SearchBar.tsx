'use client'
import { useAppDispatch, useAppSelector } from "@/store"
import { cleanSelectCategories, selectingCategory } from "@/store/slices/categorySlice"
import { getHomeProducts } from "@/store/slices/homeSlice"
import { getUsers } from "@/store/slices/manageUserSlice"
import { clearSelectedProduct, getProducts } from "@/store/slices/productSlice"
import { uiModal } from "@/store/slices/uiSlice"
import { QueryObject } from "@/types"
import { redirect, usePathname, useRouter, useSearchParams } from "next/navigation"
import { Dispatch, SetStateAction, useEffect, useState } from "react"

interface Props {
    setPagesSearch: Dispatch<SetStateAction<QueryObject>>
    pagesSearch: QueryObject;
    titleSearch?: string;
    forAuction?: boolean;
    forHome?: boolean;
}

// const initialQueryState = 'search?page=1&limit=30'


export const SearchBar = ({ pagesSearch, setPagesSearch, titleSearch = 'Productos', forAuction, forHome }: Props) => {

    const dispatch = useAppDispatch()
    const router = useRouter()
    const pathname = usePathname()
    const { categories, categoriesSelected } = useAppSelector(state => state.category)
    const { productAuditsStatuses } = useAppSelector(state => state.product)
    const [auctionTab, setAuctionTab] = useState('')
    const path = pathname.split('/')[3]


    const [filters, setFilters] = useState({
        term: '',
        sub_categories_id: 0,
        categories_id: 0,
        max_price: '',
        min_price: '',
        product_audit_statuses: 0,
        with_auction: ''
    })

    const handleFilter = (e: any) => {
        setFilters((state: any) => ({
            ...state,
            [e.target.name]: (e.target.type === 'checkbox') ? e.target.checked : e.target.value
        }))
    }


    useEffect(() => {
        if (forAuction) {
            if (path === 'not-started-auctions') setAuctionTab('NOT_STARTED')
            if (path === 'active-auctions') setAuctionTab('ACTIVE')
            if (path === 'finished-auctions') setAuctionTab('FINISHED')
        }
    }, [path])


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
        if (forAuction) {
            router.push('/dashboard/products')
            return
        }
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
        if (forAuction) {
            dispatch(getProducts(pagesSearch.pageQuerys + pagesSearch.searchQuerys + '&with_auction=' + auctionTab))
        } else if (forHome) {
            dispatch(getHomeProducts(pagesSearch.pageQuerys + pagesSearch.searchQuerys))
        } else {
            dispatch(getProducts(pagesSearch.pageQuerys + pagesSearch.searchQuerys))
        }
    }

    return (
        <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 ">
            <div className="mb-1 w-full">
                <div className="mb-4 flex justify-between">
                    <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">{titleSearch}</h1>
                    {
                        !forHome &&
                        <button
                            className="text-white bg-primary hover:bg-primaryHover focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center rounded-lg text-sm px-3 py-2 text-center sm:ml-auto"
                            onClick={handleNewProduct}
                        >{forAuction ? 'Nueva Subasta' : 'Nuevo Producto'}</button>
                    }
                </div>
                <div className="block sm:flex items-center md:divide-x md:divide-gray-100">
                    <form className="sm:pr-3 mb-4 sm:mb-0 flex flex-col gap-2">
                        <div className="mt-1 relative flex gap-2">
                            <input
                                type="text"
                                name="term"
                                value={filters.term}
                                onChange={handleFilter}
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                                placeholder="Búsqueda"
                            />
                            <button
                                type="submit"
                                className="text-white bg-primary hover:bg-primaryHover focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center rounded-lg text-sm px-3 py-2 text-center sm:ml-auto"
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
                                    <input value={filters.max_price} name="max_price" onChange={handleFilter} type="number" id="max_price" className="w-28 border rounded-lg text-xs p-1" />
                                </div>
                                <div className="flex items-center gap-1">
                                    <label htmlFor="min_price" className="text-xs mt-[1px]">Precio Min.</label>
                                    <input value={filters.min_price} name="min_price" onChange={handleFilter} type="number" id="max_price" className="w-28 border rounded-lg text-xs p-1" />
                                </div>
                                {
                                    !forHome &&
                                    <>
                                        <select value={filters.categories_id} onChange={handleFilter} name="categories_id" className="border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-primary focus:border-primary block w-auto p-1">
                                            <option value="">Categorías</option>
                                            {
                                                categories.length > 0 && categories.map(cat => <option value={cat.id} key={cat.id}>{cat.name}</option>)
                                            }
                                        </select>
                                        {
                                            categoriesSelected?.id &&
                                            <select value={filters.sub_categories_id} onChange={handleFilter} name="sub_categories_id" className="border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-primary focus:border-primary block w-auto p-1">
                                                <option value="">Subcategorías</option>
                                                {
                                                    categoriesSelected.subcategories && categoriesSelected.subcategories.map(scat => <option value={scat.id} key={scat.id}>{scat.name}</option>)
                                                }
                                            </select>
                                        }
                                        {
                                            !forAuction && <select value={filters.product_audit_statuses} onChange={handleFilter} name="product_audit_statuses" className="border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-primary focus:border-primary block w-auto p-1">
                                                <option value="">Estado</option>
                                                {
                                                    productAuditsStatuses.length > 0 && productAuditsStatuses.map(status => <option value={status.id} key={status.id}>{status.description}</option>)
                                                }
                                            </select>
                                        }
                                    </>
                                }
                                {
                                    forHome && <select value={filters.with_auction} onChange={handleFilter} name="with_auction" className="border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-primary focus:border-primary block w-auto p-1">
                                        <option value="">Estado de subasta</option>
                                        <option value="ACTIVE">Activa</option>
                                        <option value="NOT_STARTED">No Iniciada</option>
                                        <option value="FINISHED">Finalizada</option>
                                    </select>
                                }
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}