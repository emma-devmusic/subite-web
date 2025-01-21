
import { Bars3Icon } from "@heroicons/react/24/outline"
import { ButtonOffCanvas } from "@/components/buttons/ButtonOffCanvas";

export const MobileMenu = () => {

    return (
        <ButtonOffCanvas
            buttonClass='bg-transparent hover:bg-transparent shadow-none !p-4 lg:hidden'
            canvasFor="navbar-mobile"
            icon={<Bars3Icon className="h-7 w-7 text-secondary hover:text-primary" aria-hidden="true" />}
        />
    )
}
