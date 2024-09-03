import { ImageProduct } from "@/types/products";
import { ImageProductModal } from "./ImageProductModal";
import { ImagesOnS3 } from "./ImagesOnS3";

interface Props {
    idImagesProduct: string; // ID de la imagen del producto
    imagesOnS3: ImageProduct[];
    handleInputChange: () => void; // Función para manejar el cambio en los inputs del formulario
    request_audit: boolean;
}

export const ThirdStepProductManage = ({ idImagesProduct, imagesOnS3, handleInputChange, request_audit }: Props) => {




    return (
        <form action="">
            <div className='w-100 my-4'>
                <label htmlFor="price" className='mb-1 block text-sm font-medium leading-6 text-gray-800'>Auditoría:</label>
                <div className="bg-slate-100 p-4 border-l-2 border-gray-400 flex gap-2">
                    <p className="text-xs text-gray-600">Solicitar auditoría de producto para subastar</p>
                    <input
                        name='request_audit'
                        onChange={handleInputChange}
                        checked={request_audit}
                        type="checkbox"
                        className='accent-cyan-600 hover:cursor-pointer'
                    />
                </div>
            </div>
            <div className='w-100 my-4'>
                <label htmlFor="images" className='mb-1 block text-sm font-medium leading-6 text-gray-800'>Imagenes</label>
                <ImageProductModal 
                    idImagesProduct={idImagesProduct} 
                />
            </div>
            <div className='w-100 my-4'>
                {
                    imagesOnS3.length > 0 && <ImagesOnS3 imagesOnS3={imagesOnS3} />
                }
            </div>
        </form>
    );
};
