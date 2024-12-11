import React from 'react'
import { Selects } from './filtersItems/Selects'
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline'

export const Filters = () => {
    return (
        <div className='hidden lg:flex flex-col gap-4 sticky top-10 bg-white rounded-md shadow-sm p-4'>
            <div
                id="hs-offcanvas-example-label"
                className="font-bold text-gray-800 flex items-center gap-2"
            >
                <AdjustmentsHorizontalIcon className="text-secondary h-5 w-auto" />
                Filtra tu búsqueda
            </div>
            <hr />
            <Selects />
        </div>
    )
}
