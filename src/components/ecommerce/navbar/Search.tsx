'use client'

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

export const Search = () => {
    const router = useRouter(); // Router para actualizar la URL
    const path = usePathname()
    const searchParams = useSearchParams(); // Obtener parámetros actuales de la URL
    const [inputValue, setInputValue] = useState<string>(''); // Estado del input

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Crear nuevos parámetros desde cero
        const params = new URLSearchParams();
        if (inputValue) {
            params.set('term', inputValue); // Añadir "term" como parámetro
        }

        // Añadir parámetros estáticos
        params.set('page', '1');
        params.set('limit', '8');

        // Determinar la ruta
        if (path.includes('auctions')) {
            router.push(`?${params.toString()}`);
        } else {
            router.push(`/auctions?${params.toString()}`);
        }
    };
    return (
        <form
            className="flex lg:ml-6 w-full max-w-xl text-gray-700"
            onSubmit={handleSubmit}
        >
            <span className="sr-only">Search</span>
            <div className='relative w-full flex items-center'>
                <MagnifyingGlassIcon
                    className="h-6 w-6 absolute right-3"
                    aria-hidden="true"
                />
                <input
                    type="text"
                    placeholder='Televisor 32"'
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)} // Actualizar estado local
                    className='rounded-sm shadow-sm shadow-gray-400 py-2 px-4 w-full outline-slate-300'
                />
            </div>
        </form>
    );
};