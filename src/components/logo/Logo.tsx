import Image from "next/image"
import Link from "next/link"
import hammer from '../../assets/img/logo/hammer.png'
import logoNav from '../../assets/img/logo/logo-footer.png'

export const Logo = ({ classLogo }: { classLogo?: string }) => {

    return (
        <div className="inline-block">
            <Link href="/" className='hover:text-gray-200'>
                <Image src={hammer} width={150} height={70} className={`sm:hidden w-auto h-[51.33px] object-cover ${classLogo}`} alt="Logo de Subite, Subastas" />
                <Image src={logoNav} width={150} height={70} className={`hidden sm:block w-32 h-auto object-cover ${classLogo}`} alt="Logo de Subite, Subastas" />
            </Link>
        </div>
    )
}

