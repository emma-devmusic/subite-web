import { useAppSelector } from "@/store";
import { CheckCircleIcon, ExclamationTriangleIcon, InformationCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { ReactElement } from "react";
import { Spinner } from "../spinner/Spinner";

interface Props {
    close: () => void;
}

export const ModalHeader = ({ close }: Props) => {
    const { modal: { modalOpen, modalFor, msg, typeMsg, modalTitle } } = useAppSelector(state => state.ui)

    const title: any = {
        '2F_code': 'Autenticación en 2 Factores',
        '2F_code_change': 'Actualización de Autenticación en 2 Factores',
        loading: 'Cargando...',
        message: typeMsg,
        new_auction: 'Nueva Subasta',
        new_product: 'Nuevo Producto',
        new_user: 'Código de Verificación',
        edit_image_profile: 'Imagen del Perfil',
        validate_new_email: 'Validar Nuevo Email',
        validate_code: 'Código de Validación'
    }


    return (
        <div className=''>
            <div className='flex justify-between items-center p-2 px-4'>
                <div className='text-lg font-medium'>
                    {
                        !typeMsg && title[ modalFor || 'loading' ] || modalTitle
                    }
                    {
                        typeMsg === 'success' && <CheckCircleIcon className=" h-8 w-8 text-green-400" />
                    }
                    {
                        typeMsg === 'info' && <InformationCircleIcon className=" h-8 w-8 text-blue-400" />
                    }
                    {
                        typeMsg === 'warning' && <ExclamationTriangleIcon className=" h-8 w-8 text-yellow-400" />
                    }
                    {
                        typeMsg === 'error' && <XCircleIcon className=" h-8 w-8 text-red-400" />
                    }
                    {
                        typeMsg === 'spinner' && <Spinner />
                    }
                </div>
                <div
                    className='p-3 cursor-pointer text-sm'
                    onClick={close}
                >
                    X
                </div>
            </div>
            <hr />
        </div>
    )
}