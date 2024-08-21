import { decryptLoginData } from "@/helpers";
import { fetchData } from "@/services/fetchData";
import { Dispatch, MiddlewareAPI } from "@reduxjs/toolkit";
import { uiSetLoading } from "../uiSlice";
import { SearchCategoriesResponse } from "@/types/category";
import { setCategories } from "../categorySlice";

export const manageCategoryMiddleware = (state: MiddlewareAPI) => {
    return (next: Dispatch) => async (action: any) => {
        next(action);


        if(action.type === 'category/getCategories') {
            state.dispatch(uiSetLoading(true))
            const userData: any = decryptLoginData()
            const token: string = userData.data.access.accessToken
            const query: string = action.payload
            try {
                console.log('Llamada a la Api - MANAGE-CATEGORIES - SEARCH CATEGORIES')
                const response: SearchCategoriesResponse = await fetchData(`/manage-auction-products/admin/categories/${query}`,"GET", null, token)
                const categories = response.data.items
                state.dispatch(setCategories(categories))
                state.dispatch(uiSetLoading(false))
            } catch (error) {
                state.dispatch(uiSetLoading(false))
            }
        }



    }
}