"use client"

import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline"
import { Filters } from "./Filters"
import { OffCanvas } from "@/components/OffCanvas/OffCanvas"
import { Selects } from "./filtersItems/Selects"
import { ButtonOffCanvas } from "@/components/buttons/ButtonOffCanvas"
import { useEffect, useState } from "react"


export const MenuFilters = () => {


    const [showNavbar, setShowNavbar] = useState(false);
    
        useEffect(() => {
            const handleScroll = () => {
                if (window.scrollY > 400) {
                    setShowNavbar(true);
                } else {
                    setShowNavbar(false);
                }
            };
            window.addEventListener("scroll", handleScroll);
            return () => window.removeEventListener("scroll", handleScroll);
        }, []);
    

    return (
        <div className="lg:min-w-[300px] relative">
            <ButtonOffCanvas
                canvasFor="filters"
                icon={<AdjustmentsHorizontalIcon className="text-secondary h-5 w-auto" />}
                text="Filtros"
                textClass="text-lg"
                buttonClass={`fixed top-[59.90px] right-0 sm:right-5 z-50 lg:hidden transition-all !bg-gray-100 hover:bg-gray-300 ${showNavbar ? "translate-y-0" : "-translate-y-[110px]"}`}
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
