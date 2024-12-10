
import { CardProduct } from "./CardProduct"
import { ItemHomeProductsSearchResponse } from "@/types/homeResponse"

interface Props {
    homeProd: ItemHomeProductsSearchResponse[];
    numberColumns?: number;
}

export const ProductsList = ({ homeProd, numberColumns = 4 }: Props) => {

    const cols = `lg:grid-cols-${numberColumns}`

    return (
        <div className="w-full max-w-2xl sm:px-6 lg:max-w-7xl">
            <div className={`grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 ${cols} xl:gap-x-8`}>
                {homeProd.map(item => <CardProduct key={item.id} itemProduct={item} />)}
            </div>
        </div>
    )
}
