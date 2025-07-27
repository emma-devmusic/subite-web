'use client'

import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useState } from 'react'

interface Props {
    initRoute?: string;
    inputClassName?: string;
}



export const Search = ({ initRoute = '/auctions', inputClassName }: Props) => {

    const params = useSearchParams();
    const router = useRouter();
    const [inputValue, setInputValue] = useState<string>(''); // Estado del input

    const createQueryString = useCallback((name: string, value: string, forDelete?: string) => {
        const newUrl = new URLSearchParams(params.toString())
        if (forDelete) {
            newUrl.delete(forDelete)
        }
        newUrl.set(name, value)
        return newUrl.toString()
    }, [params])

    const deleteQueryString = useCallback((names: string[]) => {
        const newUrl = new URLSearchParams(params.toString())
        names.forEach(name => newUrl.delete(name))
        return newUrl.toString()
    }, [params])

    const handleClean = () => {
        setInputValue('')
        router.push(
            initRoute + `${initRoute.includes('?') ? '&' : '?'}` + deleteQueryString(['term'])
        )
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        if (inputValue === '') {
            router.push(
                initRoute + `${initRoute.includes('?') ? '&' : '?'}` + deleteQueryString(['term'])
            )
            return
        }
        router.push(
            initRoute + `${initRoute.includes('?') ? '&' : '?'}` + createQueryString('term', e.target.elements[0].value)
        )
    }
    return (
        <form
            className={`${inputClassName} flex w-full max-w-xl text-gray-700`}
            onSubmit={handleSubmit}
        >
            <span className="sr-only">Search</span>
            <div className='relative w-full flex items-center'>
                <div className='flex rounded-lg bg-white bg-opacity-50 py-2 px-4 w-full border-2 border-primary '>
                    <input
                        type="text"
                        placeholder='Busca tu subasta...'// Actualizar estado local
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                        className='w-full outline-none text-secondary bg-transparent'
                    />
                    <div className='flex items-center'>
                        <XMarkIcon
                            onClick={handleClean}
                            className='h-5 w-auto px-2 text-gray-300 border-r-2 hover:cursor-pointer hover:text-gray-400 transition-all'
                        />
                        <button type='submit'>
                            <MagnifyingGlassIcon
                                className="h-5 w-auto pl-2 text-gray-400 border-gray-300 hover:cursor-pointer hover:text-primary transition-all"
                                aria-hidden="true"
                            />
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};