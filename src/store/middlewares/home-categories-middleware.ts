import { Dispatch, MiddlewareAPI } from "@reduxjs/toolkit";
import { uiModal, uiSetLoading } from "../slices/uiSlice";
import { fetchData } from "@/services/fetchData";
import { HomeCategoriesResponse } from "@/types/homeCategoriesResponse";
import { setHomeCategories } from "../slices/homeCategoriesSlice";

export const homeCategoriesMiddleware = (state: MiddlewareAPI) => {
    return (next: Dispatch) => async (action: any) => {

        next(action);

        if (action.type === 'home/getHomeCategories') {
            state.dispatch(uiSetLoading(true))
            try {
                console.log('Llamada a la Api - HOME - GET CATEGORIES')
                const categoriesResponse: HomeCategoriesResponse = await fetchData(
                    `/home-template/commons-products/categories`,
                    "GET",
                    null,
                    ''
                )
                state.dispatch(setHomeCategories(categoriesResponse.data.items))
                state.dispatch(uiSetLoading(false))
            } catch (error: any) {
                state.dispatch(uiModal({
                    modalFor: 'message',
                    modalOpen: true,
                    typeMsg: 'error',
                    msg: `${error.code}`
                }))
                state.dispatch(uiSetLoading(false))
            }
        }


    }
}