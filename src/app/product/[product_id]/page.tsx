
import { league_spartan } from '@/app/layout';
import { ProductDetails } from './modules/ProductDetails';
import { AuctionDetails } from './modules/auctionDetails/AuctionDetails';
import * as apiProducts from '@/services/products';
import { AuctionCounter } from './modules/AuctionCounter';
import { OffersCard } from './modules/auctionDetails/OffersCard';
import { ChargesCommissions } from './modules/auctionDetails/ChargesCommissions';
import { ImageProduct } from './modules/imageProduct/ImageProduct';


interface Props {
    params: { product_id: string };
}


export default async function ProductHomePage({ params }: Props) {

    const product = (await apiProducts.getProductById(params.product_id))
    const specific_prod = product.product_variations[0]
    const auction = product.products_acutions.find(s => !s.data_deleted)

    return (
        <div className='container-auction'>
            <div>
                <h1 className={`${league_spartan.className} text-3xl sm:text-5xl text-secondary font-bold`}>{product.name}</h1>
            </div>
            <hr />

            <ImageProduct productImages={specific_prod.productImages} />

            <hr />
            <div>
                {auction && <AuctionCounter auction={auction} />}
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                <div className='sm:col-span-1 lg:col-span-2'>
                    <ProductDetails description={specific_prod.description} />
                </div>
                <div className='sm:col-span-1 lg:col-span-1 flex flex-col gap-4'>
                    <OffersCard product={product} />
                    <AuctionDetails product={product} />
                    <ChargesCommissions price={Number(specific_prod.price)} />
                </div>
            </div>
        </div>
    );
}