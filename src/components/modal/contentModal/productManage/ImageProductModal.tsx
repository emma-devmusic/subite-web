import { useReducer, useState } from 'react';
import { useDropzone } from 'react-dropzone'
import { imageInitialState, imageReducer } from '@/reducers';
import { useAppDispatch, useAppSelector } from '@/store';
import { fileIntoSW3 } from '@/helpers/imageProductManager';
import { Spinner } from '@/components/spinner/Spinner';
import { setImagesNewProduct } from '@/store/slices/productSlice';
import Image from 'next/image';
import Swal from 'sweetalert2';


interface Props {
    idImagesProduct: string;
}


export const ImageProductModal = ({ idImagesProduct }: Props) => {

    const dispatchRedux = useAppDispatch()
    const { userProfile } = useAppSelector(state => state.auth)
    const [imageState, dispatch] = useReducer(imageReducer, imageInitialState);
    const [isLoading, setIsLoading] = useState(false)

    const onDrop = (acceptedFiles: any) => {
        acceptedFiles.forEach((file: any) => {
            dispatch({ type: 'add', payload: file })
        })
    }

    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
        onDrop,
        accept: { "image/*": ['.jpg', '.png', '.jpeg'] }
    })

    const handleSubmitImageToS3 = () => {
        setIsLoading(true)
        if (userProfile) {
            imageState.images.map( async (image, i) => {
                console.log('insertando imagen en S3')
                try {
                    const link = await fileIntoSW3(image, userProfile?.id, idImagesProduct)
                    dispatchRedux( setImagesNewProduct( {
                        name: image.name,
                        description: image.lastModifiedDate,
                        url_image: link
                    }))
                    if (i === imageState.images.length - 1) {
                        setIsLoading(false)
                        dispatch({ type: 'clear' })
                    }
                } catch (error) {
                    Swal.fire('Error', 'Error al insertar imagen en S3 | ' + error, 'error')
                    // console.error('Error al insertar imagen en S3', error)
                    setIsLoading(false)
                }
            })
        }
    }

    const handleDelete = (i: number, flagDelete: boolean) => {
        if (flagDelete) dispatch({ type: 'unselected' })
        dispatch({ type: 'delete', payload: i })
    }

    return (
        <>
            <div className="bg-white ">
                <div className=''>
                    <div >
                        <div {...getRootProps()} className={`w-100  inputImage ${false ? 'hover:cursor-default' : 'hover:cursor-pointer'}`}>
                            <input {...getInputProps()} />
                            <p className={`w-full rounded-md border-[1px]  ${false && 'text-gray-400'} ${false && 'hover:text-gray-500 '} transition-all  text-center border-dashed py-4 px-4 ${imageState?.images?.length > 0 && 'border-b-0'}  text-sm  bg-gray-50 ${isDragActive && 'text-gray-400 border-cyan-600'}`}>
                                Click aquí o arrastra los archivos
                            </p>
                        </div>
                        {
                            imageState?.images?.length > 0 &&
                            <>
                                <div className='w-100 inputImage flex flex-col gap-2 border-dashed flex-wrap items-center border-[1px] border-t-0 rounded-md p-3 bg-gray-50'>
                                    <div className='flex gap-2 flex-wrap '>
                                        {
                                            isLoading
                                                ? <Spinner />
                                                : imageState?.images.map((file: any, i) =>
                                                    <div className='flex' key={i}>
                                                        <Image
                                                            className={`border-[2px] shadow-md  border-transparent hover:cursor-pointer hover:border-gray-400 transition-all`}
                                                            src={URL.createObjectURL(file)}
                                                            width={100}
                                                            height={100}
                                                            alt='Imagen para Perfil'
                                                            style={{
                                                                width: '100px',
                                                                height: '100px',
                                                                objectFit: 'cover',
                                                                borderRadius: '10px',
                                                            }}
                                                        />
                                                        <div
                                                            className={`rounded-full bg-gray-200 h-5 w-5 flex justify-center items-center relative right-3 top-[-5px] border-[1px] hover:cursor-pointer hover:border-gray-400 transition-all ${false && 'hidden'}`}
                                                            onClick={() => handleDelete(i, file.path === imageState.imageSelected?.path)}
                                                        >
                                                            -
                                                        </div>
                                                    </div>
                                                )
                                        }
                                    </div>
                                    <button
                                        disabled={false}
                                        onClick={handleSubmitImageToS3}
                                        type="button"
                                        className="w-full self-start sm:w-20 rounded-md bg-white border-[1px] boder-solid transition-all border-cyan-600 px-3 py-2 text-sm font-semibold text-cyan-600 shadow-sm hover:text-white hover:bg-cyan-500 disabled:bg-slate-500 disabled:text-white disabled:border-white"
                                    >
                                        Subir
                                    </button>
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
