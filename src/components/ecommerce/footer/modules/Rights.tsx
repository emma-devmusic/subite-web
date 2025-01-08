import Link from 'next/link'
import React from 'react'

export const Rights = () => {
    return (
        <div className="sm:flex gap-1 justify-between items-center m-4">
            <p className="text-sm text-gray-400">
                2025 &copy; Subite Subastas.
            </p>
            <span className='text-sm text-gray-400'><i>Powered by <Link href={'https://ding.com.ar'} className='text-secondary hover:text-primary transition-all' >Ding</Link></i></span>
        </div>
    )
}
