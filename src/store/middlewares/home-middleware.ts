import { Dispatch, MiddlewareAPI } from "@reduxjs/toolkit";
import { uiModal, uiSetLoading } from "../slices/uiSlice";
import { fetchData } from "@/services/fetchData";
import { HomeProductsSearchResponse } from "@/types/homeResponse";
import { setHomeProducts } from "../slices/homeSlice";

export const homeMiddleware = (state: MiddlewareAPI) => {
    return (next: Dispatch) => async (action: any) => {

        next(action);

        if (action.type === 'home/getHomeProducts') {
            state.dispatch(uiSetLoading(true))
            try {
                console.log('Llamada a la Api - HOME - GET PRODUCTS')
                const searchResponse: HomeProductsSearchResponse = await fetchData(
                    `/home-template/commons-products/${action.payload}`,
                    "GET",
                    null,
                    ''
                )
                state.dispatch(setHomeProducts(searchResponse.data))
                state.dispatch(uiSetLoading(false))
            } catch (error: any) {
                state.dispatch(uiModal({
                    modalFor: 'message',
                    modalOpen: true,
                    typeMsg: 'error',
                    msg: `${error.code || error}`
                }))
                state.dispatch(uiSetLoading(false))
            }
        }


    }
}