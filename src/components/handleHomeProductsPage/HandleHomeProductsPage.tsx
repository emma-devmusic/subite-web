'use client'
import { SearchParams } from "@/services-actions/home/products";
import { MetaHomeProductsSearchResponse } from "@/types/homeResponse";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface Props {
    searchParams: SearchParams;
    meta: MetaHomeProductsSearchResponse;
    elementsLength: number;
}

export const HandleHomeProductsPage = ({ searchParams, meta, elementsLength }: Props) => {

    const router = useRouter()
    const params = useSearchParams();
    const pathname = usePathname()

    const createQueryString = useCallback((name: string, value: string, forDelete?: string) => {
        const newUrl = new URLSearchParams(params.toString())
        if (forDelete) {
            newUrl.delete(forDelete)
        }
        newUrl.set(name, value)
        return newUrl.toString()
    }, [params])

    const handlePrev = () => {
        if (searchParams.page <= 1) return
        // searchParams.page = searchParams.page - 1
        router.push(pathname + '?' + createQueryString('page', `${Number(searchParams.page) - 1}`))
    }

    const handleNext = () => {
        if (searchParams.page >= meta.totalPages) return
        // searchParams.page = searchParams.page + 1
        router.push(pathname + '?' + createQueryString('page', `${Number(searchParams.page) + 1}`))
    }

    return (
        <div className="bg-white sm:flex items-center w-full sm:justify-between bottom-0 right-0 border-[1px] rounded-lg border-gray-200 p-4">
            <div className="flex items-center mb-4 sm:mb-0">
                <button
                    className="text-gray-500 hover:text-gray-900 cursor-pointer p-1 hover:bg-gray-100 rounded inline-flex justify-center"
                    onClick={handlePrev}
                >
                    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                </button>
                <button
                    className="text-gray-500 hover:text-gray-900 cursor-pointer p-1 hover:bg-gray-100 rounded inline-flex justify-center mr-2"
                    onClick={handleNext}
                >
                    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                </button>
                <p className="text-sm font-normal text-gray-500">Página <span className="text-gray-900 font-semibold">{meta.currentPage}</span> de <span className="text-gray-900 font-semibold">{meta.totalPages}</span></p>
            </div>
            <div>
                <span className="text-sm font-normal text-gray-500">Se muestran <span className="text-gray-900 font-semibold">{elementsLength}</span> elementos</span>
            </div>
        </div >
    )
}
