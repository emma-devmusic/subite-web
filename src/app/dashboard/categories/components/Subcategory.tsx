'use client'

import { CategoryItem } from "@/types/category";
import { ActionButtons } from "./ActionButtons";

interface Props {
    subcategory: CategoryItem
}

export const Subcategory = ({subcategory}: Props) => {

    return (    
                <div className="hs-accordion active" role="treeitem" aria-expanded="true" id="hs-caret-tree-sub-heading-one">
                    <div className="hs-accordion-heading py-0.5 flex items-center gap-x-0.5 w-full">
                        <div className="grow hs-accordion-selectable hs-accordion-selected:bg-gray-100 pl-1.5 rounded-md cursor-pointer">
                            <div className="flex items-center gap-x-3">
                                <div className="grow py-1.5 hs-accordion-selectable category-btn hs-accordion-selected:bg-gray-100 px-1.5 rounded-md cursor-pointer">
                                    <div className="flex items-center gap-x-3 ">
                                        <div className="grow">
                                            <span className="text-sm text-gray-800">
                                                {subcategory.name}
                                            </span>
                                        </div>
                                        <ActionButtons category={subcategory} isSubcategory={true} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    );
};
