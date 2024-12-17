// import { Dialog, Tab, Transition } from "@headlessui/react"
import { Bars3Icon } from "@heroicons/react/24/outline"
import { Dispatch, SetStateAction } from "react"
import { navigation } from "./data";
import { ButtonOffCanvas } from "@/components/buttons/ButtonOffCanvas";
import { OffCanvas } from "@/components/OffCanvas/OffCanvas";
import Link from "next/link";

interface Props {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>
}


export const MobileMenu = () => {

    return (
        <div>
            <ButtonOffCanvas
                buttonClass='bg-transparent hover:bg-transparent shadow-none !p-4 lg:hidden'
                canvasFor="navbar"
                icon={<Bars3Icon className="h-7 w-7 text-secondary hover:text-primary" aria-hidden="true" />}
            />
            <OffCanvas
                canvasId="navbar"
                title="Subite a tus subastas"
            >
                <div className="flex flex-col gap-4">
                    {navigation.pages.map((navItem, index) => (
                        <Link
                            key={index}
                            href={navItem.href}
                            className={`text-gray-600 hover:text-primary transition-all`}
                        >
                            {navItem.name}
                        </Link>
                    ))}
                </div>
            </OffCanvas>
        </div>
    )
}
