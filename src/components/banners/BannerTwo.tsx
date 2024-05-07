
import uno from '../../assets/img/parallax/1.png'
import dos from '../../assets/img/parallax/2.png'
import tres from '../../assets/img/parallax/3.png'
import cuatro from '../../assets/img/parallax/4.png'
import Image from "next/image"
import gallery from '../../assets/img/gallery.png'

export const BannerTwo = () => {

    return (
        <div className="relative w-100" style={{
        }}>
                <Image src={uno} width={2500} height={700} alt="image" style={{
                    objectFit: 'cover',
                    minHeight: 250,
                    position: 'relative',
                    zIndex: 0
                    }}
                />
                <Image src={dos} width={2500} height={700} alt="image" style={{
                    objectFit: 'cover',
                    minHeight: 250,
                    position: 'absolute',
                    top: '0',
                    zIndex: 1
                    }}
                />
                <Image src={tres} width={2500} height={700} alt="image" style={{
                    objectFit: 'cover',
                    minHeight: 250,
                    position: 'absolute',
                    top: '0',
                    zIndex: 2
                    }}
                />
                <Image src={cuatro} width={2500} height={700} alt="image" style={{
                    objectFit: 'cover',
                    minHeight: 250,
                    position: 'absolute',
                    top: '0',
                    zIndex: 3
                    }}
                />
        </div>
    )
}



