'use client'

import { Spinner } from "@/components/spinner/Spinner";
import { useAppDispatch, useAppSelector } from "@/store";
import { deleteUser, getUser } from "@/store/slices/manageUserSlice";
import { UserState } from "@/types";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import { useEffect } from "react";
import { AuditsImagesDocuments } from "./components/AuditsImagesDocuments";
import { uiModal } from "@/store/slices/uiSlice";
import Swal from "sweetalert2";
import { TableAutidStatusHistory } from "@/components/tables/TableAutidStatusHistory";

interface Props {
    params: { user_id: string };
}

const alternativeImage = "https://demo.themesberg.com/windster/images/users/bonnie-green.png"

export default function UserPage({ params }: Props) {

    const dispatch = useAppDispatch()
    const { usersSelected } = useAppSelector(state => state.manageUser) as UserState
    const { loading } = useAppSelector(state => state.ui)
    let joinDate = new Date(usersSelected?.user_date_created || '').toLocaleDateString()

    useEffect(() => {
        if (!usersSelected) dispatch(getUser(params.user_id))
    }, [])

    const handleAudit = () => {
        dispatch(
            uiModal({
                modalFor: 'audit_user',
                modalOpen: true,
                modalTitle: 'Auditoría'
            })
        )
    }

    const handleUserDelete = () => {
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
               if(usersSelected) dispatch(deleteUser(usersSelected.user_id))
            }
        });
    }

    if (loading || !usersSelected) return <Spinner />
    
    return (
        <div className="pt-6 px-4">
            <h2 className="text-2xl mb-6">Perfil del Usuario</h2>
            <div className="w-full grid grid-cols-1 xl:grid-cols-3 gap-4">
                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 col-span-3 sm:col-span-1 ">
                    <div
                        className="flex justify-center text-gray-400 hover:text-gray-600 hover:cursor-pointer transition-all "
                    >
                        <Image width={400} height={400} className={`h-28 w-28 rounded-3xl object-cover border-4 ${ (usersSelected.account_verified && usersSelected.audit_status_history[0].audit_status_description === 'aprobado') ? 'border-cyan-500' : 'border-yellow-500' }`} src={usersSelected?.default_image_profile[0]?.image_url ?? alternativeImage} alt="Neil image" />
                    </div>
                    <div className="flex justify-center items-center mt-4 ">
                        {
                            (usersSelected.account_verified && usersSelected.audit_status_history[0].audit_status_description === 'aprobado')
                                ? <Icon icon={'bitcoin-icons:verify-filled'} className="text-3xl text-cyan-500" />
                                : <Icon icon={'uis:exclamation-circle'} className="text-xl mr-1 text-yellow-500" />
                        }
                        <h3 className="text-2xl text-center font-semibold">{`${usersSelected?.user_name} ${usersSelected?.user_last_name}`}</h3>
                    </div>
                    <hr className="mt-4" />
                    <h3 className="text-gray-500 mt-4">Contacto</h3>
                    <div className="flex items-center gap-2 mt-1 text-sm">
                        <Icon icon={'material-symbols:mail'} />
                        <span className="m-0">{usersSelected?.user_email}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-sm">
                        <Icon icon={'gridicons:phone'} />
                        <span className="m-0">{usersSelected?.user_phone}</span>
                    </div>
                    <h3 className="text-gray-500 mt-4">Estado de cuenta</h3>
                    <div className="flex items-center gap-2 mt-1 text-sm">
                        {usersSelected?.email_verified && <Icon icon={'lets-icons:check-fill'} className="text-green-500 text-lg" />}
                        <i className="m-0">{usersSelected?.email_verified ? 'Email verificado' : 'Email no verificado'}</i>
                    </div>
                    <div className="flex items-center gap-2 text-sm">

                    </div>
                </div>
                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 col-span-3 sm:col-span-2">
                    <h3 className="text-2xl font-medium">Información General</h3>
                    <hr className="mt-4" />
                    <div className="grid grid-cols-1 xl:grid-cols-2">
                        <div>
                            <h3 className="text-gray-500 mt-4">Alta</h3>
                            <div className="flex items-center gap-2 mt-1 text-sm">
                                <span className="m-0">{`${joinDate}`}</span>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-gray-500 mt-4">DNI</h3>
                            <div className="flex items-center gap-2 mt-1 text-sm">
                                <span className="m-0">{usersSelected?.user_dni}</span>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-gray-500 mt-4">Dirección</h3>
                            <div className="flex items-center gap-2 mt-1 text-sm">
                                <span className="m-0">{usersSelected?.user_address}</span>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-gray-500 mt-4">Género</h3>
                            <div className="flex items-center gap-2 mt-1 text-sm">
                                <span className="m-0">{usersSelected?.user_gender}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 col-span-3">
                    <h3 className="text-2xl font-medium mb-4">Documentación Para Auditoría</h3>
                    {
                        usersSelected?.audit_images_documents.length === 0
                            ? 
                            <div><i className="inline-block border-2 border-gray-200 rounded-lg p-3 w-auto text-gray-400">*Aún no ha presentado documentación.</i></div>
                            : <AuditsImagesDocuments userId={usersSelected.user_id} imagesDocuments={usersSelected?.audit_images_documents ?? []} />
                    }
                    <button
                        className="bg-green-600 border-[1px] border-green-600  text-white self-end rounded-md px-4 py-2 hover:bg-green-500  transition-all w-full sm:w-auto mt-6"
                        onClick={handleAudit}
                    >
                        Verificación
                    </button>
                </div>
                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 col-span-3">
                    <h3 className="text-2xl font-medium mb-4">Historial de Auditoría</h3>
                    <TableAutidStatusHistory auditHistory={{user: usersSelected?.audit_status_history} ?? []} />
                </div>
                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 col-span-3">
                    <button
                        className="bg-white border-[1px] border-red-600 text-red-600 rounded-md px-4 py-2 hover:bg-red-600 hover:text-white transition-all"
                        onClick={handleUserDelete}
                    >
                        Eliminar Usuario
                    </button>
                </div>
            </div>
        </div>
    );
}