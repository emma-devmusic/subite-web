import Swal from "sweetalert2"
import { CategoriesHomeResponse, DataCategoriesHomeResponse } from "@/types/categoriesHome"
import { fetchData } from "../fetchData"

export const getCategoriesFromDB = async (): Promise<DataCategoriesHomeResponse> => {
    let categories:DataCategoriesHomeResponse = { items: [], meta: {} as any } as DataCategoriesHomeResponse
    try {
        const searchResponse: CategoriesHomeResponse = await fetchData(
            `/home-template/commons-products/categories`,
            "GET",
            null,
            ''
        )
        categories = searchResponse.data
    } catch (error: any) {
        Swal.fire('Error al cargar productos','No fue posible cargar los productos desde la base de datos | ' + error, 'error')
    }
    return categories;
}
