'use client'
import { Spinner } from "@/components/spinner/Spinner";
import { useAppDispatch, useAppSelector } from "@/store";
import { getCategories } from "@/store/slices/categorySlice";
import { auctionColumns } from "@/utils/objects";
import { useEffect } from "react";
import { TableLayout } from "@/components/tables/TableLayout";
import { HandlePage } from "../../users/components/HandlePage";
import { NewSearchBar } from "@/components/searching/search-bar/NewSearchBar";
import { ItemProductSearchResponse, Meta } from "@/types/products";
import { TableProductsRow } from "./TableProductsRow";


interface Props {
    tableTitle: string;
    products: ItemProductSearchResponse[];
    meta: Meta
}

export const TableProducts = ({ tableTitle, products, meta }: Props) => {

    const dispatch = useAppDispatch()
    const { categories } = useAppSelector(state => state.category)

    useEffect(() => {
        if (categories.length === 0) dispatch(getCategories('search?page=1&limit=30'))
    }, [])

    if (categories.length === 0) return <Spinner />

    return (
        <div>
            <h2 className="p-4 pb-0 text-2xl">{tableTitle}</h2>
            <NewSearchBar
                initRoute={`search?page=1&limit=10`}
                selectLabels={false}
                withCategory
                withSubcategory
                withSelectAuctionState={false}
                labelCategory='Categoría'
                labelSubcategory='Subcategoría'
                selectClassname='!p-1 !border-[1px] !border-gray-400 !text-gray-600 !rounded-md !bg-white !shadow-sm'
            />
            <TableLayout withCheckbox={false} columns={auctionColumns} >
                {
                    products.map((prod, i) =>
                        <TableProductsRow key={i} {...prod} />
                    )
                }
            </TableLayout>
            <HandlePage
                limit={10}
                stop={meta.nextPage}
            />
        </div>
    );
};
