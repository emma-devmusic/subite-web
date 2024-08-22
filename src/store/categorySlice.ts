
import { CategoryItem } from '@/types/category';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface CategorySlice {
    categories: CategoryItem[];
    categoriesSelected: {
        id?: number;
        name: string;
        description: string;
        category_id?: number | string;
        isSubcategory?: boolean;
    };
    newCategory: {};
    filterInPage: CategoryItem[]
}

const initialState: CategorySlice = {
    categories: [] as CategoryItem[],
    categoriesSelected: {
        name: '',
        description: '',
        category_id: ''
    },
    newCategory: {},
    filterInPage: []
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
        },
        newCategory(state, action: PayloadAction<{ name: string; description: string; }>) {
            //middleware
        },
        newSubcategory(state, action: PayloadAction<{ name: string; description: string; category_id: number; }>) {
            //middleware
        },
        selectEditCategory(state, action: PayloadAction<{ name: string; description: string; category_id?: number; isSubcategory?: boolean }>) {
            state.categoriesSelected = action.payload
        },
        cleanSelectCategories(state) {
            state.categoriesSelected = initialState.categoriesSelected;
        },
        updateCategory(state, action: PayloadAction<{ id: number; name: string; description: string; }>) {
            //middleware
        },
        updateSubcategory(state, action: PayloadAction<{ id: number; name: string; description: string; }>) {
            //middleware
        },
        deleteCategory(state, action: PayloadAction<number>) {
            //middleware
        },
        deleteSubcategory(state, action: PayloadAction<number>) {
            //middleware
        },
        filterInPage(state, action: PayloadAction<{term: string}>) {
            let result:CategoryItem[] = []
            state.categories.forEach(
                (category) => {
                    if (category.name.toLowerCase().includes(action.payload.term.toLowerCase())) {
                        result.push(category)
                    }
                }
            )
            state.filterInPage = result
        }
    }
});

export const {
    getCategories,
    setCategories,
    newCategory,
    newSubcategory,
    selectEditCategory,
    cleanSelectCategories,
    updateCategory,
    updateSubcategory,
    deleteCategory,
    deleteSubcategory,
    filterInPage
} = categorySlice.actions;

export default categorySlice.reducer;
