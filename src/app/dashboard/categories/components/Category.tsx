'use client'
import { CategoryItem } from '@/types/category';
import { ActionButtons } from './ActionButtons';
import { Subcategory } from './Subcategory';

interface Props {
    category: CategoryItem;
}

export const Category = ({category}: Props) => {

    return (
        <div className="hs-accordion" role="treeitem" aria-expanded="false" id={`hs-caret-tree-heading-${category.id}`}>
            <div className="hs-accordion-heading py-0.5 flex items-center gap-x-0.5 w-full">
                <button className="hs-accordion-toggle size-9 flex justify-center items-center hover:bg-gray-100 rounded-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none" aria-expanded="false" aria-controls="hs-caret-tree-collapse-one">
                    <svg className="hs-accordion-active:rotate-90 transition duration-300 size-3 text-gray-600" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"></path>
                    </svg>
                </button>
                <div className="grow py-1.5 hs-accordion-selectable category-btn hs-accordion-selected:bg-gray-100 px-1.5 rounded-md cursor-pointer">
                    <div className="flex items-center gap-x-3 ">
                        <div className="grow">
                            <span className="text-sm text-gray-800">
                                {category.name}
                            </span>
                        </div>
                        <ActionButtons category={category} />
                    </div>
                </div>
            </div>
            <div id="hs-caret-tree-collapse-one" className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300" role="group" aria-labelledby={`hs-caret-tree-heading-${category.id}`} style={{height: 0}}>
                <div className="hs-accordion-group ps-7 relative before:absolute before:top-0 before:start-3 before:w-0.5 before:-ms-px before:h-full before:bg-gray-100" role="group" >
                    <p className='text-xs ms-4 text-gray-600'>
                        <span>Descripción: </span><span>{category.description}</span>
                    </p>
                    {
                        category.subcategories && category.subcategories.map((subcategory) => (
                            <Subcategory key={subcategory.id} subcategory={subcategory} />
                        ))
                    }
                </div>
            </div>
        </div>

    );
};
