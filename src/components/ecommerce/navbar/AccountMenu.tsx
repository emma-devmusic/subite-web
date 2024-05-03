'use client'
import { MenuItem } from "@/components/menuItem"
import { PopoverApp } from "@/components/popover"
import { accountMenuData } from "@/mocks/mocks"
import { useAppSelector } from "@/store"
import { UserCircleIcon } from "@heroicons/react/24/outline"
import Image from "next/image"
import { usePathname } from "next/navigation"


export const AccountMenu = () => {

    const path = usePathname()
    console.log(path.includes('dashboard'))
    const { isLogged, user } = useAppSelector(state => state.auth)

    return (
        <PopoverApp
            button={
                (isLogged)
                    ? <Image width={300} height={300} className="h-10 w-10 rounded-full " src={user?.urlImg || ''} alt="Neil Sims avatar" />
                    : <UserCircleIcon />
            }
            classOpen={(isLogged) ? '' : 'h-7 w-7 text-indigo-600'}
            classClose={(isLogged) ? '' : 'h-7 w-7 text-gray-400 hover:text-gray-500'}
            position="end"
        >
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
