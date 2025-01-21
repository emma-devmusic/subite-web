import dayjs from 'dayjs';
import { useAppForm } from "@/hooks/useAppForm";
import { useAppDispatch, useAppSelector } from "@/store";
import { newAuction } from "@/store/slices/auctionSlice";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';

export const NewAuction = () => {

    const dispatch = useAppDispatch()
    const { productSelected } = useAppSelector(state => state.product)
    const [init_date, setInit_date] = useState(new Date())
    const [end_date, setEnd_date] = useState(dayjs(init_date).add(1, 'day').format('YYYY-MM-DD'))
    const [values, handleInputChange] = useAppForm({
        price: productSelected.product_variations[0].price ?? 0,
        bid_amount: 0
    })

    useEffect(() => {
        setEnd_date(dayjs(init_date).add(1, 'day').format('YYYY-MM-DD'))
    },[init_date])

    const handleNewAuction = () => {
        if(values.bid_amount < 100) {
            Swal.fire('Cuidado', 'El monto de puja debe ser mayor a $100', 'error')
            return
        }
        if (values.price === productSelected.product_variations[0].price) delete values.price
        dispatch(newAuction({
            user_id: productSelected.supplier_products && productSelected.supplier_products[0].supplier.auth_user.id,
            product_id: productSelected.id,
            product_variation_id: productSelected.product_variations[0].id,
            publication_date: new Date(),
            init_date,
            end_date,
            ...values
        }))
    }


    return (
        <form action="" >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div>
                    <h6 className="text-center mb-6">Subastar el producto <span className="text-primary">{productSelected.name}</span></h6>
                </div>
                <div className='bg-slate-100 p-4 border-l-2 border-gray-400'>
                    <p className='text-gray-600 text-xs'>Comienza con el proceso de subasta de este producto. Selecciona las fechas para el comienzo y coloca el precio final mínimo.</p>
                </div>
                <div className='w-100 my-4'>
                    <label htmlFor="nameProduct" className='mb-1 block text-sm font-medium leading-6 text-gray-800'>Fecha de inicio de subasta:</label>
                    <input
                        required
                        name='init_date'
                        onChange={(e:any) => setInit_date(e.target.value)}
                        value={dayjs(init_date).format('YYYY-MM-DD')}
                        min={dayjs(init_date).format('YYYY-MM-DD')}
                        type="date"
                        className='block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary text-sm sm:leading-6 bg-gray-50 '
                    />
                </div>
                <div className='w-100 my-4'>
                    <label htmlFor="description" className='mb-1 block text-sm font-medium leading-6 text-gray-800'>Fecha de fin de subasta:</label>
                    <input
                        required
                        name='end_date'
                        onChange={(e:any) => setEnd_date(e.target.value)}
                        value={dayjs(end_date).format('YYYY-MM-DD')}
                        min={dayjs(init_date).add(1, 'day').format('YYYY-MM-DD')}
                        type="date"
                        className='block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary text-sm sm:leading-6 bg-gray-50 '
                    />
                </div>
                <div className='w-100 my-4'>
                    <label htmlFor="price" className='mb-1 block text-sm font-medium leading-6 text-gray-800'>Precio ($)</label>
                    <input
                        required
                        name='price'
                        type="number"
                        value={values.price}
                        onChange={handleInputChange}
                        className='block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary text-sm sm:leading-6 bg-gray-50 '
                    />
                </div>
                <div className='w-100 my-4'>
                    <label htmlFor="price" className='mb-1 block text-sm font-medium leading-6 text-gray-800'>Puja ($)</label>
                    <input
                        required
                        name='bid_amount'
                        type="number"
                        value={values.bid_amount}
                        onChange={handleInputChange}
                        className='block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary text-sm sm:leading-6 bg-gray-50 '
                    />
                </div>
            </div>
            <div className="bg-gray-50 px-4 py-4 pb-6 flex sm:px-6 justify-between gap-2">
                <button
                    type="button"
                    className={`w-full rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primaryHover sm:mr-3 sm:w-auto`}
                    onClick={handleNewAuction}
                >
                    Crear
                </button>
            </div>
        </form>
    );
};
