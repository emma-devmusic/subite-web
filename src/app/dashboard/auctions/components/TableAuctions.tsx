import { Spinner } from "@/components/spinner/Spinner";
import { useAppDispatch, useAppSelector } from "@/store";
import { getCategories } from "@/store/slices/categorySlice";
import { getProductAuditsStatuses, getProducts } from "@/store/slices/productSlice";
import { QueryObject } from "@/types";
import { auctionColumns } from "@/utils/objects";
import { useEffect, useState } from "react";
import { SearchBar } from "../../products/components/SearchBar";
import { TableLayout } from "@/components/tables/TableLayout";
import { TableAuctionsRow } from "./TableAuctionsRow";
import { HandlePage } from "../../users/components/HandlePage";
import { ItemProductSearchResponse } from "@/types/products";


interface Props {
    auctionStatus: 'NOT_STARTED' | 'FINISHED' | 'ACTIVE';
    tableTitle: string;
    // products: ItemProductSearchResponse[]
}

export const TableAuctions = ({auctionStatus, tableTitle}: Props) => {

    
    const dispatch = useAppDispatch()
    const { products } = useAppSelector(state => state.product)
    const { categories } = useAppSelector(state => state.category)
    const [productsState, setProductsState] = useState(products)

    const [queryObject, setQueryObject] = useState<QueryObject>({
        pageQuerys: `search?page=1&limit=10&with_auction=${auctionStatus}`,
        searchQuerys: ''
    });

    useEffect(() => {
        dispatch(getProducts(queryObject.pageQuerys + queryObject.searchQuerys))
    }, [auctionStatus, queryObject])

    useEffect(() => {
        setProductsState(products)
    }, [products])

    useEffect(() => {
        if (categories.length === 0) dispatch(getCategories('search?page=1&limit=30'))
    }, [])

    if (categories.length === 0) return <Spinner />

    return (
        <div>
            <SearchBar pagesSearch={queryObject} setPagesSearch={setQueryObject} titleSearch={tableTitle} forAuction />
            <TableLayout withCheckbox={false} columns={auctionColumns} >
                {
                    productsState.map((prod, i) =>
                        <TableAuctionsRow key={i} {...prod} />
                    )
                }
            </TableLayout>
            <HandlePage 
                setPagesSearch={setQueryObject} 
                limit={10} 
                extraQuery={`with_auction=${auctionStatus}`}
                stop={products.length < 10}
            />
        </div>
    );
};
