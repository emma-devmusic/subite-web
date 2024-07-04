'use client'

import { useForm } from "@/hooks/useForm";
import { useAppDispatch, useAppSelector } from "@/store";
import { delete_account, getUserProfile, sendMailVerification } from "@/store/authSlice";
import { ImageProfile } from "@/types";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FormPass } from "./formPass/FormPass";
import { FormGeneral } from "./formGeneral/FormGeneral";
import { Spinner } from "@/components/spinner/Spinner";
import Swal from "sweetalert2";
import DecryptedSession from "@/helpers/Permissions";
import { useRouter } from "next/navigation";
import { uiModal } from '@/store/uiSlice';

const alternativeImage = "https://demo.themesberg.com/windster/images/users/bonnie-green.png"

export default function UserConfigPage() {

    const dispatch = useAppDispatch()
    const { userProfile, isLogged } = useAppSelector(state => state.auth)
    const [imageProfile, setImageProfile] = useState<ImageProfile>()
    const { loading } = useAppSelector(state => state.ui)
    const router = useRouter()


    useEffect(() => {
        setImageProfile({ ...userProfile?.image_profiles.filter(e => e.default)[0] } as ImageProfile)
    }, [userProfile])

    useEffect(() => {
        if (!userProfile && isLogged) dispatch(getUserProfile())
    }, [])

    // const session = new DecryptedSession();
    // const userConfigId = session.getPermissionsId()['manage-users']
    // const permissionsUserConfig = session.getModuleById(userConfigId)
    // console.log(permissionsUserConfig)

    const handleAccountDelete = () => {
        Swal.fire({
            title: "Eliminar Cuenta",
            text: "¿Estás seguro/a que deseas eliminar la cuenta?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Si, Borrar Cuenta",
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(delete_account())
            }
        });
    }

    const handleVerifyAccount = () => {
        dispatch(uiModal({
            modalFor: 'verify_account',
            modalOpen: true,
            modalTitle: 'Verificar Cuenta'
        }))
    }

    if (loading || !userProfile) return <Spinner />

    return (
        <div className="pt-6 px-4">
            <h3 className="text-2xl font-medium mb-5">Configuración de Usuario</h3>
            <div className="w-full flex flex-col gap-4">

                {/* PERFIL */}
                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 flex gap-2 items-center justify-between flex-wrap">
                    <div className="flex gap-2 items-center">
                        <div
                            className="inline-flex text-gray-400 hover:text-gray-600 hover:cursor-pointer transition-all"
                        >
                            <Image width={400} height={400} className="h-28 w-28 rounded-lg object-cover" src={imageProfile?.image_url || alternativeImage} alt="Neil image" />
                        </div>
                        <div className="">
                            <h3 className="text-xl font-medium md:text-2xl md:font-semibold">{`${userProfile?.name} ${userProfile?.last_name}`}</h3>
                            <div className="flex items-center gap-2 mt-1 text-sm">
                                <Icon icon={'material-symbols:mail'} />
                                <span className="m-0">{userProfile?.email}</span>
                            </div>
                            <button onClick={() => router.push('/dashboard/user-profile')} className="bg-cyan-600 border-[1px] border-cyan-600  text-white self-end rounded-md px-4 py-2 hover:bg-cyan-500 transition-all w-full sm:w-auto mt-3">
                                Ir al Perfil
                            </button>
                        </div>
                    </div>
                    <div className="h-full w-full sm:w-auto ">
                        {
                            !userProfile.account_verified &&
                            <button
                                disabled={userProfile.auth_user_audits_status_description === 'en proceso'}
                                className={`flex items-center justify-center ${userProfile.account_verified ? 'text-cyan-600 ' : 'bg-yellow-500 text-white hover:bg-yellow-400'}  h-full  self-end rounded-md px-4 py-2 transition-all w-full sm:w-auto mt-3 g-2 disabled:bg-white disabled:text-gray-600`}
                                onClick={handleVerifyAccount}
                            >
                                <Icon icon={'bitcoin-icons:verify-outline'} className={` ${userProfile.account_verified ? 'text-5xl' : 'text-3xl'}`} />
                                <span className="uppercase">
                                    {
                                        userProfile.account_verified
                                            ? 'Cuenta Verificada'
                                            : userProfile.auth_user_audits_status_description === 'en proceso'
                                                ? 'Verificación en proceso...'
                                                : 'Verificar Cuenta'
                                    }
                                </span>
                            </button>
                        }
                    </div>
                </div>

                {/* CAMBIO DE CONTRASEÑA */}
                <FormPass />

                {/* INFORMACIÓN GENERAL */}
                <FormGeneral userProfile={userProfile} />

                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                    <button
                        className="bg-white border-[1px] border-red-600 text-red-600 rounded-md px-4 py-2 hover:bg-red-600 hover:text-white transition-all"
                        onClick={handleAccountDelete}
                    >
                        Eliminar Cuenta
                    </button>
                </div>
            </div>
        </div>
    );
}