import React from 'react'
import { HeaderViews } from '../headerViews/HeaderViews'
import { TableEDauctions } from '@/components/tables/TableEDauctions'

export const TodayAuctionsView = () => {
    return (
        <div>
            <HeaderViews 
                breadcrumb={false} 
                title='Subastas del Día'
                button='Actualizar'
                searchBar
            />
            <TableEDauctions />
        </div>
    )
}
