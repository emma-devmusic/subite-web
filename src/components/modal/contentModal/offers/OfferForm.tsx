'use client'

import { useAppDispatch, useAppSelector } from "@/store";
import { createOffer } from "@/store/slices/offersSlice";
import { useState } from "react";
import dayjs from "dayjs";
import { useAppForm } from "@/hooks/useAppForm";
import { Spinner } from "@/components/spinner/Spinner";
import PrelineScript from "@/components/prelineScript/PrelineScript";
import { uiModal } from "@/store/slices/uiSlice";

export const OfferForm = () => {

    const dispatch = useAppDispatch()
    const { isAdmin } = useAppSelector(state => state.manageUser)
    const { loading } = useAppSelector(state => state.ui)
    const { auctionSelected } = useAppSelector(state => state.auction)
    const { productSelected } = useAppSelector(state => state.product)
    const { usersSelected } = useAppSelector(state => state.manageUser)
    const [formActive, setFormActive] = useState(true)
    const [price, setPrice] = useState(auctionSelected.bid_amount);  // Estado para el valor de la oferta
    const [error, setError] = useState("");  // Estado para el mensaje de error
    const [values, handleInputChange, reset] = useAppForm({
        full_name: '',
        phone: '',
        address: ''
    })
    // Función para manejar el cambio de entrada
    const handlePriceChange = (e: any) => {
        const newPrice = e.target.value;
        setPrice(newPrice);
        // Validar si el valor es múltiplo del monto mínimo de puja
        if (newPrice % auctionSelected.bid_amount !== 0) {
            setError(`El monto debe ser múltiplo de $${auctionSelected.bid_amount}`);
        } else {
            setError("");  // Si es válido, no mostrar error
        }
    };

    const handleNewOffer = (e: any) => {
        e.preventDefault()
        if (error) return;  // Si hay un error, no realizar la oferta

        if (!isAdmin) {
            dispatch(createOffer({
                amount: parseInt(`${price}`),
                offer_date: dayjs().format('YYYY-MM-DDTHH:mm:ss') + 'Z',
                product_auction_id: auctionSelected.id,
                user_data_contact_checked: formActive,
                ...!formActive && values,
            }))
        }
        setError("");  // Limpiar el error
        setPrice(0);  // Limpiar el valor de la oferta
    }



    if (auctionSelected.id) return (
        <div>
            <div >
                <div className="p-4 overflow-y-auto">
                    <div className='w-100 my-4'>
                        <label htmlFor="price" className='mb-1 block text-sm font-medium leading-6 text-gray-800'>Tu oferta:</label>
                        <input
                            required
                            placeholder='2300'
                            name='price'
                            type="number"
                            min={auctionSelected.bid_amount}
                            step={auctionSelected.bid_amount}
                            className='block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 text-sm sm:leading-6 bg-gray-50 '
                            value={price}
                            onChange={handlePriceChange}
                        />
                        <span className="text-xs">Puja mínima <span className="text-primaryHover">($){auctionSelected.bid_amount}</span></span>
                    </div>
                    <div className='w-100 my-4'>
                        <div className="bg-slate-100 p-4 border-l-2 border-gray-400 flex gap-2">
                            <p className="text-xs text-gray-600">Utilizar mi información del sistema para que me contacten.</p>
                            <input
                                name='request_audit'
                                onChange={(e: any) => setFormActive(e.target.checked)}
                                checked={formActive}
                                type="checkbox"
                                className='accent-cyan-600 hover:cursor-pointer'
                            />
                        </div>
                    </div>
                    {
                        !formActive &&
                        <div>
                            <div className="mt-4 flex flex-col gap-3">
                                <input
                                    value={values.full_name}
                                    onChange={handleInputChange}
                                    type="text" name="full_name" id="full_name"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block p-2.5"
                                    placeholder="Ingresa tu nombre completo"
                                    required
                                />
                                <input
                                    value={values.phone}
                                    onChange={handleInputChange}
                                    type="text" name="phone" id="phone"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block p-2.5"
                                    placeholder="Ingresa tu número de teléfono"
                                    required
                                />
                                <input
                                    value={values.address}
                                    onChange={handleInputChange}
                                    type="text" name="address" id="address"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block p-2.5"
                                    placeholder="Ingresa tu dirección"
                                    required
                                />
                            </div>
                        </div>
                    }
                </div>
                <div className="flex justify-between items-center gap-x-2 py-3 px-4 border-t">
                    <button
                        type="button"
                        className="rounded text-white py-1 px-4 border-[1px] border-gray-500 bg-gray-500  hover:border-gray-500 hover:bg-white hover:text-gray-500 transition-all "
                        onClick={() => dispatch(uiModal({
                            modalFor: 'offers',
                            modalOpen: true,
                            modalTitle: `Ofertas del producto: ${productSelected.name}`
                        }))}
                    >
                        Atrás
                    </button>
                    <button
                        type="button"
                        className="rounded text-white py-1 px-4 border-[1px] border-green-600 bg-green-600  hover:border-green-600 hover:bg-white hover:text-green-600 transition-all "
                        onClick={handleNewOffer}
                    >
                        Ofertar
                    </button>
                </div>
            </div>
        </div>
    );
};
