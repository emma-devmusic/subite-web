import React from 'react'
import { Selects } from './filtersItems/Selects'

export const Filters = () => {
    return (
        <div className='hidden lg:flex flex-col gap-4 sticky top-10 bg-white rounded-md shadow-sm p-4'>
            <h2>Filtra tu búsqueda</h2>
            <hr />
            <Selects />
        </div>
    )
}
