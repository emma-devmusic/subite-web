import { useReducer } from 'react';
import { useDropzone } from 'react-dropzone'
import { imageInitialState, imageReducer } from '@/reducers';
import Image from 'next/image';
import Swal from 'sweetalert2';
import './newProductModalStyle.css'

interface Props {
    setAuditImage: React.Dispatch<any>;
    slide?: () => void;
    numberOfImages: number;
}

export const ImageDocumentUpload = ({ setAuditImage, slide, numberOfImages }: Props) => {

    const [imageState, dispatch] = useReducer(imageReducer, imageInitialState);
    const onDrop = (acceptedFiles: any) =>
        (acceptedFiles.length + imageState.images.length > numberOfImages)
            ? Swal.fire('¡Recuerda!', 'Debes mandar 2 imagenes', 'warning')
            : acceptedFiles.forEach((file: any) => {
                if (imageState.images.length <= numberOfImages) {
                    dispatch({ type: 'add', payload: file })
                } else {
                    Swal.fire('¡Recuerda!', 'Solo puedes tener 3 imagenes', 'warning')
                }
            })
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { "image/*": ['.png', '.jpeg'] }
    })

    const handleSubmit = () => {
        if (imageState.images.length >= numberOfImages) {
            setAuditImage((state: any) => {
                return {
                    ...state,
                    document: imageState.images
                }
            })
            if (slide) slide()
        } else {
            Swal.fire('¡Recuerda!', 'Debes mandar 2 imagenes', 'warning')
        }
    }
    const handleClickImage = (img: any, flagDelete: boolean) =>
        (flagDelete)
            ? dispatch({ type: 'unselected' })
            : dispatch({ type: 'select', payload: img })

    const handleDelete = (i: number, flagDelete: boolean) =>
        (flagDelete)
            ? dispatch({ type: 'unselected' })
            : dispatch({ type: 'delete', payload: i })

    return (
        <>
            <div className="bg-white px-1 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className='m-3'>
                    <p className='text-center'>Sube fotos de tu documento, de frente y dorso</p>
                    <form action="" className='flex flex-col'>
                        <div {...getRootProps()} className={`w-100 mt-4 inputImage hover:cursor-pointer`}>
                            <input {...getInputProps()} />
                            <p className={`w-full rounded-md border-[1px] transition-all  text-center border-dashed py-4 px-4   text-sm  bg-gray-50 ${isDragActive && 'text-gray-400 border-cyan-600'}`}>
                                Seleccionar archivos
                            </p>
                        </div>
                        {
                            imageState?.images?.length > 0 &&
                            <>
                                <div className='w-100 inputImage flex flex-col gap-2 border-dashed flex-wrap items-center border-[1px] mt-3 rounded-md p-3 '>
                                    <div className='flex gap-2 flex-wrap justify-center'>
                                        {
                                            imageState?.images.map((file: any, i) =>
                                                <div className='flex ' key={i}>
                                                    <Image
                                                        className={`border-[2px] shadow-md  border-transparent 'hover:cursor-pointer hover:border-gray-400' transition-all`}
                                                        onClick={() => handleClickImage(file, file.path === imageState.imageSelected?.path)}
                                                        src={URL.createObjectURL(file)}
                                                        width={100}
                                                        height={100}
                                                        alt='Imagen para Perfil'
                                                        style={{
                                                            width: 'auto',
                                                            height: '100px',
                                                            objectFit: 'cover',
                                                            borderRadius: '10px'
                                                        }}

                                                    />
                                                    <div
                                                        style={{ minWidth: '1.25rem' }}
                                                        className={`rounded-full bg-gray-200 h-5 w-5 flex justify-center items-center relative right-3 top-[-5px] border-[1px] hover:cursor-pointer hover:border-gray-400 transition-all `}
                                                        onClick={() => handleDelete(i, file.path === imageState.imageSelected?.path)}
                                                    >
                                                        -
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                                <button
                                    onClick={handleSubmit}
                                    type="button"
                                    className="w-full mt-3 sm:w-auto rounded-md bg-white border-[1px] boder-solid transition-all border-cyan-600 px-3 py-2 text-sm font-semibold text-cyan-600 shadow-sm hover:text-white hover:bg-cyan-500 disabled:bg-slate-500 disabled:text-white disabled:border-white"
                                >
                                    Siguiente
                                </button>
                            </>
                        }
                    </form>
                </div>
            </div>
        </>
    )
}
