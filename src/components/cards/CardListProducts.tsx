import { CardProduct } from "./CardProduct"

export const CardListProducts = () => {

    const arrayProdcuts = [0,1,2,3,4,5,6,7]

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>
                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {
                        arrayProdcuts.map( p => <CardProduct key={p} productNumber={ (p + 1 > 4) ?  1 : p + 1} /> )
                    }
                </div>
            </div>
        </div>
    )
}
