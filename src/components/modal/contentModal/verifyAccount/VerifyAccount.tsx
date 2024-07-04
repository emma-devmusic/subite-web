
import Slider from "react-slick";
import { useEffect, useState } from 'react';
import { ImageDocumentUpload } from '../ImageDocumentUpload';
import { PhotoWebCam } from '../PhotoWebCam';
import Image from 'next/image';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./styles.css"
import { useAppDispatch, useAppSelector } from "@/store";
import { verify_account } from "@/store/authSlice";
import { Icon } from "@iconify/react/dist/iconify.js";
import { AccountVerified } from "../AccountVerified";

const settings = {
    dots: true,
    slickNext: () => console.log('algo'),
    infinite: false,
    arrow: true,
    slidesToShow: 1,
    slidesToScroll: 1,
};

export const VerifyAccount = () => {

    const [arrayImg, setArrayImg] = useState([] as any)
    const dispatch = useAppDispatch()
    const { userProfile } = useAppSelector(state => state.auth)
    const [auditImage, setAuditImage] = useState({
        document: [],
        selfie: []
    } as any);

    useEffect(() => {
        setArrayImg([...auditImage.document, ...auditImage.selfie])
    }, [auditImage])

    const handleSubmit = () => {
        console.log(auditImage)
        dispatch(verify_account(auditImage))
    }

    const slideNow = () => {
        const arrow: any = document.querySelector('.slick-next')
        arrow.click()
    }

    return (
        <div className="p-7">

            {
                userProfile?.account_verified
                    ?
                    <AccountVerified />
                    :
                    <Slider {...settings}>
                        <div>
                            <h3 className='text-xl mb-5'><strong>1.</strong> Fotos del documento</h3>
                            <ImageDocumentUpload setAuditImage={setAuditImage} slide={slideNow} numberOfImages={2} />
                        </div>
                        <div>
                            <h3 className="text-xl mb-5"><strong>2.</strong> Selfie</h3>
                            {
                                auditImage.document.length === 2 ?
                                    <PhotoWebCam setAuditImage={setAuditImage} slide={slideNow} />
                                    :
                                    <p>Completa el paso anterior</p>
                            }
                        </div>
                        <div>
                            <h3 className='text-xl mb-5'><strong>1.</strong> Enviar</h3>
                            {
                                auditImage.document.length === 2 && auditImage.selfie.length === 1
                                    ?
                                    <>
                                        <div className='w-100 inputImage flex flex-col gap-2 border-dashed flex-wrap items-center border-[1px] mt-3 rounded-md p-3 '>
                                            <div className='flex gap-2 flex-wrap justify-center'>
                                                {
                                                    arrayImg.map((file: any, i: number) =>
                                                        <div className='flex ' key={i}>
                                                            <Image
                                                                className={`border-[2px] shadow-md  border-transparent 'hover:cursor-pointer hover:border-gray-400' transition-all`}
                                                                // onClick={() => handleClickImage(file, file.path === imageState.imageSelected?.path)}
                                                                src={URL.createObjectURL(file)}
                                                                width={100}
                                                                height={100}
                                                                alt='Imagen para Perfil'
                                                                style={{
                                                                    width: 'auto',
                                                                    height: '100px',
                                                                    objectFit: 'cover',
                                                                    borderRadius: '10px',
                                                                    // border: (file.path === imageState.imageSelected?.path) ? '4px solid gray' : ''
                                                                }}

                                                            />
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                        <button
                                            className='w-full self-start mt-3 sm:w-auto rounded-md bg-white border-[1px] boder-solid transition-all border-cyan-600 px-3 py-2 text-sm font-semibold text-cyan-600 shadow-sm hover:text-white hover:bg-cyan-500 disabled:bg-slate-500 disabled:text-white disabled:border-white'
                                            onClick={handleSubmit}
                                        >
                                            Enviar para verificación de cuenta
                                        </button>
                                    </>
                                    :
                                    <p>Completa el paso anterior</p>
                            }


                        </div>
                    </Slider>
            }

        </div>
    );
};
