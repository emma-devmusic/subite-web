import { base64ToBlob } from "@/commons/helpers";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRef, useState, Suspense } from 'react';
import Webcam from "react-webcam";

export const PhotoWebCam = ({ setAuditImage, slide }: any) => {

    const webcamRef = useRef(null as any)
    const [imageSrc, setImageSrc] = useState('')
    const [facingMode, setFacingMode] = useState<"user" | "enviroment">('enviroment')
    const capture = () => {
        const imageSrc = webcamRef.current.getScreenshot()
        setImageSrc(imageSrc)
        const result = base64ToBlob(imageSrc)
        setAuditImage( (state:any)=> {
            return {
                ...state,
                selfie: [result]
            }
        } )
        slide()
    }

    return (
        <div className="flex justify-center flex-col items-center">
            <p className='text-center'>Asegúrate de que haya buena iluminación y fondo blanco.</p>
            <div className="relative mt-2">
                <div
                    style={{ maxWidth: '360px' }}
                    className='border-2 rounded-md shadow-sm my-2 p-1 relative'
                >
                    <Webcam
                        style={{
                            objectFit: 'cover',
                            aspectRatio: '3/4'
                        }}
                        ref={webcamRef}
                        audio={false}
                        screenshotFormat='image/png'
                        videoConstraints={{
                            facingMode
                        }}
                    />
                </div>
                <div className='w-full flex justify-between relative top-[-75px] mb-[-2.5rem]'>
                    <button 
                        className='text-white relative left-5' 
                        onClick={capture}
                    >
                        <Icon icon={'f7:camera-circle-fill'} className='text-5xl' />
                    </button>
                    <button 
                        className='text-white relative right-6'
                        onClick={() => {
                            setFacingMode(facingMode === 'user' ? 'enviroment' : 'user')
                        }}
                    >
                        <Icon icon={'ion:camera-reverse-sharp'} className='text-4xl' />
                    </button>
                </div>
            </div>
        </div>
    );
};
