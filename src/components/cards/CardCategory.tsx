'use client'

import React, { ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { league_spartan } from '@/app/fonts'

interface Props {
    name?: string
    icon?: ReactNode
    category_id?: number
}

export const CardCategory = ({
    name = 'Digital',
    icon,
    category_id = 5,
}: Props) => {
    const router = useRouter()

    return (
        <button
            type="button"
            onClick={() => router.push(`/auctions?categories_id=${category_id}`)}
            className="group/cardItem relative flex w-full flex-col items-center justify-center gap-5 overflow-hidden rounded-lg border border-gray-200/80 bg-white px-6 py-8 text-left shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:bg-primaryLight/40 hover:shadow-[0_12px_28px_-12px_rgba(254,130,48,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
            <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-primary transition-transform duration-300 ease-out group-hover/cardItem:scale-x-100"
            />

            <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-gradient-to-br from-primaryLight to-white text-primary shadow-inner ring-1 ring-primary/15 transition-all duration-300 group-hover/cardItem:scale-105 group-hover/cardItem:text-primaryHover group-hover/cardItem:ring-primary/40 [&_svg]:h-12 [&_svg]:w-12">
                {icon ? (
                    icon
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="3rem"
                        height="3rem"
                        viewBox="0 0 24 24"
                    >
                        <path
                            fill="currentColor"
                            d="m8.637 8.994l2.667-4.402q.13-.211.312-.295T12 4.213t.384.084t.312.295l2.667 4.402q.131.202.131.424t-.106.409t-.284.295t-.418.109H9.314q-.241 0-.422-.111t-.28-.293q-.106-.18-.106-.4t.13-.433M17.5 21.231q-1.567 0-2.649-1.082T13.769 17.5t1.082-2.649t2.649-1.082t2.649 1.082t1.082 2.649t-1.082 2.649t-2.649 1.082M3.77 19.922v-4.85q0-.343.231-.573q.233-.23.576-.23h4.85q.344 0 .574.232q.23.233.23.577v4.85q0 .343-.233.573q-.232.23-.576.23h-4.85q-.343 0-.573-.233q-.23-.232-.23-.576m13.73.309q1.147 0 1.94-.792t.792-1.939t-.792-1.939t-1.939-.792t-1.939.792t-.792 1.939t.792 1.939t1.938.792m-12.73-.5h4.462v-4.462H4.769zm4.858-10.5h4.746L12 5.427zM17.5 17.5"
                        ></path>
                    </svg>
                )}
            </div>

            <h3
                className={`${league_spartan.className} text-xl font-semibold tracking-tight text-secondary transition-colors duration-300 group-hover/cardItem:text-primary`}
            >
                {name}
            </h3>
        </button>
    )
}
