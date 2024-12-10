'use client'

import PrelineScript from '@/components/prelineScript/PrelineScript';
import { getCategoriesFromDB } from '@/actions/categories';
import { ItemDataCategoriesHomeResponse } from '@/types/categoriesHome';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

const AUCTION_STATUS = ['FINISHED', 'ACTIVE', 'NOT_STARTED']


export const Selects = () => {
    const params = useSearchParams();
    const pathname = usePathname()
    const router = useRouter();
    const [categories, setCategories] = useState<ItemDataCategoriesHomeResponse[]>([])
    const [ , setCategorySelected] = useState(0)
    const [subcategories, setSubcategories] = useState<ItemDataCategoriesHomeResponse[]>([])
    const [ , setSubcategorySelected] = useState(0)

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
        router.push(pathname + '?' + createQueryString('sub_categories_id', `${e.target.value}`))
    }

    const handleAuctionStatusChange = (e: any) => {
        if (!AUCTION_STATUS.includes(e.target.value)) {
            router.push(pathname + '?' + deleteQueryString(['with_auction']))
            return
        }
        router.push(pathname + '?' + createQueryString('with_auction', `${e.target.value}`))
    }


    useEffect(() => {
        fetchCategories();
    }, [])

    return (
        <>
            <div>
                <label htmlFor="categories" className="block text-sm font-medium mb-2">Categoría</label>
                <select
                    id='categories'
                    onChange={handleSelectCategory}
                    className="py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none "
                >
                    <option defaultValue="0">Selecciona una categoría</option>
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
                    className="py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none "
                >
                    <option defaultValue="0">Selecciona una subacategoría</option>
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
                    className="py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none "
                >
                    <option defaultValue="0">Selecciona un estado</option>
                    <option value="ACTIVE">Activas</option>
                    <option value="FINISHED">Finalizadas</option>
                    <option value="NOT_STARTED">No iniciadas</option>
                </select>
            </div>
            <PrelineScript />
        </>
    )
}
