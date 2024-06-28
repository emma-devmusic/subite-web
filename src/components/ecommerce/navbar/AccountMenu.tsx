'use client'
import { MenuItem } from "@/components/menuItem"
import { PopoverApp } from "@/components/popover"
import { SmallSpinner, Spinner } from "@/components/spinner/Spinner"
import { accountMenuData } from "@/mocks/mocks"
import { useAppDispatch, useAppSelector } from "@/store"
import { getUserProfile } from "@/store/authSlice"
import { ImageProfile } from "@/types"
import { UserCircleIcon } from "@heroicons/react/24/outline"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export const AccountMenu = () => {
    
    const alternativeImage = "https://demo.themesberg.com/windster/images/users/bonnie-green.png"
    const [imageProfile, setImageProfile] = useState<ImageProfile>()
    const { isLogged, userProfile } = useAppSelector(state => state.auth)
    const { loading } = useAppSelector(state => state.ui)
    const path = usePathname();

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!userProfile && isLogged) dispatch(getUserProfile())
    }, [])

    useEffect(() => {
        setImageProfile({ ...userProfile?.image_profiles.filter(e => e.default)[0] } as ImageProfile)
    }, [userProfile])

    if ((!userProfile || loading) && isLogged) return <SmallSpinner />

    return (
        <PopoverApp
            button={ <Image width={28} height={28} className="rounded-full object-cover" src={imageProfile?.image_url || alternativeImage} alt="Neil image" style={{
                height: 28,
                width: 28
            }}/> }
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
