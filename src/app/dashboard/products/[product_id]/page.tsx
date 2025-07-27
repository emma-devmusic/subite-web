'use client'
import { GalleryImages } from "@/components/gallery/GalleryImages";
import { Spinner } from "@/components/spinner/Spinner";
import { TableAutidStatusHistory } from "@/components/tables/TableAutidStatusHistory";
import { flu } from "@/commons/helpers";
import { findCategoriesByIds } from "@/commons/helpers/products";
import { useAppDispatch, useAppSelector } from "@/store";
import { deleteProductFromDB, getProductById } from "@/store/slices/productSlice";
import { uiModal } from "@/store/slices/uiSlice";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuctionCounter } from "../../main/components/AuctionCounter";
import dayjs from "dayjs";

interface Props {
    params: { product_id: string };
}

export default function ProductPage({ params }: Props) {

    const dispatch = useAppDispatch()
    const { productSelected } = useAppSelector(state => state.product)
    const { categories } = useAppSelector(state => state.category)
    const [categoryProduct, setCategoryProduct] = useState('')
    const [subcategoryProduct, setSubcategoryProduct] = useState('')
    const [urlImg, setUrlImg] = useState('')
    const [dates, setDates] = useState({
        created: new Date(),
        modified: new Date()
    })
    const [auction, setAuction] = useState(productSelected.products_acutions && productSelected.products_acutions.length > 0 && productSelected.products_acutions.find(s => !s.data_deleted))

    useEffect(() => {
        if (productSelected.products_acutions && productSelected.products_acutions.length > 0 && productSelected.products_acutions.find(s => !s.data_deleted))
            setAuction(productSelected.products_acutions && productSelected.products_acutions.length > 0 && productSelected.products_acutions.find(s => !s.data_deleted))
    }, [productSelected])

    useEffect(() => {
        if (!productSelected.id || productSelected.id !== parseInt(params.product_id as string)) dispatch(getProductById(params.product_id as string))
    }, [])

    useEffect(() => {
        if (productSelected.product_variations && productSelected.product_variations.length > 0) {
            productSelected.product_variations[0].productImages.forEach((img, i) => {
                const last = productSelected.product_variations[0].productImages.length - 1
                if (img.main_image) {
                    setUrlImg(img.url_image)
                } else if (urlImg === '' && i === last) {
                    setUrlImg(img.url_image)
                }
            })
        }
    }, [productSelected])

    useEffect(() => {
        if (productSelected.category_id && productSelected.sub_category_id && categories.length > 0) {
            setCategoryProduct(findCategoriesByIds(categories, productSelected.category_id, productSelected.sub_category_id).category)
            setSubcategoryProduct(findCategoriesByIds(categories, productSelected.category_id, productSelected.sub_category_id).subcategory)
            setDates({
                created: new Date(productSelected.data_created),
                modified: new Date(productSelected.data_modified)
            })
        }
    }, [productSelected, categories])

    const handleEditProduct = () => dispatch(uiModal({
        modalFor: 'new_product',
        modalOpen: true,
        modalTitle: 'Editar Producto'
    }))


    const handleAudit = () => dispatch(uiModal({
        modalFor: 'audit_product',
        modalOpen: true,
        modalTitle: 'Auditoría de Producto'
    }))


    const handleProductDelete = () => Swal.fire({
        title: "Eliminar Producto",
        text: "¿Estás seguro/a que deseas eliminar este producto? Esta acción no puede deshacerse",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Si, Borrar Producto",
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            dispatch(deleteProductFromDB(productSelected.product_variations[0].id))
        }
    });


    if (!productSelected.category_id || categories.length === 0) return <Spinner />

    return (
        <div className="pt-6 px-4">
            <div className="flex items-center mb-6 gap-3">
                <h2 className="text-2xl ">Información del Producto</h2>
                <div
                    className="inline-flex text-gray-400 hover:text-gray-600 hover:cursor-pointer transition-all"
                    onClick={handleEditProduct}
                >
                    <Icon icon={'lucide:edit'} className="w-7 h-7 " />
                </div>
            </div>
            <div className="w-full grid grid-cols-1 xl:grid-cols-3 gap-4 ">
                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 col-span-3 xl:col-span-1">
                    <div
                        className="flex justify-center text-gray-400 hover:text-gray-600 hover:cursor-pointer transition-all "
                    >
                        <Image width={400} height={400} className={`h-w-96 w-96 rounded-3xl object-cover shadow-md  `} src={`${urlImg}`} alt="Neil image" />
                    </div>
                    <div className="flex justify-center items-center mt-4 ">
                        {
                            (productSelected.products_audits.filter(st => !st.data_deleted)[0].product_audit_status.description === 'aprobado')
                                ? <Icon icon={'bitcoin-icons:verify-filled'} className="text-3xl text-cyan-500" />
                                : <Icon icon={'uis:exclamation-circle'} className="text-xl mr-1 text-yellow-500" />
                        }
                        <h3 className="text-2xl text-center font-semibold">{productSelected.name}</h3>
                    </div>
                    {
                        productSelected.supplier_products &&
                        <>
                            <h3 className="text-gray-500 mt-4">Información de Usuario</h3>
                            <div className="flex items-center gap-2 mt-1 text-sm">
                                <Icon icon={'mdi:user'} />
                                <span className="m-0">{productSelected.supplier_products[0].supplier.name}</span>
                            </div>
                            <div className="flex items-center gap-2 mt-1 text-sm">
                                <Icon icon={'material-symbols:mail'} />
                                <span className="m-0">{productSelected.supplier_products[0].supplier.email}</span>
                            </div>
                            <div className="flex items-center gap-2 mt-1 text-sm">
                                <Icon icon={'gridicons:phone'} />
                                <span className="m-0">{productSelected.supplier_products[0].supplier.phone}</span>
                            </div>
                        </>
                    }

                </div>
                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 col-span-3 xl:col-span-2">
                    <h3 className="text-2xl font-medium">Información General</h3>
                    {/* <hr className="mt-4" /> */}
                    <div className="grid grid-cols-1 xl:grid-cols-2">
                        <div>
                            <h3 className="text-gray-500 mt-4">Categoría</h3>
                            <div className="flex items-center gap-2 mt-1 text-sm">
                                <span className="m-0">{categoryProduct}</span>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-gray-500 mt-4">Subcategoría</h3>
                            <div className="flex items-center gap-2 mt-1 text-sm">
                                <span className="m-0">{subcategoryProduct}</span>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-gray-500 mt-4">Fecha de Creación:</h3>
                            <div className="flex items-center gap-2 mt-1 text-sm">
                                <span className="m-0">{dates.created.toLocaleDateString()}</span>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-gray-500 mt-4">Fecha de Modificación:</h3>
                            <div className="flex items-center gap-2 mt-1 text-sm">
                                <span className="m-0">{dates.modified.toLocaleDateString()}</span>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-gray-500 mt-4">Precio:</h3>
                            <div className="flex items-center gap-2 mt-1 text-sm">
                                <span className="m-0">{productSelected.product_variations[0].price}</span>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-gray-500 mt-4">Nombre:</h3>
                            <div className="flex items-center gap-2 mt-1 text-sm">
                                <span className="m-0">{productSelected.name}</span>
                            </div>
                        </div>
                    </div>
                    <h3 className="text-gray-500 mt-4">Estado de auditoría</h3>
                    <div className="flex items-center gap-2 mt-1 text-sm">
                        {productSelected.products_audits.filter(st => !st.data_deleted)[0].product_audit_status.description === 'aprobado' && <Icon icon={'lets-icons:check-fill'} className="text-green-500 text-lg" />}
                        <i className="m-0">{flu(productSelected.products_audits.filter(st => !st.data_deleted)[0].product_audit_status.description)}</i>
                    </div>
                    <hr className="mt-4" />
                    <div>
                        <h3 className="text-gray-500 mt-4">Descripción:</h3>
                        <div className="gap-2 mt-1 text-sm border rounded-md p-3 min-h-32">
                            <div
                                className="m-0 overflow-hidden text-ellipsis"
                                dangerouslySetInnerHTML={{ __html: productSelected.product_variations[0].description }}
                            />
                        </div>
                    </div>
                </div>
                {
                    auction &&
                    <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 col-span-3">
                        <div className="sm:flex items-center sm:justify-between">
                            <h3 className="text-2xl font-medium mb-4">Subasta de Producto</h3>
                            <div className="mb-5">
                                <AuctionCounter
                                    auctionStartDate={new Date(auction?.init_date).toLocaleDateString()}
                                    auctionEndDate={new Date(auction?.end_date).toLocaleDateString()}
                                />
                            </div>
                        </div>
                        <hr />
                        <div className="sm:flex gap-4 sm:justify-between max-w-4xl">
                            <div>
                                <h3 className="text-gray-500 mt-4">Fecha de Publicación:</h3>
                                <div className="flex items-center gap-2 mt-1 text-sm">
                                    <span className="m-0">{new Date(auction.publication_date).toLocaleDateString()}</span>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-gray-500 mt-4">Fecha de Inicio:</h3>
                                <div className="flex items-center gap-2 mt-1 text-sm">
                                    <span className="m-0">{new Date(auction.init_date).toLocaleDateString()}</span>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-gray-500 mt-4">Fecha de Fin:</h3>
                                <div className="flex items-center gap-2 mt-1 text-sm">
                                    <span className="m-0">{new Date(auction.end_date).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 col-span-3">
                    <h3 className="text-2xl font-medium mb-4">Galería</h3>
                    <GalleryImages images={productSelected.product_variations[0].productImages} />
                    <button
                        className="bg-green-600 border-[1px] border-green-600  text-white self-end rounded-md px-4 py-2 hover:bg-green-500  transition-all w-full sm:w-auto mt-6"
                        onClick={handleAudit}
                    >
                        Verificación
                    </button>
                </div>
                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 col-span-3">
                    <h3 className="text-2xl font-medium mb-4">Historial de Auditoría</h3>
                    <TableAutidStatusHistory auditHistory={{ products: productSelected.products_audits }} />
                </div>
                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 col-span-3">
                    <button
                        className="bg-white border-[1px] border-red-600 text-red-600 rounded-md px-4 py-2 hover:bg-red-600 hover:text-white transition-all"
                        onClick={handleProductDelete}
                    >
                        Eliminar Producto
                    </button>
                </div>
            </div>
        </div>
    );
}