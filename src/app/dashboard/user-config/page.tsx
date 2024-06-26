'use client'

import { useForm } from "@/hooks/useForm";
import { useAppDispatch, useAppSelector } from "@/store";
import { getUserProfile, sendMailVerification } from "@/store/authSlice";
import { ImageProfile } from "@/types";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FormPass } from "./formPass/FormPass";
import { FormGeneral } from "./formGeneral/FormGeneral";
import { Spinner } from "@/components/spinner/Spinner";
import DecryptedSession from "@/helpers/Permissions";

const alternativeImage = "https://demo.themesberg.com/windster/images/users/bonnie-green.png"

export default function UserConfigPage() {

    const dispatch = useAppDispatch()
    const { userProfile } = useAppSelector(state => state.auth)
    const [imageProfile, setImageProfile] = useState<ImageProfile>()
    const { loading } = useAppSelector(state => state.ui)
    
    

    useEffect(() => {
        setImageProfile({ ...userProfile?.image_profiles.filter(e => e.default)[0] } as ImageProfile)
    }, [userProfile])

    useEffect(() => {
        dispatch(getUserProfile())
    }, [])

    // const session = new DecryptedSession();
    // const userConfigId = session.getPermissionsId()['user-config']
    // const permissionsUserConfig = session.getModuleById(userConfigId)
    
    // // const handleEmailVerification = () => {
    // //     dispatch(uiModal({ modalFor: 'new_user', modalOpen: true }))
    // //     dispatch(sendMailVerification())
    // // }

    if(loading || !userProfile) return <Spinner />

    return (
        <div className="pt-6 px-4">
            <h3 className="text-2xl font-medium mb-5">Configuración de Usuario</h3>
            <div className="w-full flex flex-col gap-4">

                {/* PERFIL */}
                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 flex gap-2 items-center ">
                    <div
                        className="inline-flex text-gray-400 hover:text-gray-600 hover:cursor-pointer transition-all"
                    >
                        <Image width={400} height={400} className="h-28 w-28 rounded-lg object-cover" src={imageProfile?.image_url || alternativeImage} alt="Neil image" />
                    </div>
                    <div className="">
                        <h3 className="text-2xl font-semibold">{`${userProfile?.name} ${userProfile?.last_name}`}</h3>
                        <div className="flex items-center gap-2 mt-1 text-sm">
                            <Icon icon={'material-symbols:mail'} />
                            <span className="m-0">{userProfile?.email}</span>
                        </div>
                        <button className="bg-cyan-600 text-white rounded-lg px-4 py-2 mt-3">
                            Ir al Perfil
                        </button>
                    </div>
                </div>

                {/* CAMBIO DE CONTRASEÑA */}
                <FormPass />

                {/* INFORMACIÓN GENERAL */}
                <FormGeneral userProfile={userProfile} />
                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                    <button
                        className="bg-white border-[1px] border-red-600 text-red-600 rounded-md px-4 py-2 hover:bg-red-600 hover:text-white transition-all"

                    >
                        Eliminar Cuenta
                    </button>
                </div>
            </div>
        </div>
    );
}