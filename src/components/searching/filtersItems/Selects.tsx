'use client'

import PrelineScript from '@/components/prelineScript/PrelineScript';
import { Select } from '@/components/form';
import { getCategoriesFromDB } from '@/services-actions/home/categories';
import { ItemDataCategoriesHomeResponse } from '@/types/categoriesHome';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

const AUCTION_STATUS = [{ id: 0, name: 'FINISHED' }, { id: 1, name: 'ACTIVE' }, { id: 2, name: 'NOT_STARTED' }]


interface Props {
    labels?: boolean;
    withSelectAuctionState?: boolean;
    withCategory?: boolean;
    withSubcategory?: boolean;
    selectClassname?: string;
    labelCategory?: string;
    labelSubcategory?: string;
    labelAuctionState?: string;
}

export const Selects = ({
    labels = true,
    labelCategory = 'Selecciona una categoría',
    labelSubcategory = 'Selecciona una subcategoría',
    labelAuctionState = 'Selecciona un estado',
    withCategory = true,
    withSubcategory = true,
    withSelectAuctionState = true,
    selectClassname = ''
}: Props) => {

    const params = useSearchParams();
    const pathname = usePathname()
    const router = useRouter();

    const [auctionsTypes] = useState([{ id: 'FINISHED', name: 'Finalizadas' }, { id: 'ACTIVE', name: 'Activas' }, { id: 'NOT_STARTED', name: 'No iniciadas' }])
    const [initialCategory] = useState<ItemDataCategoriesHomeResponse>({ id: 0, name: `${labelCategory}` } as ItemDataCategoriesHomeResponse)
    const [initialSubcategory] = useState<ItemDataCategoriesHomeResponse>({ id: 0, name: `${labelSubcategory}` } as ItemDataCategoriesHomeResponse)
    const [categorySelected, setCategorySelected] = useState<ItemDataCategoriesHomeResponse>(initialCategory)
    const [subcategorySelected, setSubcategorySelected] = useState<ItemDataCategoriesHomeResponse>(initialSubcategory)
    const [categories, setCategories] = useState<ItemDataCategoriesHomeResponse[]>([])
    const [subcategories, setSubcategories] = useState<ItemDataCategoriesHomeResponse[]>([])
    const [withAuctionState, setAuctionState] = useState({ id: '0', name: `${labelAuctionState}` })

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
            let auctionStatus = auctionsTypes.find(a => a.id === params.get('with_auction'))
            if (auctionStatus) {
                setAuctionState(auctionStatus);
            } else {
                router.push(pathname + '?' + deleteQueryString(['with_auction']))
            }
        }
    }, [categories, auctionsTypes, deleteQueryString, params, pathname, router])

    return (
        <>
            {
                withCategory &&
                <Select
                    label={labels ? "Categoría" : ""}
                    name="categories"
                    value={categorySelected?.id?.toString() || "0"}
                    onChange={handleSelectCategory}
                    className={selectClassname}
                    options={[
                        { value: initialCategory?.id?.toString() || "0", label: initialCategory?.name || "Selecciona categoría" },
                        ...categories.map((cat) => ({
                            value: cat?.id?.toString() || "0",
                            label: cat?.name || "Sin nombre"
                        }))
                    ]}
                />
            }
            {
                withSubcategory &&
                <Select
                    label={labels ? "Subcategoría" : ""}
                    name="subcategories"
                    value={subcategorySelected?.id?.toString() || "0"}
                    onChange={handleSelectSubategory}
                    className={selectClassname}
                    options={[
                        { value: initialSubcategory?.id?.toString() || "0", label: initialSubcategory?.name || "Selecciona subcategoría" },
                        ...subcategories.map((subcat) => ({
                            value: subcat?.id?.toString() || "0",
                            label: subcat?.name || "Sin nombre"
                        }))
                    ]}
                />
            }
            {
                withSelectAuctionState &&
                <Select
                    label={labels ? "Estado de Subasta" : ""}
                    name="auction-status"
                    value={withAuctionState?.id || "0"}
                    onChange={handleAuctionStatusChange}
                    className={selectClassname}
                    options={[
                        { value: '0', label: labelAuctionState },
                        ...auctionsTypes.map((status) => ({
                            value: status?.id || "0",
                            label: status?.name || "Sin nombre"
                        }))
                    ]}
                />
            }
            <PrelineScript />
        </>
    )
}
