
import { CardProduct } from "./CardProduct"
import { ItemHomeProductsSearchResponse } from "@/types/homeResponse"

interface Props {
    homeProd: ItemHomeProductsSearchResponse[];
    cols?: 'lg:grid-cols-4' | 'lg:grid-cols-3';
}

export const ProductsList = ({ homeProd, cols = `lg:grid-cols-4` }: Props) => {

    return (
        <div className="w-full max-w-2xl sm:px-6 lg:max-w-7xl">
            <div className={`grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 ${cols} xl:gap-x-8`}>
                {homeProd.map(item => <CardProduct key={item.id} itemProduct={item} />)}
            </div>
        </div>
    )
}
