
import { deleteImageFromSW3 } from '@/helpers/imageProductManager';
import { ImageProduct } from '@/types/products';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';

interface ProductState {
    products: [];
    imagesNewProduct: ImageProduct[];
}

const initialState:ProductState = {
    products: [],
    imagesNewProduct: [],
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setImagesNewProduct(state, action: PayloadAction<ImageProduct>) {
            state.imagesNewProduct = [
                ...state.imagesNewProduct,
                action.payload
            ];
        },
        deleteImagesFromS3(state) {
            // Middleware para borrar imágenes de S3 antes de eliminarlos de la base de datos
        },
        deleteImageNewProduct(state, action: PayloadAction<ImageProduct>) {
            console.log(action.payload);
            state.imagesNewProduct = state.imagesNewProduct.filter( image => image.url_image !== action.payload.url_image);
        }
    }
});

export const {
    setImagesNewProduct,
    deleteImagesFromS3,
    deleteImageNewProduct
} = productSlice.actions;

export default productSlice.reducer;
