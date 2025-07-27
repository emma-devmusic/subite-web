import { Card } from '@/components/cards/Card'
import React from 'react'

export const ProductDetails = ({description}:{description: string}) => {

    return (
        <Card>
            <Card.Header className={`!text-2xl md:!text-3xl`}>
                Descripción
            </Card.Header>
            <Card.Body className='!text-sm md:!text-base p-6'>
                <div dangerouslySetInnerHTML={{ __html: description }} className='[&_strong]:text-gray-700 text-gray-800 text-sm'/>
            </Card.Body>
        </Card>
    )
}
