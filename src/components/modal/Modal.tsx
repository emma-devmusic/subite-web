'use client'
import { useAppDispatch, useAppSelector } from "@/store"
import { NewProduct } from "./contentModal/NewProduct"
import { NewUser } from "./contentModal/NewUser"
import { uiCloseModal, uiSetLoading } from "@/store/uiSlice"
import { Message } from "./contentModal/Message"
import { MessageModal } from "./contentModal/MessageModal"
import { TwoFactorCode } from './contentModal/TwoFactorCode';
import { ModalHeader } from './ModalHeader';
import { usePathname, useRouter } from "next/navigation"
import { ImageProfile } from "./contentModal/ImageProfile"


export const Modal = () => {
    const dispatch = useAppDispatch()
    const path = usePathname()
    const router = useRouter()

    const { modal: { modalOpen, modalFor, msg, typeMsg } } = useAppSelector(state => state.ui)
    if (!modalOpen) return

    const handleCloseModal = () => {
        dispatch( uiCloseModal() )
        dispatch( uiSetLoading(false) )
        if(modalFor === '2F_code') {
            sessionStorage.clear();
        }
        if(modalFor === 'new_user' && path.includes('register')) {
            router.push('./login');
        }
    }

    if(modalFor === 'message') {
        setTimeout( () => {
            dispatch( uiCloseModal() )
            dispatch( uiSetLoading(false) )
        }, 2000)
    }
 
    return (
        <div className="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true" >
            <div className="fixed inset-0 z-10 bg-gray-500 bg-opacity-75 transition-opacity" >
            </div>
            <div className="fixed inset-0 w-screen z-10 overflow-y-auto ">
                <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">

                        <ModalHeader close={handleCloseModal} />

                        {
                            modalFor === 'message' && <MessageModal />
                        }
                        {
                            modalFor === 'new_product' && <NewProduct />
                        }
                        {
                            modalFor === 'new_user' && <NewUser />
                        }
                        {
                            modalFor === '2F_code' && <TwoFactorCode />
                        }
                        {
                            modalFor === 'edit_image_profile' && <ImageProfile />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
