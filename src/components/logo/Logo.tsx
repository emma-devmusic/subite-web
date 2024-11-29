import Image from "next/image"
import Link from "next/link"
import logoNav from '../../assets/img/logo/logo-nav.png'
export const Logo = () => {
    
    return (
        <div className="inline-block">
            <Link href="/" className='hover:text-gray-200'>
                <Image src={logoNav} width={150} height={70} className="w-32 h-auto object-cover" alt="Logo de Subite, Subastas"/>
            </Link>
        </div>
    )
}

