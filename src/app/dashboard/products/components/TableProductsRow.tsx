'use client'

import Swal from "sweetalert2";
import Link from "next/link";
import Image from "next/image";
import { findCategoriesByIds } from "@/helpers/products";
import { useAppDispatch } from "@/store";
import { ItemProductSearchResponse } from "@/types/products";
import { useEffect, useMemo, useState } from "react";
import { useAppSelector } from '../../../../store/index';
import { deleteProductFromDB, getProductById, selectProduct } from "@/store/slices/productSlice";
import { uiModal } from "@/store/slices/uiSlice";
import { useRouter } from "next/navigation";


export const TableProductsRow = (product: ItemProductSearchResponse) => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { categories } = useAppSelector(state => state.category)
    const { isAdmin } = useAppSelector(state => state.manageUser)
    const [urlImg, setUrlImg] = useState('')
    const productCategory = useMemo(() => findCategoriesByIds(categories, product.category_id, product.sub_category_id), [categories, product]);

    useEffect(() => {
        const mainImage = product.product_variations[0]?.productImages.find(img => img.main_image) || product.product_variations[0]?.productImages[0];
        setUrlImg(mainImage?.url_image || '');
    }, [product])

    const handleUserDelete = () => {
        Swal.fire({
            title: "Eliminar Producto",
            text: "¿Estás seguro/a que deseas eliminar este producto?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Si, Borrar producto",
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteProductFromDB(product.product_variations[0].id))
            }
        });
    }

    const handleEditProduct = () => {
        dispatch(selectProduct(product))
        if (isAdmin) {
            dispatch(getProductById(`${product.product_variations[0].id}`))
            router.push(`/dashboard/products/${product.product_variations[0].id}`)
            return
        }
        dispatch(uiModal({
            modalFor: 'new_product',
            modalOpen: true,
            modalTitle: 'Editar Producto'
        }))
    }

    const handleNewAuction = () => {
        dispatch(selectProduct(product))
        dispatch(uiModal({
            modalFor: 'new_auction',
            modalOpen: true,
            modalTitle: 'Nuevo Subasta'
        }))
    }

    return (
        <tr className="hover:bg-gray-100">
            {/* <td className="p-4 w-4">
                <div className="flex items-center">
                    <input id="checkbox-194556" aria-describedby="checkbox-1" type="checkbox" className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-transparent h-4 w-4 rounded" />
                    <label htmlFor="checkbox-194556" className="sr-only">checkbox</label>
                </div>
            </td> */}
            <td className="p-4 flex items-center whitespace-nowrap space-x-6 mr-12 lg:mr-0 w-full min-w-52">
                {
                    urlImg &&
                    <Image
                        width={75}
                        height={75}
                        className={
                            `h-10 w-10 min-w-[40px] rounded-full border-2 ${
                            (product.products_audits.filter(st => !st.data_deleted)[0].product_audit_status.description === 'aprobado')
                            ? 'border-cyan-400'
                            : 'border-yellow-500'
                        }`}
                        src={urlImg} 
                        alt="Neil Sims avatar" 
                    />
                }
                <div className="text-sm font-normal text-gray-500 w-full">
                    <div className="text-sm font-semibold text-gray-900">
                        <div className="flex items-center gap-3">
                            <p className="whitespace-normal w-full min-w-[132px]">
                                {product.name} 
                            </p>
                        </div>
                    </div>
                    {
                        (isAdmin && product.supplier_products) &&
                        <div className="text-xs font-normal text-gray-500">Publicado por: <Link className="hover:underline" href={`/dashboard/users/${product.supplier_products[0].supplier.auth_user.id}`}>{product.supplier_products[0].supplier.name}</Link></div>
                    }
                </div>
            </td>
            <td className="p-4 text-sm whitespace-nowrap  font-medium text-gray-900">{productCategory.subcategory}</td>
            <td className="p-4 text-sm text-gray-900 truncate min-w-44 max-w-52">
                {product.product_variations[0].description}
            </td>
            <td className="p-4 text-sm whitespace-nowrap  font-medium text-gray-900">{product.product_variations[0].price}</td>
            <td className="p-4 text-sm whitespace-nowrap space-x-2 text-end">{product.product_variations[0].stocks.quantity}</td>
            <td className="p-4 whitespace-nowrap space-x-2 text-center">
                {
                    isAdmin
                    &&
                    <button
                        disabled={(product.products_acutions && product.products_acutions.length > 0)}
                        className=" text-primary hover:text-primaryHover disabled:text-gray-300 focus:ring-4 focus:ring-transparent font-medium rounded-lg text-sm inline-flex items-center px-1 py-1 text-center"
                        onClick={handleNewAuction}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24"><g fill="none"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path><path fill="currentColor" d="M2.686 10.462a2.5 2.5 0 0 0 0 3.536l2.829 2.828a2.5 2.5 0 0 0 4.095-2.681l.791-.791l6.407 7.392a2.793 2.793 0 1 0 3.94-3.94l-7.392-6.407l.791-.79a2.5 2.5 0 0 0 2.681-4.096L14 2.684a2.5 2.5 0 0 0-4.095 2.681L5.368 9.902a2.5 2.5 0 0 0-2.682.56"></path></g></svg>
                    </button>
                }

                <button
                    className="text-cyan-600 hover:text-cyan-700 focus:ring-4 focus:ring-transparent font-medium rounded-lg text-sm inline-flex items-center px-1 py-1 text-center"
                    onClick={handleEditProduct}
                >
                    <svg className=" h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd"></path></svg>
                </button>
                {
                    isAdmin
                        ? <button
                            className=" text-red-700 hover:text-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-1 py-1 text-center"
                            onClick={handleUserDelete}
                        >
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                        </button>
                        :
                        <button
                            disabled={(product.products_acutions && product.products_acutions.length > 0)}
                            className=" text-red-700 hover:text-red-800 focus:ring-4 focus:ring-red-300 disabled:text-gray-300 font-medium rounded-lg text-sm inline-flex items-center px-1 py-1 text-center"
                            onClick={handleUserDelete}
                        >
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                        </button>
                }
            </td>
        </tr>

    );
};
