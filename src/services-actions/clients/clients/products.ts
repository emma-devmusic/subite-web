'use server'

import Swal from "sweetalert2"
import { fetchData } from "@/services/fetchData"
import { DataProductSearchIDResponse, DataProductSearchResponse, ProductSearchIDResponse, ProductSearchResponse } from "@/types/products"

export interface SearchParams {
    page: number;
    limit: number;
    categories_id: string;
    sub_categories_id: string;
    term: string;
    max_price: number | string,
    min_price: number | string,
    product_audit_statuses: number | string,
    with_auction: 'FINISHED' | 'NOT_STARTED' | 'ACTIVE'
}


// export class ProductsService {


//     public async getProductsFromDB(query: string): Promise<DataProductSearchResponse> {
//         let products: DataProductSearchResponse = { items: [], meta: {} as any } as DataProductSearchResponse
//         try {
//             const searchResponse: ProductSearchResponse = await fetchData(
//                 `/manage-auction-products/clients/search?${query}`,
//                 "GET",
//                 null,
//                 ''
//             )
//             products = searchResponse.data
//         } catch (error: any) {
//             Swal.fire('Error al cargar productos', 'No fue posible cargar los productos desde la base de datos | ' + error, 'error')
//         }
//         return products;
//     }

//     public async getProductById(id: string | number): Promise<DataProductSearchIDResponse> {
//         let product: DataProductSearchIDResponse = {} as DataProductSearchIDResponse
//         try {
//             const searchResponse: ProductSearchIDResponse = await fetchData(
//                 `/home-template/commons-products/search/${id}`,
//                 "GET",
//                 null,
//                 ''
//             )
//             product = searchResponse.data
//         } catch (error: any) {
//             Swal.fire('Error al cargar productos', 'No fue posible cargar los productos desde la base de datos | ' + error, 'error')
//         }
//         return product;
//     }

//     public async getProductByPage(page: number): Promise<DataProductSearchResponse> {
//         let products: DataProductSearchResponse = { items: [], meta: {} as any } as DataProductSearchResponse

//         if (page === undefined || page < 1) {
//             page = 1
//         }
//         try {
//             const searchResponse: ProductSearchResponse = await fetchData(
//                 `/home-template/commons-products/search?page=${page}&limit=8`,
//                 "GET",
//                 null,
//                 ''
//             )
//             products = searchResponse.data
//         } catch (error: any) {
//             Swal.fire('Error al cargar productos', 'No fue posible cargar los productos desde la base de datos | ' + error, 'error')
//         }
//         return products;
//     }

//     public async getProductBySearchParams(searchParams: SearchParams): Promise<DataProductSearchResponse> {
//         let products: DataProductSearchResponse = { items: [], meta: {} as any } as DataProductSearchResponse

//         if (searchParams.page === undefined || searchParams.page < 1) {
//             searchParams.page = 1
//         }

//         const newUrl = new URLSearchParams()
//         for (let param in searchParams) {
//             if (param === 'limit' && searchParams.limit > 20) {
//                 //@ts-ignore
//                 newUrl.append(param, 20)
//             } else {
//                 //@ts-ignore
//                 newUrl.append(param, searchParams[param])

//             }
//         }
//         try {
//             const searchResponse: ProductSearchResponse = await fetchData(
//                 `/home-template/commons-products/search?${newUrl.toString()}`,
//                 "GET",
//                 null,
//                 ''
//             )
//             products = searchResponse.data
//         } catch (error: any) {
//             Swal.fire('Error al cargar productos', 'No fue posible cargar los productos desde la base de datos | ' + error, 'error')
//         }
//         return products;
//     }
// }







// export const getProductsFromDB = async (query: string): Promise<DataProductSearchResponse> => {
//     let products: DataProductSearchResponse = { items: [], meta: {} as any } as DataProductSearchResponse
//     try {
//         const searchResponse: ProductSearchResponse = await fetchData(
//             `/home-template/commons-products/${query}`,
//             "GET",
//             null,
//             ''
//         )
//         products = searchResponse.data
//     } catch (error: any) {
//         Swal.fire('Error al cargar productos', 'No fue posible cargar los productos desde la base de datos | ' + error, 'error')
//     }
//     return products;
// }


export const getProductById = async (id: string | number): Promise<DataProductSearchIDResponse> => {
    let product: DataProductSearchIDResponse = {} as DataProductSearchIDResponse
    try {
        const searchResponse: ProductSearchIDResponse = await fetchData(
            `/home-template/commons-products/search/${id}`,
            "GET",
            null,
            ''
        )
        product = searchResponse.data
    } catch (error: any) {
        Swal.fire('Error al cargar productos', 'No fue posible cargar los productos desde la base de datos | ' + error, 'error')
    }
    return product;
}


// export const getProductByPage = async (page: number): Promise<DataProductSearchResponse> => {
//     let products: DataProductSearchResponse = { items: [], meta: {} as any } as DataProductSearchResponse

//     if (page === undefined || page < 1) {
//         page = 1
//     }
//     try {
//         const searchResponse: ProductSearchResponse = await fetchData(
//             `/home-template/commons-products/search?page=${page}&limit=8`,
//             "GET",
//             null,
//             ''
//         )
//         products = searchResponse.data
//     } catch (error: any) {
//         Swal.fire('Error al cargar productos', 'No fue posible cargar los productos desde la base de datos | ' + error, 'error')
//     }
//     return products;
// }



export const getProductBySearchParams = async (searchParams: SearchParams): Promise<DataProductSearchResponse> => {

    let products: DataProductSearchResponse = { items: [], meta: {} as any } as DataProductSearchResponse

    if (searchParams.page === undefined || searchParams.page < 1) {
        searchParams.page = 1
    }


    const newUrl = new URLSearchParams()
    for (let param in searchParams) {
        if (param === 'limit' && searchParams.limit > 20) {
            //@ts-ignore
            newUrl.append(param, 20)
        } else {
            //@ts-ignore
            newUrl.append(param, searchParams[param])

        }
    }
    try {
        /**
         * ==================================================================================
         *  CAMBIAR URL DE PETICION PARA LOS PRODUCTOS EN CLIENTES
         * ==================================================================================
        */
        const searchResponse: ProductSearchResponse = await fetchData(
            `/home-template/commons-products/search?${newUrl.toString()}`,
            "GET",
            null,
            ''
        )
        products = searchResponse.data
        console.log(products);
    } catch (error: any) {
        Swal.fire('Error al cargar productos', 'No fue posible cargar los productos desde la base de datos | ' + error, 'error')
    }
    return products;
}
