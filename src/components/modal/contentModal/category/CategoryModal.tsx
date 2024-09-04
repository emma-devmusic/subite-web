'use client'

import { useForm } from "@/hooks/useForm";
import { useAppDispatch, useAppSelector } from "@/store";
import { newCategory, newSubcategory, updateCategory, updateSubcategory } from "@/store/categorySlice";
import { useEffect, useState } from "react";

export const CategoryModal = () => {

    const { categories, categoriesSelected } = useAppSelector(state => state.category)
    const [isSubcategory, setIsSubcategory] = useState(false)
    const dispatch = useAppDispatch()


    const [values, handleInputChange, reset] = useForm({
        name: '',
        description: '',
        category_id: ''
    })

    useEffect(() => {
        reset(categoriesSelected)
    }, [categoriesSelected])

    const handleSubmit = (e: any) => {
        e.preventDefault()
        delete values.subcategories
        if (categoriesSelected.id) {
            delete values.isSubcategory
            if (categoriesSelected.isSubcategory) {
                dispatch(updateSubcategory(values))
                return
            }
            dispatch(updateCategory(values))
            return
        }


        if (isSubcategory) {
            values.category_id = parseInt(values.category_id)
            dispatch(newSubcategory(values))
        } else {
            delete values.category_id
            dispatch(newCategory(values))
        }
    }

    return (
        <div >
            <form action="" onSubmit={handleSubmit}>
                <div className="p-4">
                    <div className='w-100 my-4'>
                        <label htmlFor="name" className='mb-1 block text-sm font-medium leading-6 text-gray-800'>Nombre de categoría</label>
                        <input
                            placeholder='Electrónica...'
                            name='name'
                            type="text"
                            className='block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 text-sm sm:leading-6 bg-gray-50 '
                            value={values.name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='w-100 my-4'>
                        <label htmlFor="description" className='mb-1 block text-sm font-medium leading-6 text-gray-800'>Descripción</label>
                        <textarea
                            rows={4}
                            placeholder='Describe tu categoría...'
                            name='description'
                            className='block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 text-sm sm:leading-6 bg-gray-50 '
                            value={values.description}
                            onChange={handleInputChange}
                        />
                    </div>
                    {
                        !categoriesSelected.id &&
                        <div className='w-100 my-4'>
                            <div className="flex items-start">
                                <div className="flex items-center h-5 gap-3">
                                    <label htmlFor="isSubcategory" className="block text-sm font-medium leading-6 text-gray-800">¿Es subacategoría?</label>
                                    <input id="isSubcategory" aria-describedby="isSubcategory" name="isSubcategory" type="checkbox" onChange={() => setIsSubcategory(!isSubcategory)} className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded" />
                                </div>
                            </div>
                        </div>
                    }
                    {
                        isSubcategory &&
                        <div className='w-100 my-4'>
                            <label htmlFor="category_id" className='mb-1 block text-sm font-medium leading-6 text-gray-800'>Seleccioná la categoría padre:</label>
                            <select
                                onChange={handleInputChange}
                                name="category_id"
                                className='block w-full rounded-md border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 text-sm sm:leading-6 bg-gray-50'
                            >
                                <option value={''}>Seleccionar</option>
                                {
                                    categories.map((category) =>
                                        <option key={category.id} value={category.id}>{category.name}</option>
                                    )
                                }
                            </select>
                        </div>
                    }
                </div>
                <div className="bg-gray-100 px-4 py-4 pb-6 flex sm:px-6 justify-between gap-2">
                    <button
                        type="submit"
                        className={`w-full rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 sm:mr-3 sm:w-auto `}
                    >Guardar</button>
                </div>
            </form>
        </div>
    );
};
