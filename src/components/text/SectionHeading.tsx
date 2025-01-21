import { league_spartan } from '@/app/layout';
import React, { ElementType } from 'react';

interface Props {
    heading: string;
    tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const SectionHeading = ({ heading, tag = 'h2' }: Props) => {
    const Tag: ElementType = tag; // Determina dinámicamente el tipo de encabezado
    const words = heading.split(' ');
    const lastWord = words.pop();
    const restOfHeading = words.join(' ');

    return (
        <Tag className={`${league_spartan.className} text-secondary text-4xl mb-12 text-center sm:text-start sm:text-5xl md:text-6xl`}>
            {restOfHeading}{' '}
            <strong className="text-primary">{lastWord}</strong>
        </Tag>
    );
};