import React from 'react'
import { HeaderViews } from '../headerViews/HeaderViews'
import { TableEDauctionsAll } from '@/components/tables/TableEDauctionsAll'

export const AllAuctionsView = () => {
    return (
        <div>
            <HeaderViews 
                breadcrumb={false} 
                title='Subastas'
                button='Nueva Subasta'
                searchBar
                configButtons
            />
            <TableEDauctionsAll />
        </div>
    )
}
