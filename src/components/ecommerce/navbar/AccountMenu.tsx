'use client'
import Image from "next/image"
import { MenuItem } from "@/components/menuItem"
import { PopoverApp } from "@/components/popover"
import { SmallSpinner } from "@/components/spinner/Spinner"
import { accountMenuData } from "@/mocks/mocks"
import { useAppDispatch, useAppSelector } from "@/store"
import { getUserProfile } from "@/store/slices/authSlice"
import { ImageProfile } from "@/types"
import { Icon } from "@iconify/react/dist/iconify.js"
import { useEffect, useState } from "react"
import { MenuItemVerify } from "./MenuItemVerify"
import { menuAccountStyles } from "./styles"
import PrelineScript from "@/components/prelineScript/PrelineScript"
import { alternativeImage } from "@/commons/helpers/constants"

export const AccountMenu = () => {

    const [imageProfile, setImageProfile] = useState<ImageProfile>()
    const { isLogged, userProfile } = useAppSelector(state => state.auth)
    const { loading } = useAppSelector(state => state.ui)

    useEffect(() => {
        setImageProfile({ ...userProfile?.image_profiles.filter(e => e.default)[0] } as ImageProfile)
    }, [userProfile])

    if (!(!userProfile || isLogged) && loading) return <SmallSpinner />

    return (
        <PopoverApp
            button={
                <div className="relative">
                    <Image width={48} height={48} className={menuAccountStyles(userProfile)} src={imageProfile?.image_url || alternativeImage} alt="Neil image" style={{
                        height: 38,
                        width: 38,
                    }} />
                    {
                        userProfile && <>
                            {
                                (userProfile?.auth_user_audits_status_description === 'aprobado')
                                    ? <Icon icon={'bitcoin-icons:verify-filled'} className="absolute text-3xl top-6 left-[-4px] text-cyan-500" />
                                    :
                                    (userProfile?.auth_user_audits_status_description === 'rechazado')
                                        ?
                                        <Icon icon={'uis:exclamation-circle'} className="absolute text-xl top-5 left-[-4px] text-red-500" />
                                        :
                                        <Icon icon={'uis:exclamation-circle'} className="absolute text-xl top-5 left-[-4px] text-yellow-500" />
                            }
                        </>
                    }
                </div>
            }
        >
            <ul className='flex flex-col w-[200px] z-40'>
                {
                    accountMenuData.map(item => {
                        let showItem = (item.isLogged === isLogged) ? true : false
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
            <PrelineScript />
        </PopoverApp>
    )
}
