'use client'

import { useState } from "react";

export const CategoryModal = () => {

    const [isSubcategory, setIsSubcategory] = useState(false)

    return (
        <div >
            <form action="" className="p-4">
                <div className='w-100 my-4'>
                    <label htmlFor="nameProduct" className='mb-1 block text-sm font-medium leading-6 text-gray-800'>Nombre de categoría</label>
                    <input placeholder='Electrónica...' name='nameProduct' type="text" className='block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 text-sm sm:leading-6 bg-gray-50 ' />
                </div>
                <div className='w-100 my-4'>
                    <label htmlFor="description" className='mb-1 block text-sm font-medium leading-6 text-gray-800'>Descripción</label>
                    <textarea rows={4} placeholder='Describe tu categoría...' name='price' className='block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 text-sm sm:leading-6 bg-gray-50 ' />
                </div>
                <div className='w-100 my-4'>
                    <div className="flex items-start">
                        <div className="flex items-center h-5 gap-3">
                            <label htmlFor="remember" className="block text-sm font-medium leading-6 text-gray-800">¿Es subacategoría?</label>
                            <input id="remember" aria-describedby="remember" name="remember" type="checkbox" onChange={() => setIsSubcategory(!isSubcategory)} className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded" required />
                        </div>
                    </div>
                </div>
                {
                    isSubcategory &&
                    <div className='w-100 my-4'>
                        <label htmlFor="category" className='mb-1 block text-sm font-medium leading-6 text-gray-800'>Seleccioná la categoría padre:</label>
                        <select className='block w-full rounded-md border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 text-sm sm:leading-6 bg-gray-50 '>
                            <option value="Electronics">Electronics</option>
                            <option value="Books">Books</option>
                            <option value="Clothing">Clothing</option>
                            <option value="Home">Home</option>
                            <option value="Sports">Sports</option>
                            <option value="Toys">Toys</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                }
            </form>
                <div className="bg-gray-100 px-4 py-4 pb-6 flex sm:px-6 justify-between gap-2">
                    <button
                        type="button"
                        className={`w-full rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 sm:mr-3 sm:w-auto `}
                    >Guardar</button>
                </div>
        </div>
    );
};
