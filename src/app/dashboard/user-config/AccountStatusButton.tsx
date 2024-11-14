'use client'

import { useAppDispatch } from "@/store";
import { uiModal } from "@/store/slices/uiSlice";
import { Icon } from "@iconify/react/dist/iconify.js";

export const AccountStatusButton = ({ userProfileStatus }: { userProfileStatus: string }) => {

    const dispatch = useAppDispatch()
    const handleVerifyAccount = () => {
        dispatch(uiModal({
            modalFor: 'verify_account',
            modalOpen: true,
            modalTitle: 'Verificación de Cuenta'
        }))
    }

    return (
        <>
            {
                (userProfileStatus === 'aprobado')
                    ?
                    <div className="w-full h-full flex justify-center">
                        <button
                            className={`flex items-center justify-center text-cyan-600 h-full  rounded-md px-4 py-2 transition-all w-full sm:w-auto disabled:bg-white disabled:text-gray-600`}
                            onClick={handleVerifyAccount}
                        >
                            <Icon icon={'bitcoin-icons:verify-outline'} className={`text-5xl`} />
                            <span className="uppercase">Cuenta Verificada</span>
                        </button>
                    </div>
                    :
                    (userProfileStatus === 'pendiente' || userProfileStatus === 'cancelado')
                        ?
                        <div className="w-full h-full overflow-hidden rounded-md">
                            <div className="bg-yellow-100 border-l-4 h-full border-yellow-500 p-4 flex items-center">
                                <button
                                    className={`flex items-center justify-center rounded-md px-4 py-2 transition-all w-full sm:w-auto g-2  text-yellow-700`}
                                    onClick={handleVerifyAccount}
                                >
                                    <Icon icon={'bitcoin-icons:verify-outline'} className={`text-5xl`} />
                                    <span className="uppercase">Verificar Cuenta</span>
                                </button>
                            </div>
                        </div>
                        :
                        (userProfileStatus === 'en proceso')
                            ?
                            <div className="w-full h-full overflow-hidden rounded-md">
                                <div className="bg-gray-100 border-l-4 h-full border-gray-500 p-4 flex items-center">
                                    <button

                                        className={`flex items-center justify-center rounded-md px-4 py-2 transition-all w-full sm:w-auto g-2  text-gray-600`}
                                        onClick={handleVerifyAccount}
                                    >
                                        <Icon icon={'bitcoin-icons:verify-outline'} className={`text-5xl`} />
                                        <span className="uppercase text-nowrap">Verificación en proceso...</span>
                                    </button>
                                </div>
                            </div>
                            :
                            <div className="w-full h-full overflow-hidden rounded-md">
                                <div className="bg-red-100 border-l-4 h-full border-red-500 p-4 flex items-center">
                                    <button
                                        className={`flex items-center justify-center text-red-600 h-full  self-end rounded-md px-4 py-2 transition-all w-full sm:w-auto mt-3 g-2 disabled:bg-white disabled:text-gray-600`}
                                        onClick={handleVerifyAccount}
                                    >
                                        <Icon icon={'material-symbols-light:cancel-outline'} className={`text-4xl`} />
                                        <span className="uppercase">Cuenta rechadaza</span>
                                    </button>
                                </div>
                            </div>
            }
        </>
    );
};
