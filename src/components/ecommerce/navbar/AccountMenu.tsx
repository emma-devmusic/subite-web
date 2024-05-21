'use client'
import { MenuItem } from "@/components/menuItem"
import { PopoverApp } from "@/components/popover"
import { getSession } from "@/helpers"
import { accountMenuData } from "@/mocks/mocks"
import { RootState, useAppSelector } from "@/store"
import { UserCircleIcon } from "@heroicons/react/24/outline"
import Image from "next/image"
import { usePathname } from "next/navigation"


export const AccountMenu = () => {

    const {isLogged, user} = useAppSelector( state => state.auth)
    const path = usePathname();

    return (
        <PopoverApp
            button={
                (isLogged)
                    ? <Image width={300} height={300} className="h-7 w-7 rounded-full " src={user?.urlImg ?? ''} alt="Neil Sims avatar" />
                    : <UserCircleIcon />
            }
            classOpen={(isLogged) ? '' : 'h-7 w-7 text-cyan-700'}
            classClose={(isLogged) ? '' : 'h-7 w-7 text-gray-400 hover:text-gray-500'}
            position="end"
        >
            <div className="bg-red absolute"></div>
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
                    }
                    )
                }
            </ul>
        </PopoverApp>
    )
}
