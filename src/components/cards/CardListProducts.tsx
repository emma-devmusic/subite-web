
import { CardProduct } from "./CardProduct"
import { ItemHomeProductsSearchResponse } from "@/types/homeResponse"

interface Props {
    homeProd: ItemHomeProductsSearchResponse[]
}

export const CardListProducts = async ({homeProd} : Props) => {

    return (
        <div className="">
            <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {homeProd.map( item => <CardProduct key={item.id} itemProduct={item} /> )}
                </div>
            </div>
        </div>
    )
}
