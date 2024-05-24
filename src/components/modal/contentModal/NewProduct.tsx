
import './newProductModalStyle.css'


export const NewProduct = () => {


    return (
        <>
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">

                <div className='m-3'>
                    <form action="">
                        <div className='sm:flex sm:gap-3'>
                            <div className='w-100 my-4'>
                                <label htmlFor="nameProduct" className='mb-1 block text-sm font-medium leading-6 text-gray-800'>Nombre del producto</label>
                                <input placeholder='Apple Imac 27"' name='nameProduct' type="text" className='block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6 bg-gray-50 ' />
                            </div>
                            <div className='w-100 my-4'>
                                <label htmlFor="brand" className='mb-1 block text-sm font-medium leading-6 text-gray-800'>Marca</label>
                                <input placeholder='Apple' name='brand' type="text" className='block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6 bg-gray-50 ' />
                            </div>
                        </div>
                        <div className='sm:flex sm:gap-3'>
                            <div className='w-100 my-4'>
                                <label htmlFor="model" className='mb-1 block text-sm font-medium leading-6 text-gray-800'>Modelo</label>
                                <input placeholder='Imac Pro' name='model' type="text" className='block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6 bg-gray-50 ' />
                            </div>
                            <div className='w-100 my-4'>
                                <label htmlFor="category" className='mb-1 block text-sm font-medium leading-6 text-gray-800'>Categoría</label>
                                <input placeholder='Electronics' name='category' type="text" className='block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6 bg-gray-50 ' />
                            </div>
                        </div>
                        <div className='w-100 my-4'>
                            <label htmlFor="price" className='mb-1 block text-sm font-medium leading-6 text-gray-800'>Precio ($)</label>
                            <input placeholder='2300' name='price' type="number" className='block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6 bg-gray-50 ' />
                        </div>
                        <div className='w-100 my-4'>
                            <label htmlFor="description" className='mb-1 block text-sm font-medium leading-6 text-gray-800'>Descripción</label>
                            <textarea rows={4} placeholder='e.g. 3.8GHz 8-core 10th-generation Intel Core i7 processor, Turbo Boost up to 5.0GHz, Ram 16 GB DDR4 2300Mhz' name='price' className='block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6 bg-gray-50 ' />
                        </div>

                        <div className='w-100 my-4 inputImage'>
                            <label htmlFor="description" className='mb-1 block text-sm font-medium leading-6 text-gray-800'>Imagen</label>
                            <input type='text' placeholder='Arrastra o sube una imagen' className='block w-full rounded-md py-1.5  text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6 h-[108px]' />
                            <input type='file' placeholder='e.g. 3.8GHz 8-core 10th-generation Intel Core i7 processor, Turbo Boost up to 5.0GHz, Ram 16 GB DDR4 2300Mhz' name='img' className='w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6 bg-gray-50 hidden' />
                        </div>
                    </form>
                </div>
            </div>
            <div className="bg-gray-50 px-4 py-4 pb-6 sm:flex sm:flex-row sm:px-6">
                <button type="button" className="w-full rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 sm:mr-3 sm:w-auto">Agregar</button>
                <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancelar</button>
            </div>
        </>
    )
}
