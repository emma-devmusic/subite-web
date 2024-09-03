import Swal from "sweetalert2";
import { Dispatch, MiddlewareAPI } from "@reduxjs/toolkit";
import { uiCloseModal, uiModal, uiSetLoading } from "../uiSlice";
import { RootState } from "..";
import { deleteImageFromSW3 } from "@/helpers/imageProductManager";
import { deleteImageNewProduct } from "../productSlice";

export const manageProductMiddleware = (state: MiddlewareAPI) => {
    return (next: Dispatch) => async (action: any) => {
        next(action);

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