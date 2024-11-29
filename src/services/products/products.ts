import { DataHomeProductsSearchResponse, HomeProductsSearchResponse } from "@/types/homeResponse"
import { fetchData } from "../fetchData"
import Swal from "sweetalert2"

export const getProductsFromDB = async (query:string): Promise<DataHomeProductsSearchResponse> => {
    let products:DataHomeProductsSearchResponse = { items: [], meta: {} as any } as DataHomeProductsSearchResponse
    try {
        const searchResponse: HomeProductsSearchResponse = await fetchData(
            `/home-template/commons-products/${query}`,
            "GET",
            null,
            ''
        )
        products = searchResponse.data
    } catch (error: any) {
        Swal.fire('Error al cargar productos','No fue posible cargar los productos desde la base de datos | ' + error, 'error')
    }
    return products;
}