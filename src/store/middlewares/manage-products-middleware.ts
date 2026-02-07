import Swal from "sweetalert2";
import { Dispatch, MiddlewareAPI } from "@reduxjs/toolkit";
import { uiCloseModal, uiModal, uiSetLoading } from "../slices/uiSlice";
import { RootState } from "..";
import { deleteImageFromSW3 } from "@/commons/helpers/imageProductManager";
import { deleteImageNewProduct, getProductById, getProducts, selectProduct, setProductAuditsStatuses, setProducts } from "../slices/productSlice";
import { fetchData } from "@/services/fetchData";
import { ItemProductSearchResponse, ProductSearchIDResponse, ProductSearchResponse } from "@/types/products";
import { path_role } from "@/commons/helpers";
import { ProductAuditsStatuses } from "@/types";
import SessionManager from "@/commons/Classes/SessionManager";





export const manageProductMiddleware = (state: MiddlewareAPI) => {
    const session = SessionManager.getInstance();

    const { product } = state.getState() as RootState
    return (next: Dispatch) => async (action: any) => {
        next(action);
        const token = session.getToken()
        const role_id = session.getRole()

        const deleteArrayImages = (arr: any[]) => {
            arr.forEach(async (image: any, i) => {
                if (typeof image.id === 'undefined') {
                    try {
                        await deleteImageFromSW3(image.url_image)
                        state.dispatch(deleteImageNewProduct(image))
                    } catch (error) {
                        Swal.fire('Error', 'Error al eliminar las imágenes.', 'error');
                        throw new Error;
                    }
                }
                if (arr.length - 1 === i) state.dispatch(uiCloseModal())
            })
        }



        if (action.type === 'product/getProducts') {
            state.dispatch(uiSetLoading(true))
            console.log(`/manage-auction-products/${path_role(role_id)}/${action.payload}`);
            try {
                console.log('Llamada a la Api - MANAGE-PRODUCT - GET PRODUCTS')
                const searchResponse: ProductSearchResponse = await fetchData(
                    `/manage-auction-products/${path_role(role_id)}/${action.payload}`,
                    "GET",
                    null,
                    token
                )
                state.dispatch(uiSetLoading(false))
                state.dispatch(setProducts(searchResponse.data.items))
            } catch (error: any) {
                state.dispatch(uiModal({
                    modalFor: 'message',
                    modalOpen: true,
                    typeMsg: 'error',
                    msg: `${error.code}`
                }))
                state.dispatch(uiSetLoading(false))
            }
            state.dispatch(uiSetLoading(false))
        }


        if (action.type === 'product/getProductById') {
            state.dispatch(uiSetLoading(true))
            try {
                console.log('Llamada a la Api - MANAGE-PRODUCT - GET PRODUCT BY ID')
                const searchResponse: ProductSearchIDResponse = await fetchData(
                    `/manage-auction-products/${path_role(role_id)}/search/${action.payload}`,
                    "GET",
                    null,
                    token
                )
                let productFind: any = {
                    ...searchResponse.data,
                    category_id: searchResponse.data.sub_category.category.id,
                    category_description: searchResponse.data.sub_category.category.description,
                    sub_category_id: searchResponse.data.sub_category.id,
                    sub_category_description: searchResponse.data.sub_category.description,
                    products_audits: searchResponse.data.products_audits,
                    supplier_products: searchResponse.data.supplier_products,
                }
                state.dispatch(selectProduct(productFind))
                state.dispatch(uiSetLoading(false))

            } catch (error: any) {
                state.dispatch(uiModal({
                    modalFor: 'message',
                    modalOpen: true,
                    typeMsg: 'error',
                    msg: `${typeof error.code === 'undefined' ? 'Parece que ese registro no existe' : error.code}`
                }))
                location.replace('/dashboard')
                state.dispatch(uiSetLoading(false))

            }
        }


        if (action.type === 'product/getProductAuditsStatuses') {
            state.dispatch(uiSetLoading(true))
            try {
                console.log('Llamada a la Api - MANAGE-PRODUCT - GET PRODUCTS AUDITS STATUSES')
                const productAuditStatuses: ProductAuditsStatuses = await fetchData(
                    `/manage-auction-products/${path_role(role_id)}/audits/statuses`,
                    "GET",
                    null,
                    token
                )
                state.dispatch(setProductAuditsStatuses(productAuditStatuses.data))
                state.dispatch(uiSetLoading(false))

            } catch (error: any) {
                state.dispatch(uiModal({
                    modalFor: 'message',
                    modalOpen: true,
                    typeMsg: 'error',
                    msg: `${error.code}`
                }))
                state.dispatch(uiSetLoading(false))

            }
        }



        if (action.type === 'product/newProductSubmit') {
            state.dispatch(uiSetLoading(true))
            try {
                console.log('Llamada a la Api - MANAGE-PRODUCT - NEW PRODUCT')
                await fetchData(
                    `/manage-auction-products/${path_role(role_id)}/create`,
                    "POST",
                    action.payload,
                    token
                )
                Swal.fire('Hecho', 'Producto creado correctamente', 'success')
                state.dispatch(getProducts('search?page=1&limit=10'))
                state.dispatch(uiCloseModal())
                state.dispatch(uiSetLoading(false))

            } catch (error: any) {
                state.dispatch(uiModal({
                    modalFor: 'message',
                    modalOpen: true,
                    typeMsg: 'error',
                    msg: `${error.code}`
                }))
                state.dispatch(uiSetLoading(false))
            }
        }



        if (action.type === 'product/updateProduct') {
            state.dispatch(uiSetLoading(true))

            try {
                console.log('Llamada a la Api - MANAGE-PRODUCT - UPDATE PRODUCT')
                console.log(action.payload)
                // return
                await fetchData(
                    `/manage-auction-products/${path_role(role_id)}/update${path_role(role_id) === 'clients' ? '/before-audits' : ''}`,
                    "PATCH",
                    action.payload,
                    token
                )
                if (path_role(role_id) === 'clients') {
                    state.dispatch(getProducts('search?page=1&limit=10'))
                    state.dispatch(uiCloseModal())
                } else {
                    location.reload()
                }
                Swal.fire('Hecho', 'Producto actualizado correctamente', 'success')
                state.dispatch(uiSetLoading(false))

            } catch (error: any) {
                state.dispatch(uiModal({
                    modalFor: 'message',
                    modalOpen: true,
                    typeMsg: 'error',
                    msg: `${error.code}`
                }))
                state.dispatch(uiSetLoading(false))

            }
        }


        //ELMINAR PRODUCTO
        if (action.type === 'product/deleteProductFromDB') {
            state.dispatch(uiSetLoading(true))
            try {
                await fetchData(
                    `/manage-auction-products/${path_role(role_id)}/${action.payload}`,
                    'DELETE',
                    null,
                    token
                )
                Swal.fire('Hecho', 'Producto eliminado correctamente', 'success')
                state.dispatch(getProducts('search?page=1&limit=10'))
                state.dispatch(uiSetLoading(false))

            } catch (error: any) {
                state.dispatch(uiModal({
                    modalFor: 'message',
                    modalOpen: true,
                    typeMsg: 'error',
                    msg: `${error.code}`
                }))
                state.dispatch(uiSetLoading(false))

            }
        }



        if (action.type === 'product/deleteImagesFromS3') {
            state.dispatch(uiModal({
                modalTitle: 'Borrando Imagenes',
                modalFor: 'loading',
                modalOpen: true,
            }))
            deleteArrayImages(product.imagesNewProduct)
        }


        if (action.type === 'product/setStatusProduct') {
            state.dispatch(uiSetLoading(true))
            try {
                console.log('Llamada a la Api - MANAGE-PRODUCT - SET STATUS PRODUCT')
                await fetchData(
                    `/manage-auction-products/admin/update/audit-status`,
                    "PATCH",
                    action.payload,
                    token
                )
                Swal.fire('Hecho', 'Producto actualizado correctamente', 'success')

            } catch (error: any) {
                state.dispatch(uiModal({
                    modalFor: 'message',
                    modalOpen: true,
                    typeMsg: 'error',
                    msg: `${error.code}`
                }))
            } finally {
                state.dispatch(uiSetLoading(false))
            }
        }

    }
}