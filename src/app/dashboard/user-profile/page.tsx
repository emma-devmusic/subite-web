'use client'
import { Spinner } from "@/components/spinner/Spinner";
import { useAppDispatch, useAppSelector } from "@/store";
import { getUserProfile, sendMailVerification } from "@/store/authSlice";
import { uiModal } from "@/store/uiSlice";
import { ImageProfile } from "@/types";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import { useEffect, useState } from "react";

const alternativeImage = "https://demo.themesberg.com/windster/images/users/bonnie-green.png"

export default function UserProfilePage() {

    const dispatch = useAppDispatch()
    const { loading } = useAppSelector(state => state.ui)
    const { userProfile } = useAppSelector(state => state.auth)
    const [imageProfile, setImageProfile] = useState<ImageProfile>()

    useEffect(() => {
        if(!userProfile) dispatch( getUserProfile() )
    }, [])

    useEffect(() => {
        setImageProfile({ ...userProfile?.image_profiles.filter(e => e.default)[0] } as ImageProfile)
    }, [userProfile])

    const handleEmailVerification = () => {
        dispatch(uiModal({ modalFor: 'validate_code', modalOpen: true }))
        dispatch(sendMailVerification())
    }

    let joinDate = new Date(userProfile?.data_created || '').toLocaleDateString()

    const handleImageEdit = () => {
        dispatch(uiModal({ modalFor: 'edit_image_profile', modalOpen: true }))
    }
    
    // if (loading) return <Spinner />
    if (!userProfile || loading) return <Spinner />


    return (
        <div className="pt-6 px-4">
            <h3 className="text-2xl font-medium mb-5">Perfil de Usuario</h3>
            <div className="w-full grid grid-cols-1 xl:grid-cols-3 gap-4">
                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                    <div
                        className="inline-flex text-gray-400 hover:text-gray-600 hover:cursor-pointer transition-all"
                        onClick={handleImageEdit}
                    >
                        <Image width={400} height={400} className="h-28 w-28 rounded-lg object-cover" src={imageProfile?.image_url || alternativeImage} alt="Neil image" />
                        <Icon icon={'lucide:edit'} className="w-7 h-7 " />
                    </div>
                    <div>
                        <h3 className="text-2xl mt-4 font-semibold">{`${userProfile?.name} ${userProfile?.last_name}`}</h3>
                    </div>
                    <h3 className="text-gray-500 mt-4">Contacto</h3>
                    <div className="flex items-center gap-2 mt-1 text-sm">
                        <Icon icon={'material-symbols:mail'} />
                        <span className="m-0">{userProfile?.email}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-sm">
                        <Icon icon={'gridicons:phone'} />
                        <span className="m-0">{userProfile?.cell_phone}</span>
                    </div>
                    <h3 className="text-gray-500 mt-4">Estado</h3>
                    <div className="flex items-center gap-2 mt-1 text-sm">
                        {userProfile?.email_verified && <Icon icon={'lets-icons:check-fill'} className="text-green-500 text-lg" />}
                        <i className="m-0">{userProfile?.email_verified ? 'Email verificado' : 'Email no verificado'}</i>
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-sm">
                        {/* <Icon icon={'lets-icons:check-fill'} className="text-green-500 text-lg"/> */}
                        <span className="m-0">Auditoría: <i>{userProfile?.auth_user_audits_status_description}</i></span>
                    </div>
                    <div>
                        {
                            !userProfile?.email_verified && <button className="text-blue-600 mt-4 hover:text-blue-400" onClick={handleEmailVerification}>Verificar cuenta</button>
                        }

                    </div>
                </div>
                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 col-span-2">
                    <h3 className="text-2xl font-medium">Información General</h3>
                    <h3 className="text-xl mt-4">Sobre Mi</h3>
                    <p className="mt-1 text-gray-500 text-sm">{userProfile?.description || 'Agrega una descripción sobre ti.'}</p>
                    <hr className="mt-4" />
                    <div className="grid grid-cols-1 xl:grid-cols-2">
                        <div>
                            <h3 className="text-gray-500 mt-4">Alta</h3>
                            <div className="flex items-center gap-2 mt-1 text-sm">
                                <span className="m-0">{`${joinDate}`}</span>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-gray-500 mt-4">Segundo Teléfono</h3>
                            <div className="flex items-center gap-2 mt-1 text-sm">
                                <span className="m-0">{userProfile?.cell_phone_secondary ?? '-'}</span>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-gray-500 mt-4">DNI</h3>
                            <div className="flex items-center gap-2 mt-1 text-sm">
                                <span className="m-0">{userProfile?.dni}</span>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-gray-500 mt-4">Dirección</h3>
                            <div className="flex items-center gap-2 mt-1 text-sm">
                                <span className="m-0">{userProfile?.address}</span>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-gray-500 mt-4">Edad</h3>
                            <div className="flex items-center gap-2 mt-1 text-sm">
                                <span className="m-0">{userProfile?.age}</span>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-gray-500 mt-4">Autenticación en 2 Factores:</h3>
                            <div className="flex items-center gap-2 mt-1 text-sm">
                                {
                                    userProfile?.two_factor_enabled
                                        ? 'Activado'
                                        : 'Desactivado'
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}