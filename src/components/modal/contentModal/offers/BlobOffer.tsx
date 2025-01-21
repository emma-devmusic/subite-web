'use client'
import PrelineScript from "@/components/prelineScript/PrelineScript";
import { useAppDispatch, useAppSelector } from "@/store";
import { deleteOffer } from "@/store/slices/offersSlice";
import { uiCloseModal } from "@/store/slices/uiSlice";
import { ItemGetOffersResponse } from "@/types/offersResponse";
import { Icon } from "@iconify/react/dist/iconify.js";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

// {
//     "data_deleted": null,
//     "id": 5,
//     "init_date": "2024-09-20",
//     "end_date": "2024-09-25",
//     "publication_date": "2024-09-10",
//     "last_offers": {
//         "total_offers": 1,
//         "last_results": [
//             {
//                 "id": 26,
//                 "offer_date": "2024-09-19",
//                 "amount": 517.76,
//                 "user_data_contact_checked": true,
//                 "full_name": "John Doe",
//                 "address": "123 Main St",
//                 "phone": "1234567890",
//                 "product_auctions": {
//                     "id": 5
//                 },
//                 "auth_user": {
//                     "id": 26
//                 }
//             }
//         ]
//     }
// }


export const BlobOffer = ({ offer }: { offer: ItemGetOffersResponse }) => {

    const router = useRouter()
    const { isAdmin } = useAppSelector(state => state.manageUser)
    const dispatch = useAppDispatch()

    const handleSeeUser = () => {
        router.push(`/dashboard/users/${offer.auth_user?.id}`)
        dispatch(uiCloseModal())
    }

    const handleOfferDelete = (e:any) => {
        e.preventDefault();
        Swal.fire({
            title: "Eliminar Oferta",
            text: "¿Estás seguro/a que deseas eliminar esta oferta? Esta acción no puede deshacerse.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Si, Borrar Oferta",
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteOffer(offer.id))
            }
        });
    }

    return (
        <>
            <div className="hs-tooltip [--trigger:click] sm:[--placement:bottom] inline-block ">
                <div className="hs-tooltip-toggle p-3 flex items-center gap-x-3 bg-white border border-gray-200 rounded-xl shadow-sm hover:bg-slate-100 hover:cursor-pointer">
                    <div className="flex justify-between items-center w-full">
                        <div className="grow">
                            <h4 className="font-semibold text-sm text-gray-800 ">
                                ${offer.amount}
                            </h4>
                            <p className="text-xs text-gray-800 md:text-gray-500 dark:text-white md:dark:text-neutral-500">
                                {
                                    isAdmin
                                        ? `Ofertante: ${offer.full_name}`
                                        : `Hora de oferta: ${dayjs(offer.data_created).format('HH:mm:ss')}hs`
                                }
                            </p>
                        </div>
                        <div>
                            {
                                offer.id &&
                                <button
                                    className=" text-red-700 hover:text-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-1 py-1 text-center"
                                    onClick={handleOfferDelete}
                                >
                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                                </button>
                            }
                        </div>
                    </div>

                    {
                        isAdmin &&
                        <div className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible hidden opacity-0 transition-opacity absolute invisible z-10 max-w-xs w-full bg-white border border-gray-100 text-start rounded-xl shadow-md after:absolute after:top-0 after:-start-4 after:w-4 after:h-full " role="tooltip">
                            <div className="py-3 px-4 border-b border-gray-200 ">
                                <div className="flex items-center gap-x-3">
                                    {/* <img className="shrink-0 inline-block size-10 rounded-full ring-2 ring-white dark:ring-neutral-900" src="https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&&auto=format&fit=facearea&facepad=3&w=300&h=300&q=80" alt="Avatar"/> */}
                                    <div className="grow">
                                        <h4 className="font-semibold text-gray-800">
                                            {offer.full_name}
                                            {/* <span className="ms-0.5 inline-flex items-center align-middle gap-x-1.5 py-0.5 px-1.5 rounded-md text-[11px] font-medium bg-gray-800 text-white ">
                                                    PRO
                                                </span> */}
                                        </h4>
                                        <p className="text-sm text-gray-500 ">
                                            Ofertante
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <ul className="py-3 px-4 space-y-1">
                                <li>
                                    <div className="inline-flex items-center gap-x-3 text-sm text-gray-800">
                                        <Icon icon={'clarity:date-line'} className="text-gray-600" />
                                        {dayjs(offer.offer_date).format('DD/MM/YYYY-HH:mm:ss')}
                                    </div>
                                </li>
                                <li>
                                    <div className="inline-flex items-center gap-x-3 text-sm text-gray-800">
                                        <Icon icon={'streamline:subscription-cashflow'} className="text-gray-600" />
                                        {offer.amount}
                                    </div>
                                </li>

                                <li>
                                    <div className="inline-flex items-center gap-x-3 text-sm text-gray-800 ">
                                        <Icon icon={'bi:phone'} className="text-gray-600" />
                                        {offer.phone}
                                    </div>
                                </li>

                                {/* <li>
                                <div className="inline-flex items-center gap-x-3 text-sm text-gray-800 ">
                                    <Icon icon={'ic:outline-email'} className="text-gray-600" />
                                    correo@email.com
                                    
                                    </div>
                                    </li> */}
                            </ul>

                            <div className="py-2 px-4 flex justify-between items-center bg-gray-100 ">
                                <span className="text-gray-500">Cerrar</span>
                                <button
                                    type="button"
                                    className="py-1.5 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-md border border-transparent bg-primary text-white hover:bg-primaryHover focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                                    onClick={handleSeeUser}
                                >
                                    Ver <Icon icon={'mdi:user'} className="text-white text-lg" />
                                </button>
                            </div>

                        </div>
                    }
                </div>
            </div>
        </>
    );
};
