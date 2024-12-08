import { Card } from '@/components/cards/Card'
import { ButtonOffers } from './ButtonOffers'
import { DataHomeProductResponse } from '@/types/homeProductResponse'
import { ProductInfo } from './ProductInfo'

interface Props {
    product: DataHomeProductResponse
}

export const AuctionDetails = ({ product }: Props) => {

    return (
        <Card>
            <Card.Header className='text-center'>
                Información de la subasta
            </Card.Header>
            <Card.Body className='flex flex-col gap-4'>
                <div className='flex flex-col gap-4'>
                    <ProductInfo product={product} />
                </div>
            </Card.Body>
        </Card>
    )
}
