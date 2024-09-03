'use client'
import { Category } from "./Category";
import { CategoryItem } from '../../../../types/category';
import PrelineScript from "@/components/prelineScript/PrelineScript";


interface Props {
    categories: CategoryItem[]
}


export const TreeCategories = ({ categories }: Props) => {


    
    return (
        <>
            <div className="max-w-lg mb-4">
                <div className="hs-accordion-treeview-root" role="tree" aria-orientation="vertical">
                    <div className="hs-accordion-group" role="group">
                        {
                            categories.map((category) => (
                                <Category key={category.id} category={category} />
                            ))
                        }
                    </div>
                </div>
            </div>
            <PrelineScript />
        </>
    );
};


