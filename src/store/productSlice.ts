
import { DataProductAuditsStatuses } from '@/types';
import { ImageProduct, ImageUpdatingProduct, ItemProductSearchResponse, NewProductInterface, UpdateProductInterface } from '@/types/products';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ProductAuditsStatuses } from '../types/dataFetching';

interface ProductState {
    products: ItemProductSearchResponse[];
    imagesNewProduct: ImageProduct[];
    productSelected: ItemProductSearchResponse;
    productAuditsStatuses: DataProductAuditsStatuses[]
}

const initialState: ProductState = {
    products: [],
    productSelected: {} as ItemProductSearchResponse,
    imagesNewProduct: [],
    productAuditsStatuses: []
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        getProducts(state, action: PayloadAction<string>) {},

        getProductById(state, action: PayloadAction<string>) {},

        setProducts(state, action: PayloadAction<ItemProductSearchResponse[]>) {
            state.products = action.payload
        },

        selectProduct(state, action: PayloadAction<ItemProductSearchResponse>) {
            state.productSelected = action.payload
            const productSelectedImages = action.payload.product_variations[0].productImages;
            const images: ImageProduct[] = productSelectedImages.map(img => ({
                name: img.name,
                description: img.description,
                url_image: img.url_image,
                id: img.id
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

        selectingImagesNewProduct(state, action: PayloadAction<{ url: string }>) {
            state.imagesNewProduct = state.imagesNewProduct.map(img => (
                (img.url_image === action.payload.url)
                    ? { ...img, main_image: true }
                    : { ...img, main_image: false }
            )
            )
        },

        updateProduct(state, action: PayloadAction<UpdateProductInterface>) {},

        newProductSubmit(state, action: PayloadAction<NewProductInterface>) {},

        deleteProductFromDB(state, action: PayloadAction<{ id: string }>) {},

        deleteProduct(state, action: PayloadAction<{ id: number }>) {
            state.products = state.products.filter(p => p.id === action.payload.id)
        },

        deleteImagesFromS3() {},

        deleteImageNewProduct(state, action: PayloadAction<ImageProduct>) {
            state.imagesNewProduct = state.imagesNewProduct.filter(image => image.url_image !== action.payload.url_image);
        },

        getProductAuditsStatuses() {},

        setProductAuditsStatuses(state, action: PayloadAction<DataProductAuditsStatuses[]>) {
            state.productAuditsStatuses = action.payload;
        },

        cleanProducts(state) {
            state.products = [];
            state.productSelected = {} as ItemProductSearchResponse;
            state.imagesNewProduct = [];
            state.productAuditsStatuses = [];
        },

        setStatusProduct(state, action: PayloadAction<{
            product_id: number,
            audit_status_id: number,
            status_note: string
        }>) {}
    }
});

export const {
    getProductAuditsStatuses,
    getProducts,
    getProductById,
    setProductAuditsStatuses,
    setProducts,
    setStatusProduct,
    setImagesNewProduct,
    cleanProducts,
    clearSelectedProduct,
    newProductSubmit,
    updateProduct,
    deleteImagesFromS3,
    deleteImageNewProduct,
    selectProduct,
    selectingImagesNewProduct
} = productSlice.actions;

export default productSlice.reducer;
