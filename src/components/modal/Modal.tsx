'use client'

import { useAppDispatch, useAppSelector } from "@/store"
import { NewProduct } from "./contentModal/NewProduct"
import { NewUser } from "./contentModal/NewUser"
import { uiCloseModal, uiSetLoading } from "@/store/slices/uiSlice"
import { MessageModal } from "./contentModal/MessageModal"
import { TwoFactorCode } from './contentModal/TwoFactorCode';
import { ModalHeader } from './ModalHeader';
import { usePathname, useRouter } from "next/navigation"
import { ImageProfileModal } from "./contentModal/ImageProfile"
import { Spinner } from "../spinner/Spinner"
import { ValidateNewEmail } from "./contentModal/ValidateNewEmail"
import { VerifyAccount } from "./contentModal/verifyAccount/VerifyAccount"
import { AuditDocument } from "./contentModal/AuditDocument"
import { AuditModal } from "./contentModal/AuditModal"
import { CategoryModal } from "./contentModal/category/CategoryModal"
import { SubcategoryInfo } from "./contentModal/category/SubcategoryInfo"
import { deleteImagesFromS3 } from "@/store/slices/productSlice"
import { cleanSelectCategories } from "@/store/slices/categorySlice"
import { NewAuction } from "./contentModal/auction/NewAuction"
import { Offers } from "./contentModal/offers/Offers"
import { EditAuction } from "./contentModal/auction/EditAuction"
import { clearOffers } from "@/store/slices/offersSlice"
import { OfferForm } from "./contentModal/offers/OfferForm"


export const Modal = () => {

    const dispatch = useAppDispatch()
    const { imagesNewProduct } = useAppSelector(state => state.product)
    const { loading } = useAppSelector(state => state.ui)
    const { modal: { modalOpen, modalFor, msg, typeMsg, modalTitle } } = useAppSelector(state => state.ui)
    const path = usePathname()
    const router = useRouter()



    const handleCloseModal = () => {
    
        dispatch(uiCloseModal())
        dispatch(uiSetLoading(false))

        if (modalFor === 'new_product') {
            if (imagesNewProduct.length > 0) {
                dispatch(deleteImagesFromS3())
            }
            dispatch(cleanSelectCategories())
        }
        if (modalFor === '2F_code' && typeof window !== 'undefined') sessionStorage.clear();
        if (modalFor === 'validate_code' && path.includes('register')) router.push('./login');
        if (modalFor === 'offers') dispatch(clearOffers())
    }


    if (modalFor === 'message' && typeMsg === 'success') {
        setTimeout(() => {
            dispatch(uiCloseModal())
            dispatch(uiSetLoading(false))
        }, 2000)
    }



    if (!modalOpen) return
    if (modalFor === 'audit_document') return <AuditDocument close={handleCloseModal} />
    return (
        <div className="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true" >
            <div aria-hidden="true" className="fixed inset-0 z-10 bg-gray-500 bg-opacity-75 transition-opacity" >
            </div>
            <div className="fixed inset-0 w-screen z-10 overflow-y-auto min-w-80">
                <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0 min-w-80">
                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg min-w-80">

                        <ModalHeader close={handleCloseModal} />

                        {
                            loading ? <div className="h-40 w-full"> <Spinner /> </div>
                                : <>
                                    {
                                        modalFor === 'loading' && <div className="h-40 w-full"> <Spinner /> </div>
                                    }
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
                                        modalFor === 'audit_user' && <AuditModal />
                                    }
                                    {
                                        modalFor === 'category' && <CategoryModal />
                                    }
                                    {
                                        modalFor === 'categoryInfo' && <SubcategoryInfo />
                                    }
                                    {
                                        modalFor === 'audit_product' && <AuditModal />
                                    }
                                    {
                                        modalFor === 'new_auction' && <NewAuction />
                                    }
                                    {
                                        modalFor === 'edit_auction' && <EditAuction />
                                    }
                                    {
                                        modalFor === 'offers' && <Offers />
                                    }
                                    {
                                        modalFor === 'new_offer' && <OfferForm />
                                    }

                                </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
