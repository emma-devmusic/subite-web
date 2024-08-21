'use client'
import { HeaderLayout } from "@/components/dashboard/headerLayout/HeaderLayout";
import { btnPrimary, cardBasic } from "@/StylesTailwind/classNames";
import { TreeCategories } from "./components/TreeCategories";
import { SearchCategoriesBar } from "./components/SearchCategoriesBar";
import { useAppDispatch, useAppSelector } from "@/store";
import { uiModal } from "@/store/uiSlice";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { getCategories } from "@/store/categorySlice";
import { QueryObject } from "@/types";
import { HandlePage } from "../users/components/HandlePage";
import { Spinner } from "@/components/spinner/Spinner";
import './stylesCategories.css';

const initialQueryState = 'search?page=1&limit=30'

export default function CatgoriesPage() {

    const dispatch = useAppDispatch()
    const { isAdmin } = useAppSelector(state => state.manageUser)
    const { categories } = useAppSelector(state => state.category)
    const { loading } = useAppSelector(state => state.ui)

    console.log(categories)

    const handleNewCategory = () => {
        dispatch(uiModal({
            modalFor: 'category',
            modalOpen: true,
            modalTitle: 'Nueva Categoría'
        }))
    }

    const [queryObject, setQueryObject] = useState<QueryObject>({
        pageQuerys: initialQueryState,
        searchQuerys: ''
    });

    useEffect(() => {
        dispatch(getCategories(queryObject.pageQuerys + queryObject.searchQuerys))
    }, [queryObject.pageQuerys])

    if (!isAdmin) redirect('/dashboard/user-profile')


    if (loading) return <Spinner />
    if (categories.length === 0) return <p className="mt-10 text-center">No hay categorías</p>
    return (
        <div>
            <HeaderLayout title="Categorias" >
                <div className="flex flex-col sm:flex-row sm:justify-between items-center w-full gap-2">
                    <p className="text-xs sm:text-sm text-gray-500 max-w-xl">Crea y personaliza categorías y subcategorías según tus preferencias y necesidades. Estas estarán accesibles para todos los usuarios.</p>
                    <button className={`${btnPrimary}`} onClick={handleNewCategory}>Nueva Categoría</button>
                </div>
            </HeaderLayout>
            <div className={`${cardBasic} m-2`}>
                <SearchCategoriesBar pagesSearch={queryObject} setPagesSearch={setQueryObject} />
                <hr className="mt-6 mb-3" />
                {
                    (categories.length !== 0)
                    ? <TreeCategories categories={categories} />
                    : <p className="mt-10 text-center">No hay categorías</p>
                }
                <HandlePage limit={10} setPagesSearch={setQueryObject} />
            </div>
        </div>
    );
}