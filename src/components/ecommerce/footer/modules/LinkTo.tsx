import Link from 'next/link';
import React from 'react'

export const LinkTo = ({ link, name }:{link: string; name: string}) => {
    return (
        <p className='m-0'>
            <Link
                className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200 focus:outline-none focus:text-gray-200"
                href={link}
            >
                {name}
            </Link>
        </p>
    )
}
