
import { ImageProduct, ItemProductSearchResponse, NewProductInterface } from '@/types/products';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ProductState {
    products: ItemProductSearchResponse[];
    imagesNewProduct: ImageProduct[];
    productSelected: ItemProductSearchResponse
}

const initialState:ProductState = {
    products: [],
    productSelected: {} as ItemProductSearchResponse,
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

        selectProduct(state, action: PayloadAction<ItemProductSearchResponse>) {
            state.productSelected = action.payload
            const productSelectedImages = action.payload.product_variations[0].productImages;
            const images: ImageProduct[] = productSelectedImages.map( img => ({
                name: img.name,
                description: img.description,
                url_image: img.url_image,
            }))
            state.imagesNewProduct = images
        },

        clearSelectedProduct(state) {
            state.productSelected = {} as ItemProductSearchResponse
            state.imagesNewProduct = []
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
            state.imagesNewProduct = state.imagesNewProduct.filter( image => image.url_image !== action.payload.url_image);
        },

    }
});

export const {
    getProducts,
    setProducts,
    setImagesNewProduct,
    clearSelectedProduct,
    newProductSubmit,
    deleteImagesFromS3,
    deleteImageNewProduct,
    selectProduct
} = productSlice.actions;

export default productSlice.reducer;
