import React from 'react'
import { Selects } from './filtersItems/Selects'
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline'

export const FiltersOffcanvas = () => {
    return (
        <div
            id="hs-offcanvas-example"
            className="hs-overlay hs-overlay-open:translate-x-0 hidden -translate-x-full fixed top-0 start-0 transition-all duration-300 transform h-full max-w-xs w-full z-[80] bg-white border-e "
            role="dialog"
            tabIndex={-1}
            aria-labelledby="hs-offcanvas-example-label"
        >
            <div className="flex justify-between items-center py-3 px-4 border-b">
                <div
                    id="hs-offcanvas-example-label"
                    className="font-bold text-gray-800 flex items-center gap-2"
                >
                    <AdjustmentsHorizontalIcon className="text-secondary h-5 w-auto" />
                    Filtra tu búsqueda
                </div>
                <button
                    type="button"
                    className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none "
                    aria-label="Close"
                    data-hs-overlay="#hs-offcanvas-example"
                >
                    <span className="sr-only">Close</span>
                    <svg
                        className="shrink-0 size-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M18 6 6 18"></path>
                        <path d="m6 6 12 12"></path>
                    </svg>
                </button>
            </div>
            <div className="p-4 flex flex-col gap-4 ">
                <Selects />
            </div>
        </div>
    )
}
