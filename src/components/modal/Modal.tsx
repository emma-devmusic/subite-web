'use client'
import { useAppDispatch, useAppSelector } from "@/store"
import { NewProduct } from "./contentModal/NewProduct"
import { NewUser } from "./contentModal/NewUser"
import { uiCloseModal, uiSetLoading } from "@/store/uiSlice"
import { MessageModal } from "./contentModal/MessageModal"
import { TwoFactorCode } from './contentModal/TwoFactorCode';
import { ModalHeader } from './ModalHeader';
import { usePathname, useRouter } from "next/navigation"
import { ImageProfileModal } from "./contentModal/ImageProfile"
import { Spinner } from "../spinner/Spinner"
import { ValidateNewEmail } from "./contentModal/ValidateNewEmail"
import { VerifyAccount } from "./contentModal/verifyAccount/VerifyAccount"
import { AuditDocument } from "./contentModal/AuditDocument"


export const Modal = () => {
    const dispatch = useAppDispatch()
    const { loading } = useAppSelector(state => state.ui)
    const path = usePathname()
    const router = useRouter()

    const { modal: { modalOpen, modalFor, msg, typeMsg } } = useAppSelector(state => state.ui)
    if (!modalOpen) return

    const handleCloseModal = () => {
        dispatch(uiCloseModal())
        dispatch(uiSetLoading(false))
        if (modalFor === '2F_code') {
            sessionStorage.clear();
        }
        if (modalFor === 'validate_code' && path.includes('register')) {
            router.push('./login');
        }
    }

    if (modalFor === 'message' && typeMsg === 'success') {
        setTimeout(() => {
            dispatch(uiCloseModal())
            dispatch(uiSetLoading(false))
        }, 2000)
    }

    if(modalFor === 'audit_document') return <AuditDocument close={handleCloseModal} />

    return (
        <div className="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true" >
            <div className="fixed inset-0 z-10 bg-gray-500 bg-opacity-75 transition-opacity" >
            </div>
            <div className="fixed inset-0 w-screen z-10 overflow-y-auto ">
                <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">

                        <ModalHeader close={handleCloseModal} />

                        {
                            loading ? <div className="h-80"> <Spinner /> </div>
                                : <>
                                    {
                                        modalFor === 'message' && <MessageModal />
                                    }
                                    {
                                        modalFor === 'new_product' && <NewProduct />
                                    }
                                    {
                                        modalFor === 'validate_code' && <NewUser />
                                    }
                                    {
                                        modalFor === 'validate_new_email' && <ValidateNewEmail />
                                    }
                                    {
                                        modalFor === '2F_code' && <TwoFactorCode />
                                    }
                                    {
                                        modalFor === '2F_code_change' && <TwoFactorCode />
                                    }
                                    {
                                        modalFor === 'edit_image_profile' && <ImageProfileModal />
                                    }
                                    {
                                        modalFor === 'verify_account' && <VerifyAccount />
                                    }
                                    {
                                        // modalFor === 'audit_document' && <AuditDocument />
                                    }
                                </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
