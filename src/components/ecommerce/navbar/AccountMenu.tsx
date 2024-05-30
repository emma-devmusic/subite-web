'use client'
import { MenuItem } from "@/components/menuItem"
import { PopoverApp } from "@/components/popover"
import { accountMenuData } from "@/mocks/mocks"
import { useAppSelector } from "@/store"
import { UserCircleIcon } from "@heroicons/react/24/outline"
import { usePathname } from "next/navigation"

export const AccountMenu = () => {

    const { isLogged, user } = useAppSelector(state => state.auth)
    const path = usePathname();

    return (
        <PopoverApp
            button={<UserCircleIcon />}
            classOpen={'h-7 w-7 text-cyan-700'}
            classClose={'h-7 w-7 text-gray-400 hover:text-gray-500'}
            position="end"
        >
            {/* <div className="bg-red absolute"></div> */}
            <ul className='flex flex-col w-[200px]'>
                {
                    accountMenuData.map(item => {
                        let showItem = (item.isLogged === isLogged) ? true : false
                        if (
                            path.includes('dashboard') && item.link === '/dashboard' ||
                            !path.includes('dashboard') && item.link === '/'
                        ) showItem = false
                        return <MenuItem
                            link={item.link}
                            show={showItem}
                            text={item.text}
                            icon={item.icon}
                            key={item.text}
                        />
                    })
                }
            </ul>
        </PopoverApp>
    )
}
