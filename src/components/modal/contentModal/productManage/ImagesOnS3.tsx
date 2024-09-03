import { Spinner } from "@/components/spinner/Spinner";
import { deleteImageFromSW3 } from "@/helpers/imageProductManager";
import { useAppDispatch } from "@/store";
import { deleteImageNewProduct } from "@/store/productSlice";
import { ImageProduct } from "@/types/products";
import Image from "next/image";
import { useState } from "react";
import Swal from "sweetalert2";

interface Props {
    imagesOnS3: ImageProduct[];
}

export const ImagesOnS3 = ({ imagesOnS3 }: Props) => {


    const dispatch = useAppDispatch()
    const [isDeleting, setIsDeleting] = useState(false)

    const handleDeleteImageOnS3 = (imageProduct: ImageProduct) => {
        setIsDeleting(true)
        deleteImageFromSW3(imageProduct.url_image)
            .then(() => dispatch(deleteImageNewProduct(imageProduct)))
            .catch(() => {
                Swal.fire('Error', 'Error al eliminar la imagen.', 'error');
                throw new Error;
            })
            .finally(() => setIsDeleting(false))
    }

    return (
        <div className='w-100 inputImage flex flex-col gap-2 border-dashed flex-wrap items-center border-[1px] border-t-0 rounded-md p-3 bg-gray-50'>
            <div className='flex gap-2 flex-wrap '>



                {
                    isDeleting
                        ? <Spinner />
                        : imagesOnS3.map((image: any, i) =>
                            <div className='flex' key={i}>
                                <Image
                                    className={`border-[2px] shadow-md  border-transparent hover:cursor-pointer hover:border-gray-400 transition-all`}
                                    src={image.url_image}
                                    width={100}
                                    height={100}
                                    alt='Imagen para Perfil'
                                    style={{
                                        width: '115px',
                                        height: '115px',
                                        objectFit: 'cover',
                                        borderRadius: '10px',
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
                }
            </div>
        </div>
    );
};
