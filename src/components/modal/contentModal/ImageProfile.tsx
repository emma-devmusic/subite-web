import { useCallback, useReducer, useState } from 'react';
import { useDropzone } from 'react-dropzone'
import './newProductModalStyle.css'
import Image from 'next/image';
import Swal from 'sweetalert2';
import { useAppDispatch, useAppSelector } from '@/store';
import { imageInitialState, imageReducer } from '@/reducers';
import { savingImages } from '@/store/authSlice';


export const ImageProfile = () => {

    const { userProfile } = useAppSelector(state => state.auth)
    const dispatchRedux = useAppDispatch()
    const [imageState, dispatch] = useReducer(imageReducer, imageInitialState);

    const onDrop = (acceptedFiles: any) => {
        if (acceptedFiles.length + imageState.images.length > 3) {
            Swal.fire('¡Recuerda!', 'Solo puedes tener 3 imagenes', 'warning')
        } else {
            acceptedFiles.forEach((file: any) => {
                if (imageState.images.length <= 2) {
                    dispatch({ type: 'add', payload: file })
                } else {
                    Swal.fire('¡Recuerda!', 'Solo puedes tener 3 imagenes', 'warning')
                }
            })
        }
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { "image/*": ['.jpg', '.png', '.jpeg'] }
    })

    const handleSubmit = () => {
        
        // filesFormData.append('default', imageState.imageSelected.path);
        dispatchRedux(
            savingImages(imageState)
        )
    }

    const handleClickImage = (img: any, flagDelete: boolean) => {
        if (flagDelete) {
            dispatch({ type: 'unselected' })
        } else {
            dispatch({ type: 'select', payload: img })
        }
    }

    const handleDelete = (i: number, flagDelete: boolean) => {
        if (flagDelete) {
            dispatch({ type: 'unselected' })
        }
        dispatch({ type: 'delete', payload: i })
    }

    return (
        <>
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className='m-3'>
                    <p className='text-center'>Puedes tener un máximo de 3 fotos almacenadas.</p>
                    {
                        userProfile?.image_profiles.map((img, i) =>
                            <Image
                                // onClick={handleClickImage}
                                key={i}
                                src={URL.createObjectURL(img)}
                                width={100}
                                height={100}
                                alt='Imagen para Perfil'
                                style={{
                                    width: '100px',
                                    height: '100px',
                                    objectFit: 'cover',
                                    borderRadius: '10px'
                                }} />)
                    }
                    <form action="">
                        <div {...getRootProps()} className='w-100 mt-4 inputImage hover:cursor-pointer'>
                            <input {...getInputProps()} />
                            <p className={`w-full rounded-md border-[1px] hover:text-gray-500 transition-all  text-center border-dashed py-4 px-4 ${imageState?.images?.length > 0 && 'border-b-0'} text-gray-900 text-sm  bg-gray-50 ${isDragActive && 'text-gray-400 border-cyan-600'}`}>
                                Click aquí o arrastra los archivos
                            </p>
                        </div>
                        {
                            imageState?.images?.length > 0 &&
                            <>
                                <div className='w-100 mb-4 inputImage flex gap-2 border-dashed flex-wrap justify-center border-[1px] border-t-0 rounded-md p-3 bg-gray-50'>
                                    {
                                        imageState?.images.map((file: any, i) =>
                                            <div className='flex' key={i}>
                                                <Image
                                                    className='border-[2px] border-transparent hover:cursor-pointer hover:border-gray-400 transition-all'
                                                    onClick={() => handleClickImage(file, file.path === imageState.imageSelected?.path)}
                                                    src={URL.createObjectURL(file)}
                                                    width={100}
                                                    height={100}
                                                    alt='Imagen para Perfil'
                                                    style={{
                                                        width: '100px',
                                                        height: '100px',
                                                        objectFit: 'cover',
                                                        borderRadius: '10px',
                                                        border: (file.path === imageState.imageSelected?.path) ? '4px solid gray' : ''
                                                    }}

                                                />
                                                <div
                                                    className='rounded-full bg-gray-200 h-5 w-5 flex justify-center items-center relative right-3 top-[-5px] border-[1px] hover:cursor-pointer hover:border-gray-400 transition-all'
                                                    onClick={() => handleDelete(i, file.path === imageState.imageSelected?.path)}
                                                >
                                                    -
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            </>
                        }
                    </form>
                </div>
            </div>
            <div className="bg-gray-50 px-4 py-4 pb-6 sm:flex sm:flex-row sm:px-6">
                <button
                    onClick={handleSubmit}
                    type="button"
                    className="w-full rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 sm:mr-3 sm:w-auto"
                >
                    Enviar
                </button>
            </div>
        </>
    )
}
