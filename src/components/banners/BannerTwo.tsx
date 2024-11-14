'use client'
import { IParallax, Parallax, ParallaxLayer } from "@react-spring/parallax"
import uno from '../../assets/img/parallax/1.png'
import dos from '../../assets/img/parallax/2.png'
import tres from '../../assets/img/parallax/3.png'
import cuatro from '../../assets/img/parallax/4.png'
import Image from "next/image"

export const BannerTwo = () => {


    return (
        <div className="w-100" style={{height: '25rem'}}>
            <Parallax
                pages={1.05}
                style={{
                    height: '90%',
                    scrollbarWidth: 'none',
                }}
            >
                <ParallaxLayer speed={.2} offset={0}>
                    <Image src={uno} width={2500} height={700} alt="image" style={{
                        objectFit: 'cover',
                        minHeight: 250,
                        position: 'relative',
                        zIndex: 0
                    }}
                    />
                </ParallaxLayer>

                <ParallaxLayer speed={.3} offset={0.1}>

                    <Image src={dos} width={2500} height={700} alt="image" style={{
                        objectFit: 'cover',
                        minHeight: 250,
                        position: 'absolute',
                        top: '0',
                        zIndex: 1
                    }}
                    />
                </ParallaxLayer>

                <ParallaxLayer speed={.5} offset={.1}>
                    <Image src={tres} width={2500} height={700} alt="image" style={{
                        objectFit: 'cover',
                        minHeight: 250,
                        position: 'absolute',
                        top: '0',
                        zIndex: 2
                    }}
                    />
                </ParallaxLayer >
                <ParallaxLayer  speed={.1} offset={0}>
                    <Image src={cuatro} width={2500} height={700} alt="image" style={{
                        objectFit: 'cover',
                        minHeight: 250,
                        position: 'absolute',
                        top: '0',
                        zIndex: 3
                    }}
                    />
                </ParallaxLayer>
            </Parallax>
        </div>
    )
}



