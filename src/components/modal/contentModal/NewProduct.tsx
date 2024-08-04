
import Slider from 'react-slick';
import { ImageProductModal } from './ImageProductModal'
import './newProductModalStyle.css'
import { useState } from 'react';

const settings = {
    dots: true,
    swipeToSlide: false,
    infinite: false,
    arrow: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 200
};


export const NewProduct = () => {

    const [step, setStep] = useState(1)

    const slideNext = () => {
        const arrow: any = document.querySelector('.slick-next')
        setStep(step + 1)
        arrow.click()
    }

    const slidePrev = () => {
        const arrow: any = document.querySelector('.slick-prev')
        setStep(step - 1)
        arrow.click()
    }
    

    return (
        <>
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <Slider
                    {...settings}
                    className='mb-4'
                    afterChange={(index: any) => setStep(index + 1)}>
                    <div>
                        <div className='bg-slate-100 p-4 border-l-2 border-gray-400'>
                            <p className='text-gray-600 text-xs'>Sigue los pasos para la creación de un nuevo producto completando todos los campos.</p>
                        </div>
                        <form action="">
                            <div className='w-100 my-4'>
                                <label htmlFor="nameProduct" className='mb-1 block text-sm font-medium leading-6 text-gray-800'>Nombre del producto</label>
                                <input placeholder='Apple Imac 27"' name='nameProduct' type="text" className='block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 text-sm sm:leading-6 bg-gray-50 ' />
                            </div>
                            <div className='w-100 my-4'>
                                <label htmlFor="description" className='mb-1 block text-sm font-medium leading-6 text-gray-800'>Descripción</label>
                                <textarea rows={4} placeholder='e.g. 3.8GHz 8-core 10th-generation Intel Core i7 processor, Turbo Boost up to 5.0GHz, Ram 16 GB DDR4 2300Mhz' name='price' className='block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 text-sm sm:leading-6 bg-gray-50 ' />
                            </div>
                        </form>
                    </div>
                    <div>
                        <form action="">
                            <div className='w-100 my-4'>
                                <label htmlFor="category" className='mb-1 block text-sm font-medium leading-6 text-gray-800'>Categoría</label>
                                <input placeholder='Electronics' name='category' type="text" className='block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 text-sm sm:leading-6 bg-gray-50 ' />
                            </div>
                            <div className='w-100 my-4'>
                                <label htmlFor="category" className='mb-1 block text-sm font-medium leading-6 text-gray-800'>Subcategoría</label>
                                <input placeholder='Electronics' name='category' type="text" className='block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 text-sm sm:leading-6 bg-gray-50 ' />
                            </div>
                            <div className='w-100 my-4'>
                                <label htmlFor="price" className='mb-1 block text-sm font-medium leading-6 text-gray-800'>Precio ($)</label>
                                <input placeholder='2300' name='price' type="number" className='block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 text-sm sm:leading-6 bg-gray-50 ' />
                            </div>
                        </form>
                    </div>
                    <div>
                        <form action="">
                            <div className='w-100 my-4'>
                                <label htmlFor="price" className='mb-1 block text-sm font-medium leading-6 text-gray-800'>Stock</label>
                                <input placeholder='8' name='price' type="number" className='block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 text-sm sm:leading-6 bg-gray-50 ' />
                            </div>
                            <div className='w-100 my-4'>
                                <label htmlFor="images" className='mb-1 block text-sm font-medium leading-6 text-gray-800'>Imagenes</label>
                                <ImageProductModal />
                            </div>
                        </form>
                    </div>
                </Slider>
            </div>
            <div className="bg-gray-50 px-4 py-4 pb-6 flex sm:px-6 justify-between gap-2">
                <button
                    type="button"
                    className={`w-full rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 sm:mr-3 sm:w-auto ${step === 1 && 'invisible'}`}
                    onClick={slidePrev}
                >Anterior</button>
                <button
                    type="button"
                    className={`w-full rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 sm:mr-3 sm:w-auto ${step === 3 && 'invisible'}`}
                    onClick={slideNext}
                >Siguiente</button>
            </div>
        </>
    )
}
