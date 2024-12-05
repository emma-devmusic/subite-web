import { league_spartan } from '@/app/layout';
import { alternativeImage } from '@/helpers/constants';
import Image from 'next/image';

interface Props {
    params: { product_id: string };
}


export default function ProductHomePage({ params }: Props) {

    console.log(params.product_id);

    return (
        <div className='my-16 flex flex-col gap-16'>
            <div>
                <h1 className={`${league_spartan.className} text-5xl text-secondary`}>Titulo de Producto</h1>
            </div>
            <div className='max-h-[400px] h-full w-full rounded-lg overflow-hidden'>
                <Image src={alternativeImage} width={1024} height={400} className="h-[400px] object-cover w-full" alt='Imagen del producto'/>
            </div>
        </div>
    );
}