
import { league_spartan } from '@/app/layout';
import Image from 'next/image';
import { ProductDetails } from './modules/ProductDetails';
import { AuctionDetails } from './modules/AuctionDetails/AuctionDetails';
import * as apiProducts from '@/services/products';
import { AuctionCounter } from './modules/AuctionCounter';


interface Props {
    params: { product_id: string };
}


export default async function ProductHomePage({ params }: Props) {

    const product = (await apiProducts.getProductById(params.product_id))
    const specific_prod = product.product_variations[0]
    const firstImageProduct = specific_prod.productImages[0]
    const imageProduct = specific_prod.productImages.find(img => img.main_image) || firstImageProduct
    const auction = product.products_acutions.find(s => !s.data_deleted)
    return (
        <div className='my-16 flex flex-col gap-10'>
            <div>
                <h1 className={`${league_spartan.className} text-5xl text-secondary`}>{product.name}</h1>
            </div>
            <hr />
            <div className='max-h-[400px] h-full w-full rounded-lg overflow-hidden'>
                <Image src={imageProduct.url_image} width={1024} height={400} className="h-[400px] object-cover w-full" alt='Imagen del producto' />
            </div>
            <hr />
            <div>
                {auction && <AuctionCounter auction={auction} />}
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                <div className='sm:col-span-1 lg:col-span-2'>
                    <ProductDetails description={specific_prod.description} />
                </div>
                <div className='sm:col-span-1 lg:col-span-1'>
                    <AuctionDetails product={product} />
                </div>
            </div>
        </div>
    );
}