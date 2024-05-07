import { PopoverApp } from "@/components/popover"
import Image from "next/image"
import Link from "next/link"
import { accountMenuData } from '../../../mocks/mocks';

export const ProfileMenu = () => {

    return (
        <PopoverApp
            button={<Image width={300} height={300} className="h-10 w-10 rounded-full " src="https://demo.themesberg.com/windster/images/users/lana-byrd.png" alt="Neil Sims avatar" />}
            classClose=''
            classOpen=''
            position='end'
        >
            <ul className='flex flex-col'>
                
            </ul>
        </PopoverApp>
    )
}
