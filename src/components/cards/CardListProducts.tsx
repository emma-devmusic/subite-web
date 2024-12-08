
import { CardProduct } from "./CardProduct"
import { ItemHomeProductsSearchResponse } from "@/types/homeResponse"

interface Props {
    homeProd: ItemHomeProductsSearchResponse[]
}

export const ProductsList = ({ homeProd }: Props) => {

    return (
        <div className="max-w-2xl sm:px-6 lg:max-w-7xl">
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {homeProd.map(item => <CardProduct key={item.id} itemProduct={item} />)}
            </div>
        </div>
    )
}
