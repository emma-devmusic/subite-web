import { Tag } from '@/components/tags/Tag'
import Link from 'next/link'
import React from 'react'
import { LinkTo } from './LinkTo';

type Link = { link: string, name: string }

interface Props {
    links: Link[];
    titleLinks: string;
}

export const LinkList = ({ titleLinks, links }: Props) => {
    return (
        <div className="col-span-2 sm:col-span-1">
            <h4 className="font-semibold text-gray-500">{titleLinks}</h4>
            <div className="mt-3 grid space-y-3">
                {
                    links.map( item => <LinkTo link={item.link} name={item.name} key={item.name}/>)
                }
            </div>
        </div>
    )
}




{/* <div className="col-span-1">
    <h4 className="font-semibold text-gray-100">Product</h4>
    <div className="mt-3 grid space-y-3">
        <p>
            <Link
                className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200 focus:outline-none focus:text-gray-200 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
                href="#"
            >
                Pricing
            </Link>
        </p>
        <p>
            <Link
                className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200 focus:outline-none focus:text-gray-200 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
                href="#"
            >
                Changelog
            </Link>
        </p>
        <p>
            <Link
                className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200 focus:outline-none focus:text-gray-200 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
                href="#"
            >
                Docs
            </Link>
        </p>
    </div>
</div> */}