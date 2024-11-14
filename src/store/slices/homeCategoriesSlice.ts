import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState = {
    homeCategories: [],
    homeCategorySelected: {},
    homeSubcategorySelected: {}
}



const homeCategories = createSlice({
    name: 'homeCategories',
    initialState,
    reducers: {
        // Add reducers here
        getHomeCategories(state, action: PayloadAction) {

        },
        setHomeCategories(state, action: PayloadAction) {

        },
        selectHomeCategory(state, action: PayloadAction) {

        },
        selectHomeSubcategory(state, action: PayloadAction) {
            
        }
    }
})


export const {
    getHomeCategories,
} = homeCategories.actions

export default homeCategories.reducer;