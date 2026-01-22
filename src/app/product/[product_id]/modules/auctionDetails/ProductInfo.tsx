import React from 'react'
import { findCategoriesByIds } from '@/commons/helpers/products';
import { DataHomeProductResponse } from '@/types/homeProductResponse'
import dayjs from 'dayjs';
import { getCategoriesFromDB } from '@/services-actions/home/categories';
import { Spinner } from '@/components/spinner/Spinner';

interface Props {
    product: DataHomeProductResponse;
}

export const ProductInfo = async ({ product }: Props) => {

    const categories = (await getCategoriesFromDB()).items
    const productCategory = findCategoriesByIds(
        categories, 
        product.sub_category?.category?.id, 
        product.sub_category?.id
    )
    const auction = product.products_acutions?.find(s => !s.data_deleted)

    if(!product.name) return <Spinner />

    return (
        <>
            <ul className='flex flex-col px-4 gap-2'>
                <li className='text-sm text-gray-600 flex items-center gap-1'>
                    <strong className='text-gray-800'>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 48 48"
                        >
                            <g
                                fill="none"
                                stroke="currentColor"
                                strokeLinejoin="round"
                                strokeWidth="4"
                            >
                                <path d="M44 14L24 4L4 14v20l20 10l20-10z" />
                                <path
                                    strokeLinecap="round"
                                    d="m4 14l20 10m0 20V24m20-10L24 24M34 9L14 19"
                                />
                            </g>
                        </svg>
                    </strong>
                    <strong className='text-gray-800'>
                        Producto:
                    </strong>
                    {product?.name}
                </li>
                <li className='text-sm text-gray-600 flex items-center gap-1'>
                    <strong className='text-gray-800 flex items-center gap-1'>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fill="currentColor"
                                d="M5.673 0a.7.7 0 0 1 .7.7v1.309h7.517v-1.3a.7.7 0 0 1 1.4 0v1.3H18a2 2 0 0 1 2 1.999v13.993A2 2 0 0 1 18 20H2a2 2 0 0 1-2-1.999V4.008a2 2 0 0 1 2-1.999h2.973V.699a.7.7 0 0 1 .7-.699M1.4 7.742v10.259a.6.6 0 0 0 .6.6h16a.6.6 0 0 0 .6-.6V7.756zm5.267 6.877v1.666H5v-1.666zm4.166 0v1.666H9.167v-1.666zm4.167 0v1.666h-1.667v-1.666zm-8.333-3.977v1.666H5v-1.666zm4.166 0v1.666H9.167v-1.666zm4.167 0v1.666h-1.667v-1.666zM4.973 3.408H2a.6.6 0 0 0-.6.6v2.335l17.2.014V4.008a.6.6 0 0 0-.6-.6h-2.71v.929a.7.7 0 0 1-1.4 0v-.929H6.373v.92a.7.7 0 0 1-1.4 0z"
                            />
                        </svg>
                        Inicio:
                    </strong>
                    {dayjs(auction?.init_date).format('DD/MM/YYYY')}
                </li>
                <li className='text-sm text-gray-600 flex items-center gap-1'>
                    <strong className='text-gray-800 flex items-center gap-1'>
                        <svg
                            className="relative left-[-1px]"
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                        >
                            <path
                                fill="currentColor"
                                fillRule="evenodd"
                                d="M3 13.5a.5.5 0 0 1-.5-.5V3a.5.5 0 0 1 .5-.5h9.25a.75.75 0 0 0 0-1.5H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9.75a.75.75 0 0 0-1.5 0V13a.5.5 0 0 1-.5.5zm12.78-8.82a.75.75 0 0 0-1.06-1.06L9.162 9.177L7.289 7.241a.75.75 0 1 0-1.078 1.043l2.403 2.484a.75.75 0 0 0 1.07.01z"
                                clipRule="evenodd"
                            />
                        </svg>
                        Fin:
                    </strong>
                    {dayjs(auction?.end_date).format('DD/MM/YYYY')}
                </li>
                <li className='text-sm text-gray-600 flex items-center gap-1'>
                    <strong className='text-gray-800'>
                        Categoría:
                    </strong>
                    {productCategory.category}
                </li>
                <li className='text-sm text-gray-600 flex items-center gap-1'>
                    <strong className='text-gray-800'>
                        Subategoría:
                    </strong>
                    {productCategory.subcategory}
                </li>
            </ul>
        </>
    )
}
