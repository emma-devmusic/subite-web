import { CategoriesHomeState } from "@/types";
import { ItemDataCategoriesHomeResponse } from "@/types/categoriesHome";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState:CategoriesHomeState = {
    homeCategories: [],
    homeCategorySelected: {} as ItemDataCategoriesHomeResponse,
    homeSubcategorySelected: {} as ItemDataCategoriesHomeResponse,
}



const homeCategories = createSlice({
    name: 'homeCategories',
    initialState,
    reducers: {
        getHomeCategories(state, action: PayloadAction) {},
        setHomeCategories(state, action: PayloadAction<ItemDataCategoriesHomeResponse[]>) {
            state.homeCategories = action.payload;
        },
        selectHomeCategory(state, action: PayloadAction<ItemDataCategoriesHomeResponse>) {
            state.homeCategorySelected = action.payload;
        },
        selectHomeSubcategory(state, action: PayloadAction<ItemDataCategoriesHomeResponse>) {
            state.homeSubcategorySelected = action.payload;
        }
    }
})


export const {
    getHomeCategories,
    setHomeCategories,
    selectHomeCategory,
    selectHomeSubcategory
} = homeCategories.actions

export default homeCategories.reducer;