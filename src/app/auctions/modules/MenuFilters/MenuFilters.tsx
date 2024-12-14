import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline"
import { Filters } from "./Filters"
import { OffCanvas } from "@/components/OffCanvas/OffCanvas"
import { Selects } from "./filtersItems/Selects"
import { ButtonOffCanvas } from "@/components/buttons/ButtonOffCanvas"


export const MenuFilters = () => {

    return (
        <div className="lg:min-w-[300px] relative">
            <ButtonOffCanvas
                canvasFor="filters"
                icon={<AdjustmentsHorizontalIcon className="text-secondary h-5 w-auto" />}
                text="Filtros"
                textClass="text-lg"
                buttonClass="fixed bottom-5 left-5 z-50 lg:hidden"
            />
            <div className="lg:hidden">
                <OffCanvas
                    canvasId="filters"
                    icon={<AdjustmentsHorizontalIcon className="text-secondary h-5 w-auto" />}
                    title="Filtra tu búsqueda"
                >
                    <Selects />
                </OffCanvas>
            </div>
            <Filters />
        </div>
    )
}
