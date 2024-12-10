import dayjs from "dayjs"
import Image from "next/image"
import { ItemHomeProductsSearchResponse } from "@/types/homeResponse"
import { CounterCardProduct } from "../dayCounter/CounterCardProduct"
// import { league_spartan } from "@/app/layout"
import { LinkProduct } from "./LinkProduct"


interface Props {
    itemProduct: ItemHomeProductsSearchResponse
}


export const CardProduct = ({ itemProduct }: Props) => {

    const auction = itemProduct.products_acutions.find(s => !s.data_deleted)

    return (
        <div className="group relative rounded-lg shadow bg-white overflow-hidden">
            <div className="relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80 relative transition-all">
                    <Image width={300} height={300} src={itemProduct.product_variations[0].productImages[0].url_image} alt="Front of men&#039;s Basic Tee in black." className="h-full w-full object-cover object-center lg:h-full lg:w-full" />
                </div>
                <CounterCardProduct itemProduct={itemProduct} />
            </div>
            <div className="p-3">
                <div>
                    <h3 className={` font-semibold text-xl text-gray-700 mb-3 mt-1`}>
                        {itemProduct.name}
                    </h3>
                    <p className="m-0 mt-2 text-sm text-gray-500">Precio inicial: <strong>${itemProduct.product_variations[0].price}</strong></p>
                    <p className="m-0 mt-2 text-sm text-gray-500">Puja mínima: <strong>${auction?.bid_amount}</strong></p>
                    <p className="m-0 mt-2 text-sm text-gray-500">Fecha de inicio: <span>{dayjs(auction?.init_date).format('DD/MM/YYYY')}</span></p>
                </div>
            </div>
            <LinkProduct product={itemProduct} />
        </div>
    )
}

