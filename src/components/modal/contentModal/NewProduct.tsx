
import Slider from 'react-slick';
import Swal from 'sweetalert2';
import { useReducer, useState } from 'react';
import { FirstStepProductManage } from './productManage/FirstStepProductManage';
import { SecondStepProductManage } from './productManage/SecondStepProductManage';
import { ThirdStepProductManage } from './productManage/ThirdStepProductManage';
import { HandleStep } from './HandleStep';
import { useAppForm } from '@/hooks/useAppForm';
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch, useAppSelector } from '@/store';
import { newProductSubmit, updateProduct } from '@/store/slices/productSlice';
import { createObjProductUpdating, formProduct, getIdProductImageFolder } from '@/commons/helpers/products';
import { imageUpdatingProductInitialState, imageUpdatingReducer } from '@/reducers/imageUpdatingReducer';
import './newProductModalStyle.css'

const settings = {
    dots: true,
    infinite: false,
    arrow: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 200,
    draggable: false,
    accesibility: false
};

const slideNext = (step: any, setStep: any) => {
    if (typeof window === 'undefined') return;
    
    const arrow: any = document.querySelector('.slick-next')
    if (step <= 3) {
        setStep(step + 1)
        if (arrow) arrow.click()
    }
}

const slidePrev = (step: any, setStep: any) => {
    if (typeof window === 'undefined') return;
    
    const arrow: any = document.querySelector('.slick-prev')
    if (step >= 1) {
        setStep(step - 1)
        if (arrow) arrow.click()
    }
}

export const NewProduct = () => {

    const dispatch = useAppDispatch()
    const { imagesNewProduct, productSelected } = useAppSelector(state => state.product)
    const { isAdmin } = useAppSelector(state => state.manageUser)
    const [imageUpdatingState, dispatchImageUpdating] = useReducer(imageUpdatingReducer, imageUpdatingProductInitialState);
    const [step, setStep] = useState(1)
    const [idImagesProduct] = useState(
        (productSelected.id && productSelected.product_variations[0].productImages.length > 0)
        && getIdProductImageFolder(productSelected.product_variations[0].productImages[0].url_image)
        || uuidv4()
    )

    const [values, handleInputChange] = useAppForm({ ...formProduct(productSelected) })
    const [initialStateUpdtProd] = useState(values)

    const handleNewProduct = () => {
        values.images = imagesNewProduct
        values.sub_category = parseInt(values.sub_category)
        values.category = parseInt(values.category)
        values.quantity = parseInt(values.quantity)
        values.price = parseInt(values.price)

        if (productSelected.id) {
            const productUpdating = createObjProductUpdating(productSelected, values, imageUpdatingState, initialStateUpdtProd, isAdmin)
            // console.log(productUpdating)
            // console.log(values)
            // return
            productUpdating
                ? dispatch(updateProduct(productUpdating))
                : Swal.fire('No hay cambios en el producto', 'Debes realizar cambios en tu producto para poder actualizarlo', 'info')
        } else {
            dispatch(newProductSubmit(values))
        }
    }


    return (
        <>
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 new-product">
                <Slider
                    {...settings}
                    className='mb-4'
                    afterChange={(index: any) => setStep(index + 1)}>
                    <div>
                        <FirstStepProductManage
                            step={step}
                            handleInputChange={handleInputChange}
                            title={values.title}
                            description={values.description}
                        />
                    </div>
                    <div>
                        <SecondStepProductManage
                            step={step}
                            category={values.category}
                            subcategory={values.sub_category}
                            price={values.price}
                            stock={values.quantity}
                            handleInputChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <ThirdStepProductManage
                            step={step}
                            idImagesProduct={idImagesProduct}
                            imagesOnS3={imagesNewProduct}
                            request_audit={values.request_audit}
                            handleInputChange={handleInputChange}
                            dispatchImageUpdating={dispatchImageUpdating}
                            imageUpdatingState={imageUpdatingState}
                        />
                    </div>
                </Slider>
            </div>
            <HandleStep
                slideNext={() => slideNext(step, setStep)}
                slidePrev={() => slidePrev(step, setStep)}
                action={handleNewProduct}
                step={step}
                finishDisable={imagesNewProduct.length === 0}
            />
        </>
    )
}

