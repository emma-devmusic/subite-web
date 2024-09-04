'use client'
import { Category } from "./Category";
import { CategoryItem } from '../../../../types/category';
import PrelineScript from "@/components/prelineScript/PrelineScript";
import { useState } from "react";


interface Props {
    categories: CategoryItem[]
}


export const TreeCategories = ({ categories }: Props) => {

    const [alert, setAlert] = useState(false)


    return (
        <>
            {
                alert &&
                <div className='bg-red-100 p-4 border-l-2 border-red-300 max-w-[510px]'>
                    <p className='text-gray-600 text-xs '>Todas las categorías deben tener una subcategoría.</p>
                </div>
            }
            <div className="max-w-lg mb-4">
                <div className="hs-accordion-treeview-root" role="tree" aria-orientation="vertical">
                    <div className="hs-accordion-group" role="group">
                        {
                            categories.map((category) => (
                                <Category key={category.id} category={category} setAlert={setAlert} />
                            ))
                        }
                    </div>
                </div>
            </div>
            <PrelineScript />
        </>
    );
};


