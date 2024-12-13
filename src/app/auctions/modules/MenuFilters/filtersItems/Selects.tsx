'use client'

import PrelineScript from '@/components/prelineScript/PrelineScript';
import { getCategoriesFromDB } from '@/actions/categories';
import { ItemDataCategoriesHomeResponse } from '@/types/categoriesHome';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

const AUCTION_STATUS = [{ id: 0, name: 'FINISHED' }, { id: 1, name: 'ACTIVE' }, { id: 2, name: 'NOT_STARTED' }]


export const Selects = () => {

    const params = useSearchParams();
    const pathname = usePathname()
    const router = useRouter();

    const [auctionsTypes] = useState([{ id: 'FINISHED', name: 'Finalizadas' }, { id: 'ACTIVE', name: 'Activas' }, { id: 'NOT_STARTED', name: 'No iniciadas' }])
    const [initialCategory] = useState<ItemDataCategoriesHomeResponse>({ id: 0, name: 'Selecciona una categoría' } as ItemDataCategoriesHomeResponse)
    const [categorySelected, setCategorySelected] = useState<ItemDataCategoriesHomeResponse>(initialCategory)
    const [subcategorySelected, setSubcategorySelected] = useState<ItemDataCategoriesHomeResponse>(initialCategory)

    const [categories, setCategories] = useState<ItemDataCategoriesHomeResponse[]>([])
    const [subcategories, setSubcategories] = useState<ItemDataCategoriesHomeResponse[]>([])

    const [withAuctionState, setAuctionState] = useState({id: '0', name: 'Selecciona un estado'})




    const createQueryString = useCallback((name: string, value: string, forDelete?: string) => {
        const newUrl = new URLSearchParams(params.toString())
        if (forDelete) {
            newUrl.delete(forDelete)
        }
        newUrl.set(name, value)
        return newUrl.toString()
    }, [params])

    const deleteQueryString = useCallback((names: string[]) => {
        const newUrl = new URLSearchParams(params.toString())
        names.forEach(name => newUrl.delete(name))
        return newUrl.toString()
    }, [params])

    const fetchCategories = async () => {
        const categories = await getCategoriesFromDB();
        setCategories(categories.items);
    }





    const handleSelectCategory = (e: any) => {
        setCategorySelected(e.target.value);
        if (!Number(parseInt(e.target.value))) {
            setSubcategories([])
            router.push(pathname + '?' + deleteQueryString(['categories_id', 'sub_categories_id']))
            return
        }
        setSubcategories(
            categories.find((cat) => cat.id === parseInt(e.target.value))
                ?.subcategories as ItemDataCategoriesHomeResponse[]
        )
        router.push(pathname + '?' + createQueryString('categories_id', `${e.target.value}`, 'sub_categories_id'))
    }





    const handleSelectSubategory = (e: any) => {
        setSubcategorySelected(e.target.value);
        if (!Number(parseInt(e.target.value))) {
            router.push(pathname + '?' + deleteQueryString(['sub_categories_id']))
            return
        }
        router.push(pathname + '?' + createQueryString('sub_categories_id', `${e.target.value}`))
    }





    const handleAuctionStatusChange = (e: any) => {
        setAuctionState({ id: e.target.value, name: e.target.options[e.target.selectedIndex].text });
        if (e.target.value === 'Selecciona un estado') {
            router.push(pathname + '?' + deleteQueryString(['with_auction']))
            return
        }
        router.push(pathname + '?' + createQueryString('with_auction', `${e.target.value}`))
    }




    useEffect(() => {
        fetchCategories();
    }, [])

    useEffect(() => {
        if (categories.length > 0) {
            let categoryOnParams: ItemDataCategoriesHomeResponse | undefined;
            if (params.has('categories_id')) {
                categoryOnParams = categories.find(c => c.id === parseInt(params.get('categories_id')!))
                if (categoryOnParams) {
                    setCategorySelected(categoryOnParams);
                    setSubcategories(categoryOnParams.subcategories as ItemDataCategoriesHomeResponse[]);
                    if (params.has('sub_categories_id')) {
                        const subcategoryOnParams = categoryOnParams.subcategories?.find(subc => subc.id === parseInt(params.get('sub_categories_id')!))
                        if (subcategoryOnParams) {
                            setSubcategorySelected(subcategoryOnParams);
                        } else {
                            router.push(pathname + '?' + deleteQueryString(['sub_categories_id']))
                        }
                    }
                } else {
                    router.push(pathname + '?' + deleteQueryString(['categories_id', 'sub_categories_id']))
                    return;
                }
            } else {
                router.push(pathname + '?' + deleteQueryString(['categories_id', 'sub_categories_id']))
            }
        }
        if (params.has('with_auction')) {
            let auctionStatus = auctionsTypes.find( a => a.id === params.get('with_auction'))
            if (auctionStatus) {
                setAuctionState(auctionStatus);
            } else {
                router.push(pathname + '?' + deleteQueryString(['with_auction']))
            }
        }
    }, [categories])

    return (
        <>
            <div>
                <label htmlFor="categories" className="block text-sm font-medium mb-2">Categoría</label>
                <select
                    id='categories'
                    onChange={handleSelectCategory}
                    value={categorySelected.id}
                    className="py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none "
                >
                    <option defaultValue={initialCategory.id}>{initialCategory.name}</option>
                    {
                        categories.map((cat) => {
                            return (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            )
                        })
                    }
                </select>
            </div>
            <div>
                <label htmlFor="subcategories" className="block text-sm font-medium mb-2">Subcategoría</label>
                <select
                    id='subcategories'
                    onChange={handleSelectSubategory}
                    value={subcategorySelected.id}
                    className="py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none "
                >
                    <option defaultValue={initialCategory.id}>{initialCategory.name}</option>
                    {
                        subcategories.map((subcat) => {
                            return (
                                <option key={subcat.id} value={subcat.id}>{subcat.name}</option>
                            )
                        })
                    }
                </select>
            </div>
            <div>
                <label htmlFor="auction-status" className="block text-sm font-medium mb-2">Estado de Subasta</label>
                <select
                    id='auction-status'
                    onChange={handleAuctionStatusChange}
                    value={withAuctionState.id}
                    className="py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none "
                >
                    <option defaultValue={'0'}>Selecciona un estado</option>
                    {
                        auctionsTypes.map((status) => {
                            return (
                                <option key={status.id} value={status.id}>{status.name}</option>
                            )
                        })
                    }
                </select>
            </div>
            <PrelineScript />
        </>
    )
}
