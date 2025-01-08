'use server'

import Swal from "sweetalert2"
import { DataHomeProductsSearchResponse, HomeProductsSearchResponse } from "@/types/homeResponse"
import { DataHomeProductResponse, HomeProductResponse } from "@/types/homeProductResponse"
import { fetchData } from "@/services/fetchData"

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

export const getProductsFromDB = async (query: string): Promise<DataHomeProductsSearchResponse> => {
    let products: DataHomeProductsSearchResponse = { items: [], meta: {} as any } as DataHomeProductsSearchResponse
    try {
        const searchResponse: HomeProductsSearchResponse = await fetchData(
            `/home-template/commons-products/${query}`,
            "GET",
            null,
            ''
        )
        products = searchResponse.data
    } catch (error: any) {
        Swal.fire('Error al cargar productos', 'No fue posible cargar los productos desde la base de datos | ' + error, 'error')
    }
    return products;
}


export const getProductById = async (id: string | number): Promise<DataHomeProductResponse> => {
    let product: DataHomeProductResponse = {} as DataHomeProductResponse
    try {
        const searchResponse: HomeProductResponse = await fetchData(
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


export const getProductByPage = async (page: number): Promise<DataHomeProductsSearchResponse> => {
    let products: DataHomeProductsSearchResponse = { items: [], meta: {} as any } as DataHomeProductsSearchResponse

    if (page === undefined || page < 1) {
        page = 1
    }
    try {
        const searchResponse: HomeProductsSearchResponse = await fetchData(
            `/home-template/commons-products/search?page=${page}&limit=8`,
            "GET",
            null,
            ''
        )
        products = searchResponse.data
    } catch (error: any) {
        Swal.fire('Error al cargar productos', 'No fue posible cargar los productos desde la base de datos | ' + error, 'error')
    }
    return products;
}



export const getProductBySearchParams = async (searchParams: SearchParams): Promise<DataHomeProductsSearchResponse> => {

    let products: DataHomeProductsSearchResponse = { items: [], meta: {} as any } as DataHomeProductsSearchResponse
    if (searchParams.page === undefined || searchParams.page < 1) {
        searchParams.page = 1
    }

    const newUrl = new URLSearchParams()
    for (let param in searchParams) {
        if(param === 'limit' && searchParams.limit > 20) {
            //@ts-ignore
            newUrl.append(param, 20)
        } else {
            //@ts-ignore
            newUrl.append(param, searchParams[param])

        }
    }

    try {
        const searchResponse: HomeProductsSearchResponse = await fetchData(
            `/home-template/commons-products/search?${newUrl.toString()}`,
            "GET",
            null,
            ''
        )
        products = searchResponse.data
    } catch (error: any) {
        Swal.fire('Error al cargar productos', 'No fue posible cargar los productos desde la base de datos | ' + error, 'error')
    }
    return products;
}
