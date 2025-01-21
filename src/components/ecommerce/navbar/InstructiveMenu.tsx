import { PopoverApp } from '@/components/popover'
import { ArrowDownIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

export const InstructiveMenu = () => {

    const router = useRouter()

    const handleGoTo = (link:string) => {
        router.push(link)
    }

    return (
        <PopoverApp
            button={
                <div
                    className="relative flex text-nowrap px-4 py-2 items-center text-sm font-medium text-gray-500 hover:text-secondary transition"
                >
                    <span>
                        Instructivo
                    </span>
                    <ArrowDownIcon className='w-3 ml-1' />
                </div>
            }
        >
            <ul className='flex flex-col w-[200px] z-20'>
                <li onClick={() => handleGoTo('/como-ofertar')}>
                    <div className="text-base text-gray-600 font-normal rounded-lg flex p-3 hover:bg-gray-100 hover:cursor-pointer">
                        <span className="ml-3">¿Cómo Ofertar?</span>
                    </div>
                </li>
                <li onClick={() => handleGoTo('/como-subastar')}>
                    <div className="text-base text-gray-600 font-normal rounded-lg flex p-3 hover:bg-gray-100 hover:cursor-pointer">
                        <span className="ml-3">¿Cómo Subastar?</span>
                    </div>
                </li>
            </ul>
        </PopoverApp>
    )
}
