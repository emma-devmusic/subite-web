import { Card } from '@/components/cards/Card'
import { DataHomeProductResponse } from '@/types/homeProductResponse'

export const ChargesCommissions = ({ price }: { price: number }) => {

    const product_price = {
        init: price,
        commission: (price * 0.025).toFixed(2),
        iva: (price * 0.21).toFixed(2),
    }
    const total = (Number(product_price.init) + Number(product_price.commission) + Number(product_price.iva)).toFixed(2)

    return (
        <Card>
            <Card.Header className='text-center'>
                Cargos y Comisiones
            </Card.Header>
            <Card.Body className='flex flex-col gap-4'>
                <div className='w-full h-auto'>
                    <div className='flex justify-between border-b-[1px] border-zinc-200 p-3'>
                        <span className='text-gray-600'>Precio</span>
                        <span className='text-gray-600'>${product_price.init}</span>
                    </div>
                    <div className='flex justify-between border-b-[1px] border-zinc-200 p-3'>
                        <span className='text-gray-600'>Comisión (2.5%)</span>
                        <span className='text-gray-600'>${product_price.commission}</span>
                    </div>
                    <div className='flex justify-between border-b-[1px] border-zinc-200 p-3'>
                        <span className='text-gray-600'>IVA (21%)</span>
                        <span className='text-gray-600'>${product_price.iva}</span>
                    </div>
                    <div className='flex justify-between border-b-[1px] border-zinc-200 p-3'>
                        <strong className='text-gray-600'>Total</strong>
                        <strong className='text-gray-600'>${total}</strong>
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}
