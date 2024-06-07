'use client'

import { useForm } from "@/hooks/useForm";
// import DecryptedSession from "@/helpers/Permissions";
import { useAppDispatch, useAppSelector } from "@/store";
import { getUserProfile, sendMailVerification } from "@/store/authSlice";
import { ImageProfile } from "@/types";
// import { uiModal } from "@/store/uiSlice";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import { useEffect, useState } from "react";

const alternativeImage = "https://demo.themesberg.com/windster/images/users/bonnie-green.png"

export default function UserConfigPage() {

    const dispatch = useAppDispatch()
    const { userProfile } = useAppSelector(state => state.auth)
    const [imageProfile, setImageProfile] = useState<ImageProfile>()
    const [passVisible, setPassVisible] = useState(false);
    const [twoFactorChange, setTwoFactorChange] = useState(true);
    const [emailChange, setEmailChange] = useState(true);
    

    useEffect(() => {
        setImageProfile({ ...userProfile?.image_profiles.filter(e => e.default)[0] } as ImageProfile)
    }, [userProfile])

    // const { loading } = useAppSelector(state => state.ui)
    useEffect(() => {
        dispatch(getUserProfile())
    }, [])

    // const session = new DecryptedSession();
    // const userConfigId = session.getPermissionsId()['user-config']
    // const permissionsUserConfig = session.getModuleById(userConfigId)

    // const handleEmailVerification = () => {
    //     dispatch(uiModal({ modalFor: 'new_user', modalOpen: true }))
    //     dispatch(sendMailVerification())
    // }

    const [values, handleInputChange, reset] = useForm({
        passwordOld: '',
        passwordNew: '',
        passwordNew2: ''
    })

    const changePassword = () => {
        
    }

    return (
        <div className="pt-6 px-4">
            <h3 className="text-2xl font-medium mb-5">Perfil de Usuario</h3>
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
                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 flex flex-col gap-4">
                    <div className="flex gap-3 items-center">
                        <h3 className="text-2xl font-semibold">Cambio de Contraseña</h3>
                        <Icon 
                            icon={ passVisible ? 'streamline:visible-solid' :'streamline:invisible-2-solid'} 
                            className={`h-7 w-7 text-gray-600 hover:cursor-pointer ${passVisible && 'text-green-600'} `}
                            onClick={() => setPassVisible(!passVisible)}
                        />
                    </div>
                    <hr className="" />
                    <div className="flex gap-4 flex-col sm:flex-row">
                        <div className=" sm:basis-1/2 xl:basis-1/3 flex flex-col gap-6 ">
                            <div>
                                <label htmlFor="passwordOld" className="text-sm font-medium text-gray-900 block mb-2">Contraseña Actual</label>
                                <div className="flex items-center">
                                    <input
                                        value={values.passwordOld}
                                        onChange={handleInputChange}
                                        type={passVisible? 'text' : "password"}
                                        name="passwordOld"
                                        id="passwordOld"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                        placeholder="*********"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="passwordNew" className="text-sm font-medium text-gray-900 block mb-2">Nueva Contraseña</label>
                                <div className="flex items-center">
                                    <input
                                        value={values.passwordNew}
                                        onChange={handleInputChange}
                                        type={passVisible? 'text' : "password"}
                                        name="passwordNew"
                                        id="passwordNew"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                        placeholder="*********"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="passwordNew2" className="text-sm font-medium text-gray-900 block mb-2">Introduce Nuevamente tu Contraseña</label>
                                <div className="flex items-center">
                                    <input
                                        value={values.passwordNew2}
                                        onChange={handleInputChange}
                                        type={passVisible? 'text' : "password"}
                                        name="passwordNew2"
                                        id="passwordNew2"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                        placeholder="*********"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col sm:basis-1/2 ">
                            <strong>Características de la Contraseña:</strong>
                            <span className="text-sm text-gray-500">Asegurate de los siguientes puntos:</span>
                            <span className="text-sm text-gray-500">*Item 1</span>
                            <span className="text-sm text-gray-500">*Item 1</span>
                            <span className="text-sm text-gray-500">*Item 1</span>
                        </div>
                    </div>
                    <button
                        className="bg-cyan-600 text-white rounded-md px-4 py-2 mt-1 hover:bg-cyan-500 transition-all sm:w-28"
                    >
                        Cambiar
                    </button>
                </div>

                {/* INFORMACIÓN GENERAL */}
                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                    <h3 className="text-2xl font-semibold">Información General</h3>
                    {/* <h3 className="text-xl mt-4">Sobre Mi</h3>
                    <p className="mt-1 text-gray-500 text-sm">{userProfile?.description || 'Agrega una descripción sobre ti.'}</p> */}
                    <hr className="mt-4" />
                    <div className="flex flex-col mt-4 gap-4">
                        <div className="mt-4 flex flex-col sm:flex-row items-center gap-2">
                            <select name="two_factor_enabled" id="two_factor_enabled" disabled={twoFactorChange} className={`bg-gray-50 border md:basis-1/2 xl:basis-1/3 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 `}>
                                <option value={''}>Autenticación en dos factores</option>
                                <option value="true">Si</option>
                                <option value="false">No</option>
                            </select>
                            <button
                                className="bg-cyan-600  text-white rounded-md px-4 py-2 hover:bg-cyan-500 transition-all w-full sm:w-auto"
                                onClick={() => setTwoFactorChange(!twoFactorChange)}
                            >
                                Cambiar
                            </button>
                        </div>
                        <div className="mt-4 flex flex-col sm:flex-row items-center gap-2">
                            <div className="w-full md:basis-1/2 xl:basis-1/3">
                                <label htmlFor="email" className="text-sm font-medium text-gray-900 block mb-2">Email: <i>{userProfile?.email}</i></label>
                                <input 
                                    disabled={emailChange}
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                    placeholder="Nuevo Email"
                                />
                            </div>
                            <button
                                className="bg-cyan-600 self-end text-white rounded-md px-4 py-2 hover:bg-cyan-500 transition-all w-full sm:w-auto"
                                onClick={() => setEmailChange(!emailChange)}
                            >
                                Cambiar
                            </button>
                        </div>
                        <div className="mt-4 flex items-center">
                            <button
                                className="bg-cyan-600 self-end text-white rounded-md px-4 py-2 mt-1 hover:bg-cyan-500 transition-all"
                            >
                                Validar Email
                            </button>
                        </div>
                    </div>
                </div>
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