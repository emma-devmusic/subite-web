'use client'
import { HeaderLayout } from "@/components/dashboard/headerLayout/HeaderLayout";
import { btnPrimary, cardBasic } from "@/StylesTailwind/classNames";
import { TreeCategories } from "./components/TreeCategories";
import { SearchCategoriesBar } from "./components/SearchCategoriesBar";
import { useAppDispatch, useAppSelector } from "@/store";
import { uiModal } from "@/store/slices/uiSlice";
import { useEffect, useState } from "react";
import { cleanSelectCategories, filteringInPage, getCategories } from "@/store/slices/categorySlice";
import { QueryObject } from "@/types";
import { HandlePage } from "../users/components/HandlePage";
import { Spinner } from "@/components/spinner/Spinner";
import PrelineScript from "@/components/prelineScript/PrelineScript";
import './stylesCategories.css';
import { Button } from "@/components/buttons/Button";

const initialQueryState = 'search?page=1&limit=10'

export default function CatgoriesPage() {

    const dispatch = useAppDispatch()
    const { isAdmin } = useAppSelector(state => state.manageUser)
    const { loading } = useAppSelector(state => state.ui)
    const { categories, filterInPage } = useAppSelector(state => state.category)
    const [stopNextPage, setStopNextPage] = useState(false)

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

    useEffect(() => {
        dispatch(filteringInPage({ term: '' }))
    }, [categories])

    useEffect(() => {
        setStopNextPage(categories.length < 10)
    }, [categories.length])


    if (!isAdmin) return <p className="mt-10 text-center">¿Eres Administrador?</p>

    return (
        <div>
            <HeaderLayout title="Categorias" >
                <div className="flex flex-col sm:flex-row sm:justify-between items-center w-full gap-2">
                    <p className="text-xs sm:text-sm text-gray-500 max-w-xl">Crea y personaliza categorías y subcategorías según tus preferencias y necesidades. Estas estarán accesibles para todos los usuarios.</p>

                    <Button
                        text="Nueva Categoría"
                        variant="primary"
                        action={handleNewCategory}
                    />
                </div>
            </HeaderLayout>

            <div className={`${cardBasic} m-2`}>
                <SearchCategoriesBar pagesSearch={queryObject} setPagesSearch={setQueryObject} />
                <hr className="mt-6 mb-3" />
                {
                    loading
                        ? <div className="flex my-10 justify-center items-center h-20 w-full">
                            <Spinner />
                        </div>
                        :
                        (categories.length === 0)
                            ? <p className="my-10 text-center">No hay categorías</p>
                            : (filterInPage.length !== 0)
                                ? <TreeCategories categories={filterInPage} />
                                : <p className="my-10 text-start">No existe esa categoría en esta página.</p>
                }
                <PrelineScript />
                <HandlePage limit={10} setPagesSearch={setQueryObject} stop={stopNextPage} />
            </div>
        </div>
    );
}