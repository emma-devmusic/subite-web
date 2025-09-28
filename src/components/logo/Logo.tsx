import Image from "next/image"
import Link from "next/link"
import hammer from '../../assets/img/logo/hammer.png'
import logoNav from '../../assets/img/logo/logo-footer.png'

interface Props {
    classLogo?: string;
    onlyHammer?: boolean;
    hammerClass?: string;
    responsive?: boolean;
}

export const Logo = ({ classLogo, onlyHammer, hammerClass, responsive = true }: Props) => {

    if (onlyHammer) {
        return (
            <div className="inline-block">
                <Link href="/" className='hover:text-gray-200'>
                    <Image src={hammer} width={150} height={70} className={`w-auto h-[51.33px] object-cover ${hammerClass}`} alt="Logo de Subite, Subastas" />
                </Link>
            </div>
        )
    }

    return (
        <div className="inline-block">
            <Link href="/" className='hover:text-gray-200'>
                {responsive ?
                    <>
                        <Image src={hammer} width={150} height={70} className={`sm:hidden w-auto h-[51.33px] object-cover ${classLogo}`} alt="Logo de Subite, Subastas" />
                        <Image src={logoNav} width={150} height={70} className={`hidden sm:block w-32 h-auto object-cover ${classLogo}`} alt="Logo de Subite, Subastas" />
                    </>
                    :
                    <Image src={logoNav} width={150} height={70} className={`w-auto h-[51.33px] object-cover ${classLogo}`} alt="Logo de Subite, Subastas" />
                }
            </Link>
        </div>
    )
}

