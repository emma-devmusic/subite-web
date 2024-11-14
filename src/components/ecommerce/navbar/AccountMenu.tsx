'use client'
import Image from "next/image"
import { MenuItem } from "@/components/menuItem"
import { PopoverApp } from "@/components/popover"
import { SmallSpinner, Spinner } from "@/components/spinner/Spinner"
import { accountMenuData } from "@/mocks/mocks"
import { useAppDispatch, useAppSelector } from "@/store"
import { getUserProfile } from "@/store/slices/authSlice"
import { ImageProfile } from "@/types"
import { Icon } from "@iconify/react/dist/iconify.js"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { MenuItemVerify } from "./MenuItemVerify"
import { menuAccountStyles } from "./styles"

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

    if (!(!userProfile || isLogged) && loading) return <SmallSpinner />

    return (
        <PopoverApp
            button={
                <div className="relative">
                    <Image width={48} height={48} className={menuAccountStyles(userProfile)} src={imageProfile?.image_url || alternativeImage} alt="Neil image" style={{
                        height: 32,
                        width: 32,
                    }} />
                    {
                        userProfile && <>
                            {
                                (userProfile?.auth_user_audits_status_description === 'aprobado')
                                    ? <Icon icon={'bitcoin-icons:verify-filled'} className="absolute text-3xl top-4 left-2 text-cyan-500" />
                                    :
                                    (userProfile?.auth_user_audits_status_description === 'rechazado')
                                        ?
                                        <Icon icon={'uis:exclamation-circle'} className="absolute text-xl top-5 left-4 text-red-500" />
                                        :
                                        <Icon icon={'uis:exclamation-circle'} className="absolute text-xl top-5 left-4 text-yellow-500" />
                            }
                        </>
                    }
                </div>
            }
            classOpen={'h-8 w-8 text-cyan-700'}
            classClose={'h-8 w-8 text-gray-400 hover:text-gray-500'}
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
                    })
                }

                {userProfile && <MenuItemVerify />}
            </ul>
        </PopoverApp>
    )
}
