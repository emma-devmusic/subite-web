import { Card } from '@/components/cards/Card'
import React from 'react'

export const ProductDetails = ({description}:{description: string}) => {
    return (
        <Card>
            <Card.Header className={`!text-3xl`}>
                Descripción
            </Card.Header>
            <Card.Body>
                <p>{description}</p>
            </Card.Body>
        </Card>
    )
}
