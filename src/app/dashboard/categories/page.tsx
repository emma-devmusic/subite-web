'use client'
import { HeaderLayout } from "@/components/dashboard/headerLayout/HeaderLayout";
import { btnPrimary, cardBasic } from "@/StylesTailwind/classNames";
import { TreeCategories } from "./components/TreeCategories";
import { SearchCategoriesBar } from "./components/SearchCategoriesBar";
import { useAppDispatch, useAppSelector } from "@/store";
import { uiModal } from "@/store/uiSlice";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { cleanSelectCategories, getCategories } from "@/store/categorySlice";
import { QueryObject } from "@/types";
import { HandlePage } from "../users/components/HandlePage";
import { Spinner } from "@/components/spinner/Spinner";
import './stylesCategories.css';
import PrelineScript from "@/components/prelineScript/PrelineScript";

const initialQueryState = 'search?page=1&limit=30'

export default function CatgoriesPage() {

    const dispatch = useAppDispatch()
    const { isAdmin } = useAppSelector(state => state.manageUser)
    const { categories, filterInPage } = useAppSelector(state => state.category)
    const { loading } = useAppSelector(state => state.ui)

    const handleNewCategory = () => {
        dispatch(cleanSelectCategories())
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

    if (!isAdmin) return <p className="mt-10 text-center">¿Eres Administrador?</p>
    if (loading) return <Spinner />

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
                    (categories.length === 0)
                        ? <p className="mt-10 text-center">No hay categorías</p>
                        : (filterInPage.length !== 0)
                            ? <TreeCategories categories={filterInPage} />
                            : <p className="my-10 text-start">No hay esa categoría en esta búsqueda</p>
                }
                {/* {
                    <TreeCategories categories={filterInPage} />
                } */}
                <HandlePage limit={10} setPagesSearch={setQueryObject} />
                <PrelineScript />

            </div>
        </div>
    );
}