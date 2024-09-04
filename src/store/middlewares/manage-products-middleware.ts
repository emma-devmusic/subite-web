import Swal from "sweetalert2";
import { Dispatch, MiddlewareAPI } from "@reduxjs/toolkit";
import { uiCloseModal, uiModal, uiSetLoading } from "../uiSlice";
import { RootState } from "..";
import { deleteImageFromSW3 } from "@/helpers/imageProductManager";
import { deleteImageNewProduct, setProducts } from "../productSlice";
import { fetchData } from "@/services/fetchData";
import DecryptedSession from "@/helpers/Permissions";
import { ProductSearchResponse } from "@/types/products";
import { path_role } from "@/helpers";

export const manageProductMiddleware = (state: MiddlewareAPI) => {
    return (next: Dispatch) => async (action: any) => {
        next(action);


        const userData = new DecryptedSession()
        const token = userData.getAccessToken()
        const role_id = userData.getRoleId()


        if(action.type === 'product/getProducts') {
            state.dispatch(uiSetLoading(true))
            try {
                console.log('Llamada a la Api - MANAGE-PRODUCT - GET PRODUCTS')
                const searchResponse: ProductSearchResponse = await fetchData(
                    `/manage-auction-products/${ path_role(role_id) }/${action.payload}`,
                    "GET",
                    null,
                    token
                )
                state.dispatch( setProducts(searchResponse.data.items))
            } catch (error: any) {
                state.dispatch(uiModal({
                    modalFor: 'message',
                    modalOpen: true,
                    typeMsg: 'error',
                    msg: `${error.code}`
                }))
            }
            state.dispatch(uiSetLoading(false))
        }


        if (action.type === 'product/newProductSubmit') {
            state.dispatch(uiSetLoading(true))
            try {
                console.log('Llamada a la Api - MANAGE-PRODUCT - NEW PRODUCT')
                await fetchData(
                    `/manage-auction-products/${ path_role(role_id) }/create`,
                    "POST",
                    action.payload,
                    token
                )
                state.dispatch(uiModal({
                    modalFor: 'message',
                    modalOpen: true,
                    typeMsg: 'success',
                    msg: 'Producto creado correctamente'
                }))
                location.reload()
            } catch (error: any) {
                state.dispatch(uiModal({
                    modalFor: 'message',
                    modalOpen: true,
                    typeMsg: 'error',
                    msg: `${error.code}`
                }))
            }
            state.dispatch(uiSetLoading(false))
        }



        if (action.type === 'product/deleteImagesFromS3') {
            state.dispatch(uiModal({
                modalTitle: 'Borrando Imagenes',
                modalFor: 'loading',
                modalOpen: true,
            }))
            const { product } = state.getState() as RootState
            product.imagesNewProduct.forEach(async (image: any, i) => {
                try {
                    await deleteImageFromSW3(image.url_image)
                    state.dispatch(deleteImageNewProduct(image))
                    if (product.imagesNewProduct.length - 1 === i) {
                        state.dispatch(uiCloseModal())
                    }
                } catch (error) {
                    Swal.fire('Error', 'Error al eliminar las imágenes.', 'error');
                    throw new Error;
                }
            })
        }

    }
}