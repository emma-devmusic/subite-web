'use client'
import { useAppDispatch, useAppSelector } from "@/store"
import { NewProduct } from "./contentModal/NewProduct"
import { NewUser } from "./contentModal/NewUser"
import { uiCloseModal } from "@/store/uiSlice"


export const Modal = () => {
    const dispatch = useAppDispatch()

    const { modal: { modalOpen, modalFor } } = useAppSelector(state => state.ui)
    if (!modalOpen) return

    return (
        <div className="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true" >
            <div className="fixed inset-0 z-10 bg-gray-500 bg-opacity-75 transition-opacity" >
            </div>
            <div className="fixed inset-0 w-screen z-10 overflow-y-auto ">
                <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <button 
                            className='p-3 pt-6 pr-6 cursor-pointer absolute right-0'
                            onClick={() => dispatch( uiCloseModal() )}
                        >
                            X
                        </button>
                        {
                            modalFor === 'new_product' && <NewProduct />
                        }
                        {
                            modalFor === 'new_user' && <NewUser />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
