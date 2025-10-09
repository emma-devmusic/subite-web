export const revalidate = 0 // Deshabilitamos el cache para subastas en tiempo real

import { getProductBySearchParams, SearchParams } from '@/services-actions/home/products'
import { ProductsList } from '@/components/cards'
import { HandleHomeProductsPage } from '@/components/handleHomeProductsPage/HandleHomeProductsPage';

interface Props {
    searchParams: SearchParams;
    numberColumns: number;
}
const AuctionsSection = async ({ searchParams }: Props) => {

    const homeProd = (await getProductBySearchParams(searchParams))
    return (
        <div className="w-full max-w-2xl sm:px-6 lg:max-w-7xl">
            <div className='flex flex-col gap-8'>
                <ProductsList homeProd={homeProd.items} cols={'lg:grid-cols-3'} />
                <HandleHomeProductsPage searchParams={searchParams} meta={homeProd.meta} elementsLength={homeProd.items.length} />
            </div>
        </div>
    )

}

export default AuctionsSection