'use server'

import { CategoriesHomeResponse, DataCategoriesHomeResponse } from "@/types/categoriesHome"
import { fetchDataServer } from "@/services/fetchDataServer"

export const getCategoriesFromDB = async (): Promise<DataCategoriesHomeResponse> => {
    let categories:DataCategoriesHomeResponse = { items: [], meta: {} as any } as DataCategoriesHomeResponse
    try {
        const searchResponse: CategoriesHomeResponse = await fetchDataServer(
            `/home-template/commons-products/categories`,
            "GET",
            null,
            ''
        )
        categories = searchResponse.data
    } catch (error: any) {
        console.error('[getCategoriesFromDB] Error:', error.message || error)
    }
    return categories;
}
