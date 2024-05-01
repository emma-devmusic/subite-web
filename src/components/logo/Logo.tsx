import Link from "next/link"

export const Logo = () => {
    
    return (
        <div className="inline-block">
            <Link href="/" className='hover:text-gray-200'>
                <span className="sr-only">Your Company</span>
                <h1 className='text-2xl font-light'>Subastas<span className='font-semibold'>App</span></h1>
            </Link>
        </div>
    )
}

