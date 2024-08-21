
import { CategoryItem } from '@/types/category';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface CategorySlice {
    categories: CategoryItem[];
    categoriesSelected: {};
    newCategory: {};
}

const initialState: CategorySlice = {
    categories: [] as CategoryItem[],
    categoriesSelected: {},
    newCategory: {}
}

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        getCategories(state, action: PayloadAction<string>) {
            // middleware
        },
        setCategories(state, action: PayloadAction<CategoryItem[]>) {
            state.categories = action.payload;
        }
    }
});

export const { 
    getCategories,
    setCategories
} = categorySlice.actions;

export default categorySlice.reducer;
