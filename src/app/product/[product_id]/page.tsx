
import { league_spartan } from '@/app/fonts';
import { ProductDetails } from './modules/ProductDetails';
import { AuctionDetails } from './modules/auctionDetails/AuctionDetails';
import { AuctionCounter } from './modules/AuctionCounter';
import { OffersCard } from './modules/auctionDetails/OffersCard';
import { ChargesCommissions } from './modules/auctionDetails/ChargesCommissions';
import { ImageProduct } from './modules/imageProduct/ImageProduct';
import { getProductById } from '@/services-actions/home/products';
import dynamic from 'next/dynamic';
import { Spinner } from '@/components/spinner/Spinner';

const ClientLayout = dynamic(() => import('@/components/ClientLayout'), {
  ssr: false,
  loading: () => <div className='h-screen w-full place-content-center'><Spinner /></div>
});

interface Props {
    params: { product_id: string };
}

export default async function ProductHomePage({ params }: Props) {

    const product = (await getProductById(params.product_id))
    const specific_prod = product.product_variations[0]
    const auction = product.products_acutions.find(s => !s.data_deleted)

    return (
        <ClientLayout>
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
        </ClientLayout>
    );
}