
import { ImageProduct, ItemProductSearchResponse, NewProductInterface } from '@/types/products';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ProductState {
    products: ItemProductSearchResponse[];
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
        getProducts(state, action: PayloadAction<string>) {
            // middleware
        },
        setProducts(state, action: PayloadAction<ItemProductSearchResponse[]>) {
            state.products = action.payload
        },
        setImagesNewProduct(state, action: PayloadAction<ImageProduct>) {
            state.imagesNewProduct = [
                ...state.imagesNewProduct,
                action.payload
            ];
        },
        newProductSubmit(state, action: PayloadAction<NewProductInterface>) {
            //middleware
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
    getProducts,
    setProducts,
    setImagesNewProduct,
    newProductSubmit,
    deleteImagesFromS3,
    deleteImageNewProduct
} = productSlice.actions;

export default productSlice.reducer;
