import { Card } from '@/components/cards/Card'
import { ButtonOffers } from './ButtonOffers'
import { DataHomeProductResponse } from '@/types/homeProductResponse'

interface Props {
    product: DataHomeProductResponse
}

export const AuctionDetails = ({ product }: Props) => {

    const specific_prod = product.product_variations[0]
    const auction = product.products_acutions.find(s => !s.data_deleted)

    return (
        <Card>
            <Card.Header className='text-center'>
                Ofertas
            </Card.Header>
            <Card.Body className='flex flex-col gap-4 place-items-center'>
                <div>
                    <p className='text-center text-sm'>Precio inicial</p>
                    <h3 className='text-center text-4xl text-success font-bold'>{specific_prod.price}</h3>
                </div>
                <ButtonOffers product={product} />
                <div className='flex items-center gap-2'>
                    <p className='text-center text-xs'>Puja mínima</p>
                    <h3 className='text-center text-lg text-secondary'>{auction?.bid_amount}</h3>
                </div>
            </Card.Body>
        </Card>
    )
}
