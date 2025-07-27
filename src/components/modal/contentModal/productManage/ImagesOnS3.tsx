import { Spinner } from "@/components/spinner/Spinner";
import { deleteImageFromSW3 } from "@/commons/helpers/imageProductManager";
import { ImageUpdatingReducer } from "@/reducers/imageUpdatingReducer";
import { useAppDispatch } from "@/store";
import { deleteImageNewProduct, selectingImagesNewProduct } from "@/store/slices/productSlice";
import { ImageProduct } from "@/types/products";
import Image from "next/image";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

interface Props {
    imagesOnS3: ImageProduct[];
    dispatchImageUpdating: any;
    imageUpdatingState: ImageUpdatingReducer;
}

export const ImagesOnS3 = ({ imagesOnS3, dispatchImageUpdating, imageUpdatingState }: Props) => {

    const dispatch = useAppDispatch()
    const [isDeleting, setIsDeleting] = useState(false)
    const [initImagesToUpdate, setInitImagesToUpdate] = useState(false)




    useEffect(() => {
        imagesOnS3.forEach((img, i) => {
            if (!imageUpdatingState.imagesToSend.find(image => image.url_image === img.url_image)) {
                if (!initImagesToUpdate) {
                    dispatchImageUpdating({ type: 'init', payload: img })
                    if (i === imagesOnS3.length - 1) setInitImagesToUpdate(true)
                } else {
                    dispatchImageUpdating({ type: 'add', payload: img })
                }
            }
        })
    }, [imagesOnS3])




    const handleDeleteImageOnS3 = (imageProduct: ImageProduct) => {
        Swal.fire({
            title: "Eliminar Imagen",
            text: "¿Estás seguro/a que deseas eliminar la imagen? Esta acción no se puede deshacer",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Eliminar",
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                setIsDeleting(true)
                deleteImageFromSW3(imageProduct.url_image)
                    .then(() => {
                        dispatchImageUpdating({ type: 'delete', payload: imageProduct })
                        dispatch(deleteImageNewProduct(imageProduct))
                    })
                    .catch(() => {
                        Swal.fire('Error', 'Error al eliminar la imagen.', 'error');
                        throw new Error;
                    })
                    .finally(() => setIsDeleting(false))
            }
        });
    }


    const selectingImage = (img: ImageProduct) => {
        dispatchImageUpdating({ type: 'select', payload: img })
        dispatch(selectingImagesNewProduct({ url: img.url_image }))
    }


    return (
        <div className='w-100 inputImage flex flex-col gap-2 border-dashed flex-wrap items-center border-[1px] border-t-0 rounded-md p-3 bg-gray-50'>
            <div className='flex gap-2 flex-wrap '>
                {
                    isDeleting
                        ? <Spinner />
                        : imagesOnS3.map((image: any, i) => {
                            return (
                                <div className='flex' key={i}>
                                    <Image
                                        className={`border-[2px] shadow-md  border-transparent hover:cursor-pointer hover:border-gray-400 transition-all`}
                                        src={image.url_image}
                                        width={100}
                                        height={100}
                                        alt='Imagen para Perfil'
                                        onClick={() => selectingImage(image)}
                                        style={{
                                            width: '115px',
                                            height: '115px',
                                            objectFit: 'cover',
                                            borderRadius: '10px',
                                            border: (image.main_image) ? '4px solid gray' : ''
                                        }}
                                    />
                                    <div
                                        className={`rounded-full bg-gray-200 h-5 w-5 flex justify-center items-center relative right-3 top-[-5px] border-[1px] hover:cursor-pointer hover:border-gray-400 transition-all ${false && 'hidden'}`}
                                        onClick={() => handleDeleteImageOnS3(image)}
                                    >
                                        -
                                    </div>
                                </div>
                            )
                        })
                }
            </div>
        </div>
    );
};
