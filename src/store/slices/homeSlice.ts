import { HomeState } from "@/types/home";
import { DataHomeProductsSearchResponse, ItemHomeProductsSearchResponse, MetaHomeProductsSearchResponse } from "@/types/homeResponse";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState:HomeState = {
    homeProducts: [],
    homeActiveProduct: null,
    productMeta: {} as MetaHomeProductsSearchResponse
}



const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        getHomeProducts(state, action: PayloadAction<string>) {},

        setHomeProducts(state, action: PayloadAction<DataHomeProductsSearchResponse>) {
            state.homeProducts = action.payload.items;
            state.productMeta = action.payload.meta;
        },

        getHomeProduct(state, action: PayloadAction) {},

        setHomeActiveProduct(state, action: PayloadAction) {},
    }
})


export const {
    getHomeProducts,
    setHomeProducts,
    getHomeProduct,
    setHomeActiveProduct,
} = homeSlice.actions

export default homeSlice.reducer;