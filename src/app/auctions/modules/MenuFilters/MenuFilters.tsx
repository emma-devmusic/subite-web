import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline"
import { Filters } from "./Filters"
import { FiltersOffcanvas } from "./FiltersOffcanvas"


export const MenuFilters = () => {

    return (
        <div className="lg:min-w-[300px] relative">
            <button type="button" className="fixed z-50 bottom-5 left-5 lg:hidden py-2 px-6 pl-5 inline-flex items-center text-sm font-medium rounded-md shadow-md bg-gray-300 text-secondary hover:bg-gray-200 focus:outline-none disabled:opacity-50 disabled:pointer-events-none" aria-haspopup="dialog" aria-expanded="false" aria-controls="hs-offcanvas-example" data-hs-overlay="#hs-offcanvas-example">
                <div className="flex gap-2 items-center">
                    <AdjustmentsHorizontalIcon className="text-secondary h-6 w-auto" />
                    <span className="text-lg">
                        Filtros
                    </span>
                </div>
            </button>
            <div className="lg:hidden">
                <FiltersOffcanvas />
            </div>
            <Filters />
        </div>
    )
}
