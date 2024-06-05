'use client'

import DecryptedSession from "@/helpers/Permissions";
import { useAppDispatch, useAppSelector } from "@/store";
import { getUserProfile, sendMailVerification } from "@/store/authSlice";
import { uiModal } from "@/store/uiSlice";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import { useEffect } from "react";


export default function UserConfigPage() {

    const dispatch = useAppDispatch()
    const { userProfile } = useAppSelector(state => state.auth)
    const { loading } = useAppSelector(state => state.ui)
    useEffect(() => {
        dispatch(getUserProfile())
    }, [])

    const session = new DecryptedSession();
    const userConfigId = session.getPermissionsId()['user-config']
    const permissionsUserConfig = session.getModuleById(userConfigId)

    const handleEmailVerification = () => {
        dispatch(uiModal({ modalFor: 'new_user', modalOpen: true }))
        dispatch(sendMailVerification())
    }
    return (
        <div className="pt-6 px-4">
            <h3 className="text-2xl font-medium mb-5">Perfil de Usuario</h3>
            <div className="w-full grid grid-rows-3 grid-flow-col grid-cols-3 gap-4">
                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 flex gap-2 items-center row-span-1 col-span-1">
                    <div
                        className="inline-flex text-gray-400 hover:text-gray-600 hover:cursor-pointer transition-all"
                    >
                        <Image width={400} height={400} className="h-28 w-28 rounded-lg" src="https://demo.themesberg.com/windster/images/users/bonnie-green.png" alt="Neil image" />
                    </div>
                    <div className="">
                        <h3 className="text-2xl font-semibold">{`${userProfile?.name} ${userProfile?.last_name}`}</h3>
                        <div className="flex items-center gap-2 mt-1 text-sm">
                            <Icon icon={'material-symbols:mail'} />
                            <span className="m-0">{userProfile?.email}</span>
                        </div>
                        <button className="bg-cyan-500 text-white rounded-lg px-4 py-2 mt-3">
                            Ir al Perfil
                        </button>
                    </div>
                </div>
                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 flex flex-col gap-4 row-span-2 col-span-1">
                    <h3 className="text-2xl font-semibold">Cambio de Contraseña</h3>

                    <div>
                        <label htmlFor="email" className="text-sm font-medium text-gray-900 block mb-2">Contraseña Actual</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                            placeholder="name@company.com"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="text-sm font-medium text-gray-900 block mb-2">Nueva Contraseña</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                            placeholder="name@company.com"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="text-sm font-medium text-gray-900 block mb-2">Nueva Contraseña Nuevamente</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                            placeholder="name@company.com"
                        />
                    </div>
                </div>
                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 row-span-4 col-span-2">
                    <h3 className="text-2xl font-semibold">Información General</h3>
                    <h3 className="text-xl mt-4">Sobre Mi</h3>
                    <p className="mt-1 text-gray-500 text-sm">{userProfile?.description || 'Agrega una descripción sobre ti.'}</p>
                    <hr className="mt-4" />
                    <div className="grid grid-cols-1 xl:grid-cols-2 mt-4 gap-4">
                        <div>
                            <label htmlFor="email" className="text-sm font-medium text-gray-900 block mb-2">Nueva Contraseña Nuevamente</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                placeholder="name@company.com"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="text-sm font-medium text-gray-900 block mb-2">Nueva Contraseña Nuevamente</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                placeholder="name@company.com"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="text-sm font-medium text-gray-900 block mb-2">Nueva Contraseña Nuevamente</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                placeholder="name@company.com"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}