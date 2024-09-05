import { useAppDispatch, useAppSelector } from "@/store";
import { getCategories, selectingCategory } from "@/store/categorySlice";
import { useEffect, useState } from "react";


interface Props {
    category: number;
    subcategory: number;
    price: number;
    stock: number;
    handleInputChange: () => void;
}

export const SecondStepProductManage = ({ category, subcategory, handleInputChange, stock, price }: Props) => {


    const dispatch = useAppDispatch();
    const { categories, categoriesSelected } = useAppSelector(state => state.category)
    const [sub_categoryDef, setSubcategoryDef] = useState(subcategory)

    useEffect(() => {
        if (categories.length === 0) dispatch(getCategories('search?page=1&limit=30'))
    }, [])

    useEffect(() => {
        if (category !== 0) dispatch(selectingCategory(`${category}`))
    }, [category])

    useEffect(() => {
        setSubcategoryDef(subcategory)
    }, [categoriesSelected])

    return (
        <form action="">
            <div className='w-100 my-4'>
                <label htmlFor="category" className='mb-1 block text-sm font-medium leading-6 text-gray-800'>Categoría</label>
                <select
                    required
                    name="category"
                    defaultValue={category}
                    className='block w-full rounded-md border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 text-sm sm:leading-6 bg-gray-50 '
                    onChange={handleInputChange}
                >
                    <option value={0}>-Seleccionar-</option>
                    {
                        categories.map((cat) => {
                            if (cat.subcategories)
                                return cat.subcategories.length && <option key={cat.id} value={cat.id}>{cat.name}</option>
                        })
                    }
                </select>
            </div>
            {
                categoriesSelected.id &&
                <div className='w-100 my-4'>
                    <label htmlFor="category" className='mb-1 block text-sm font-medium leading-6 text-gray-800'>Subcategoría</label>
                    <select
                        required
                        defaultValue={sub_categoryDef}
                        // disabled={categoriesSelected.subcategories === undefined || categoriesSelected.subcategories.length === 0}
                        className='block w-full rounded-md border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 text-sm sm:leading-6 bg-gray-50 '
                        name="sub_category"
                        onChange={handleInputChange}
                    >
                        <option value={0}>-Seleccionar-</option>
                        {
                            categoriesSelected.subcategories && categoriesSelected.subcategories.map(sub => {
                                return <option key={sub.id} value={sub.id}>{sub.name}</option>
                            }
                            )
                        }
                    </select>
                </div>
            }
            <div className='w-100 my-4'>
                <label htmlFor="price" className='mb-1 block text-sm font-medium leading-6 text-gray-800'>Precio ($)</label>
                <input
                    required
                    placeholder='2300'
                    name='price'
                    type="number"
                    className='block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 text-sm sm:leading-6 bg-gray-50 '
                    value={price}
                    onChange={handleInputChange}

                />
            </div>
            <div className='w-100 my-4'>
                <label htmlFor="quantity" className='mb-1 block text-sm font-medium leading-6 text-gray-800'>Stock</label>
                <input
                    required
                    placeholder='8'
                    name='quantity'
                    value={stock}
                    onChange={handleInputChange}
                    type="number"
                    className='block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 text-sm sm:leading-6 bg-gray-50 '
                />
            </div>
        </form>
    );
};
