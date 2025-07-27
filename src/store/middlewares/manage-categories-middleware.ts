
import { fetchData } from "@/services/fetchData";
import { Dispatch, MiddlewareAPI } from "@reduxjs/toolkit";
import { uiModal, uiSetLoading } from "../slices/uiSlice";
import { NewCategoryResponse, SearchCategoriesResponse } from "@/types/category";
import { setCategories } from "../slices/categorySlice";
import SessionManager from "@/commons/Classes/SessionManager";

export const manageCategoryMiddleware = (state: MiddlewareAPI) => {
    const session = SessionManager.getInstance();

    return (next: Dispatch) => async (action: any) => {
        next(action);
        const token = session.getToken()
        if (action.type === 'category/getCategories') {
            state.dispatch(uiSetLoading(true))
            const query: string = action.payload
            try {
                console.log('Llamada a la Api - MANAGE-CATEGORIES - SEARCH CATEGORIES')
                const response: SearchCategoriesResponse = await fetchData(`/manage-auction-products/admin/categories/${query}`, "GET", null, token)
                const categories = response.data.items
                state.dispatch(setCategories(categories))
                state.dispatch(uiSetLoading(false))
            } catch (error: any) {
                state.dispatch(uiSetLoading(false))
                state.dispatch(uiModal({
                    modalFor: 'message',
                    modalOpen: true,
                    typeMsg: 'error',
                    msg: `${error.code}`
                }))
            }
        }



        if (action.type === 'category/newCategory') {
            state.dispatch(uiSetLoading(true))
            const dataBody = action.payload
            try {
                console.log('Llamada a la Api - MANAGE-CATEGORIES - NEW CATEGORY')
                const resp: NewCategoryResponse = await fetchData(`/manage-auction-products/admin/categories`, "POST", dataBody, token)

                state.dispatch(uiModal({
                    modalFor: 'message',
                    modalOpen: true,
                    typeMsg: 'success',
                    msg: 'Categoría creada correctamente'
                }))
                state.dispatch(uiSetLoading(false))
                location.reload()
            } catch (error: any) {
                state.dispatch(uiSetLoading(false))
                state.dispatch(uiModal({
                    modalFor: 'message',
                    modalOpen: true,
                    typeMsg: 'error',
                    msg: `${error.code}`
                }))
            }
        }



        if (action.type === 'category/newSubcategory') {
            state.dispatch(uiSetLoading(true))
            const dataBody = action.payload
            try {
                console.log('Llamada a la Api - MANAGE-CATEGORIES - NEW SUB-CATEGORY')
                await fetchData(`/manage-auction-products/admin/sub-categories`, "POST", dataBody, token)
                state.dispatch(uiModal({
                    modalFor: 'message',
                    modalOpen: true,
                    typeMsg: 'success',
                    msg: 'Subategoría creada correctamente'
                }))
                state.dispatch(uiSetLoading(false))
                location.reload()
            } catch (error: any) {
                state.dispatch(uiSetLoading(false))
                state.dispatch(uiModal({
                    modalFor: 'message',
                    modalOpen: true,
                    typeMsg: 'error',
                    msg: `${error.code}`
                }))
            }
        }


        if (action.type === 'category/updateCategory') {
            state.dispatch(uiSetLoading(true))
            const dataBody = { ...action.payload }
            delete dataBody.id
            try {
                console.log('Llamada a la Api - MANAGE-CATEGORIES - UPDATE CATEGORY')
                await fetchData(`/manage-auction-products/admin/categories/${action.payload.id}`, "PATCH", dataBody, token)
                state.dispatch(uiModal({
                    modalFor: 'message',
                    modalOpen: true,
                    typeMsg: 'success',
                    msg: 'Categoría actualizada correctamente'
                }))
                state.dispatch(uiSetLoading(false))
                location.reload()
            } catch (error: any) {
                state.dispatch(uiSetLoading(false))
                state.dispatch(uiModal({
                    modalFor: 'message',
                    modalOpen: true,
                    typeMsg: 'error',
                    msg: `${error.code}`
                }))
            }
        }


        if (action.type === 'category/updateSubcategory') {
            state.dispatch(uiSetLoading(true))
            const dataBody = { ...action.payload }
            delete dataBody.id
            try {
                console.log('Llamada a la Api - MANAGE-CATEGORIES - UPDATE SUB-CATEGORY')
                await fetchData(`/manage-auction-products/admin/sub-categories/${action.payload.id}`, "PATCH", dataBody, token)
                state.dispatch(uiModal({
                    modalFor: 'message',
                    modalOpen: true,
                    typeMsg: 'success',
                    msg: 'Subcategoría actualizada correctamente'
                }))
                state.dispatch(uiSetLoading(false))
                location.reload()

            } catch (error: any) {
                state.dispatch(uiSetLoading(false))
                state.dispatch(uiModal({
                    modalFor: 'message',
                    modalOpen: true,
                    typeMsg: 'error',
                    msg: `${error.code}`
                }))
            }
        }



        if (action.type === 'category/deleteCategory') {
            state.dispatch(uiSetLoading(true))
            try {
                console.log('Llamada a la Api - MANAGE-CATEGORIES - DELETE CATEGORY')
                await fetchData(`/manage-auction-products/admin/categories/${action.payload}`, "DELETE", null, token)
                console.log('hola')
                state.dispatch(uiModal({
                    modalFor: 'message',
                    modalOpen: true,
                    typeMsg: 'success',
                    msg: 'Categoría eliminada correctamente'
                }))
                state.dispatch(uiSetLoading(false))
                location.reload()
            } catch (error: any) {
                state.dispatch(uiSetLoading(false))
                state.dispatch(uiModal({
                    modalFor: 'message',
                    modalOpen: true,
                    typeMsg: 'error',
                    msg: `${error.code}`
                }))
            }
        }


        if (action.type === 'category/deleteSubcategory') {
            state.dispatch(uiSetLoading(true))
            try {
                console.log('Llamada a la Api - MANAGE-CATEGORIES - DELETE SUB-CATEGORY')
                await fetchData(`/manage-auction-products/admin/sub-categories/${action.payload}`, "DELETE", null, token)
                state.dispatch(uiModal({
                    modalFor: 'message',
                    modalOpen: true,
                    typeMsg: 'success',
                    msg: 'Subcategoría eliminada correctamente'
                }))
                state.dispatch(uiSetLoading(false))
                location.reload()
            } catch (error: any) {
                state.dispatch(uiSetLoading(false))
                state.dispatch(uiModal({
                    modalFor: 'message',
                    modalOpen: true,
                    typeMsg: 'error',
                    msg: `${error.code}`
                }))
            }
        }

    }
}