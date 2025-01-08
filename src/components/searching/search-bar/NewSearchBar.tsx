import React from 'react'
import { Search } from '../search/Search'
import { Selects } from '../filtersItems/Selects'

interface Props {
    initRoute?: string;
    selectLabels?: boolean;
    withCategory?: boolean;
    withSubcategory?: boolean;
    withSelectAuctionState?: boolean;
    labelCategory?: string;
    labelSubcategory?: string;
    labelAuctionState?: string;
    selectClassname?: string;

}

export const NewSearchBar = ({
    initRoute,
    selectLabels,
    withCategory,
    withSubcategory,
    withSelectAuctionState,
    labelCategory,
    labelSubcategory,
    labelAuctionState,
    selectClassname
}: Props) => {

    return (
        <div className='flex flex-col lg:flex-row lg:justify-between lg:items-center p-4 gap-4'>
            <Search
                initRoute={initRoute}
            />
            <div className='flex gap-2'>
                <Selects
                    labels={selectLabels}
                    withCategory={withCategory}
                    withSubcategory={withSubcategory}
                    withSelectAuctionState={withSelectAuctionState}
                    labelCategory={labelCategory}
                    labelSubcategory={labelSubcategory}
                    labelAuctionState={labelAuctionState}
                    selectClassname={selectClassname}
                />
            </div>
        </div>
    )
}
