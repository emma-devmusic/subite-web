'use server'
import { DataHomeProductsSearchResponse, HomeProductsSearchResponse } from "@/types/homeResponse"
import Swal from "sweetalert2"
import { DataHomeProductResponse, HomeProductResponse } from "@/types/homeProductResponse"
import { fetchData } from "@/services/fetchData"

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

    if(page === undefined || page < 1) {
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


interface SearchParams {
    page: number;
    limit: number;
    category_id: string;
    subcategory_id: string;
    term: string;
}

export const getProductBySearchParams = async (searchParams: SearchParams): Promise<DataHomeProductsSearchResponse> => {
    let products: DataHomeProductsSearchResponse = { items: [], meta: {} as any } as DataHomeProductsSearchResponse

    if(searchParams.page === undefined || searchParams.page < 1) {
        searchParams.page = 1
    }
    try {
        const searchResponse: HomeProductsSearchResponse = await fetchData(
            `/home-template/commons-products/search?page=${searchParams.page}&limit=8&term=${searchParams.term}`,
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

