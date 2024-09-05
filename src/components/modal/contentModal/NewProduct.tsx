
import Slider from 'react-slick';
import { useEffect, useState } from 'react';
import { FirstStepProductManage } from './productManage/FirstStepProductManage';
import { SecondStepProductManage } from './productManage/SecondStepProductManage';
import { ThirdStepProductManage } from './productManage/ThirdStepProductManage';
import { HandleStep } from './HandleStep';
import { useForm } from '@/hooks/useForm';
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch, useAppSelector } from '@/store';
import './newProductModalStyle.css'
import { newProductSubmit } from '@/store/productSlice';
import { getIdProductImageFolder } from '@/helpers/products';

const settings = {
    dots: true,
    infinite: false,
    arrow: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 200,
    draggable: false
};

const slideNext = (step: any, setStep: any) => {
    const arrow: any = document.querySelector('.slick-next')
    if (step <= 3) {
        setStep(step + 1)
        arrow.click()
    }
}

const slidePrev = (step: any, setStep: any) => {
    const arrow: any = document.querySelector('.slick-prev')
    if (step >= 1) {
        setStep(step - 1)
        arrow.click()
    }
}

export const NewProduct = () => {

    const dispatch = useAppDispatch()
    const { imagesNewProduct, productSelected } = useAppSelector(state => state.product)

    
    const [step, setStep] = useState(1)
    const [idImagesProduct] = useState( productSelected.id && getIdProductImageFolder(productSelected.product_variations[0].productImages[0].url_image) || uuidv4() )

    const [ values, handleInputChange, reset ] = useForm({
        title: productSelected.name || "",
        category: productSelected.category_id || 0,
        sub_category: productSelected.sub_category_id || 0,
        description: productSelected.id && productSelected.product_variations[0].description || "",
        price: productSelected.id && productSelected.product_variations[0].price || 0,
        quantity: productSelected.id && productSelected.product_variations[0].stocks.quantity || 0,
        request_audit: true,
        images: imagesNewProduct
    })


    useEffect(() => {
        reset()
    }, [])


    const handleNewProduct = () => {
        values.images = imagesNewProduct
        values.sub_category = parseInt(values.sub_category)
        values.category = parseInt(values.category)
        values.quantity = parseInt(values.quantity)
        values.price = parseInt(values.price)
        // console.log(JSON.stringify(values))
        console.log(values)
        dispatch( newProductSubmit(values) )
    }

    return (
        <>
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <Slider
                    {...settings}
                    className='mb-4'
                    afterChange={(index: any) => setStep(index + 1)}>
                    <div>
                        <FirstStepProductManage 
                            handleInputChange={handleInputChange} 
                            title={values.title} 
                            description={values.description}   
                        />
                    </div>
                    <div>
                        <SecondStepProductManage
                            category={values.category}
                            subcategory={values.sub_category}
                            price={values.price}
                            stock={values.quantity} 
                            handleInputChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <ThirdStepProductManage 
                            idImagesProduct={idImagesProduct} 
                            imagesOnS3={imagesNewProduct} 
                            request_audit = {values.request_audit}
                            handleInputChange={handleInputChange} 
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
