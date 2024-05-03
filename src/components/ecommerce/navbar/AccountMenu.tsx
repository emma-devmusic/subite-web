import { MenuItem } from "@/components/menuItem"
import { PopoverApp } from "@/components/popover"
import { accountMenuData } from "@/mocks/mocks"
import { UserCircleIcon } from "@heroicons/react/24/outline"
import Image from "next/image"


export const AccountMenu = () => {


    return (
        <PopoverApp
            button={
                <Image width={300} height={300} className="h-10 w-10 rounded-full " src="https://demo.themesberg.com/windster/images/users/lana-byrd.png" alt="Neil Sims avatar" />
                // <UserCircleIcon />
            }
            classOpen=''
            classClose=''
            // classOpen='h-7 w-7 text-indigo-600'
            // classClose='h-7 w-7 text-gray-400 hover:text-gray-500'
            position="end"
        >
            <ul className='flex flex-col w-[200px]'>
                {
                    accountMenuData.map(item =>
                        <MenuItem
                            link={item.link}
                            show={item.isLogged}
                            text={item.text}
                            icon={item.icon}
                            key={item.text}
                        />
                    )
                }
            </ul>
        </PopoverApp>
    )
}
