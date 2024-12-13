
import { getProductBySearchParams, SearchParams } from '@/actions/products'
import { ProductsList } from '@/components/cards'

interface Props {
    searchParams: SearchParams;
    numberColumns: number;
}
const AuctionsSection = async ({ searchParams }: Props) => {

    const homeProd = (await getProductBySearchParams(searchParams)).items
    return <ProductsList homeProd={homeProd} cols={'lg:grid-cols-3'}/>
}

export  default AuctionsSection