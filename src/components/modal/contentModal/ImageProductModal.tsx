import { useCallback, useEffect, useReducer, useState } from 'react';
import { useDropzone } from 'react-dropzone'
import './newProductModalStyle.css'
import Image from 'next/image';
import Swal from 'sweetalert2';
import { useAppDispatch, useAppSelector } from '@/store';
import { imageInitialState, imageProfileReducer, imageReducer, imageProfileInitialState } from '@/reducers';
import { savingImages, updateImageProfile } from '@/store/authSlice';
import { ImageProfile } from '@/types';


export const ImageProductModal = () => {

    // const { userProfile } = useAppSelector(state => state.auth)
    const dispatchRedux = useAppDispatch()
    // const [editProfile, setEditProfile] = useState(false)
    const [imageState, dispatch] = useReducer(imageReducer, imageInitialState);
    const [imagesProfile, dispatchImageProfile] = useReducer(imageProfileReducer, imageProfileInitialState);

    useEffect(() => {
        // userProfile?.image_profiles.forEach(img => {
        //     if (!imagesProfile.images.includes(img))
        //         dispatchImageProfile({ type: 'add', payload: img })
        // })
    }, [])


    const onDrop = (acceptedFiles: any) => {
        // if (acceptedFiles.length + imageState.images.length > 3) {
        //     Swal.fire('¡Recuerda!', 'Solo puedes tener 3 imagenes', 'warning')
        // } else {
            acceptedFiles.forEach((file: any) => {
                // if (imageState.images.length <= 2) {
                    dispatch({ type: 'add', payload: file })
            //     } else {
            //         Swal.fire('¡Recuerda!', 'Solo puedes tener 3 imagenes', 'warning')
            //     }
            // })
        })
    }
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { "image/*": ['.jpg', '.png', '.jpeg'] },
        // disabled: userProfile?.image_profiles.length === 3 || editProfile
    })
    const handleSubmit = () => {
        if (!imageState.imageSelected) {
            Swal.fire('Selecciona una imagen', 'Debes seleccionar una imagen de las que estás subiendo', 'warning');
            return
        }
        dispatchRedux(
            savingImages(imageState)
        )
    }
    const handleClickImage = (img: any, flagDelete: boolean) => {
        if (true) {
            if (flagDelete) {
                dispatch({ type: 'unselected' })
            } else {
                dispatch({ type: 'select', payload: img })
            }
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
                                            imageState?.images.map((file: any, i) =>
                                                <div className='flex' key={i}>
                                                    <Image
                                                        className={`border-[2px] shadow-md  border-transparent ${true && 'hover:cursor-pointer hover:border-gray-400'} transition-all`}
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
                                                        className={`rounded-full bg-gray-200 h-5 w-5 flex justify-center items-center relative right-3 top-[-5px] border-[1px] hover:cursor-pointer hover:border-gray-400 transition-all ${false && 'hidden'}`}
                                                        onClick={() => handleDelete(i, file.path === imageState.imageSelected?.path)}
                                                    >
                                                        -
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </div>
                                    {/* <button
                                        disabled={false}
                                        onClick={handleSubmit}
                                        type="button"
                                        className="w-full self-start sm:w-20 rounded-md bg-white border-[1px] boder-solid transition-all border-cyan-600 px-3 py-2 text-sm font-semibold text-cyan-600 shadow-sm hover:text-white hover:bg-cyan-500 disabled:bg-slate-500 disabled:text-white disabled:border-white"
                                    >
                                        Subir
                                    </button> */}
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
