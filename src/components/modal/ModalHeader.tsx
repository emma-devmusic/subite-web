import { useAppSelector } from "@/store";
import { CheckCircleIcon, ExclamationTriangleIcon, InformationCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { ReactElement } from "react";
import { Spinner } from "../spinner/Spinner";

interface Props {
    close: () => void;
}

export const ModalHeader = ({ close }: Props) => {
    const { modal: { modalOpen, modalFor, msg, typeMsg } } = useAppSelector(state => state.ui)

    const title = {
        '2F_code': 'Autenticación en 2 Factores',
        loading: 'Cargando...',
        message: typeMsg,
        new_auction: 'Nueva Subasta',
        new_product: 'Nuevo Producto',
        new_user: 'Código de Verificación'
    }


    return (
        <div className=''>
            <div className='flex justify-between items-center p-2 px-4'>
                <div className='text-xl'>
                    {
                        !typeMsg && title[ modalFor || 'loading' ]
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
                    className='p-3 cursor-pointer'
                    onClick={close}
                >
                    X
                </div>
            </div>
            <hr />
        </div>
    )
}