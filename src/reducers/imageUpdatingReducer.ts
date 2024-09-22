
import { ImageUpdatingProduct } from "@/types/products"
import { v4 as uuidv4 } from 'uuid';



export interface ImageUpdatingReducer {
    initImages: ImageUpdatingProduct[];
    imageSelected: null | ImageUpdatingProduct,
    imagesToSend: ImageUpdatingProduct[]
}

export const imageUpdatingProductInitialState: ImageUpdatingReducer
 = {
    initImages: [],  // initialize images on S3
    imageSelected: null,
    imagesToSend: []
}

type action = 
| { type: 'add', payload: ImageUpdatingProduct }
| { type: 'delete', payload: ImageUpdatingProduct }
| { type: 'select', payload: ImageUpdatingProduct }
| { type: 'init', payload: ImageUpdatingProduct }
| { type: 'unselected' }

export const imageUpdatingReducer = (state: ImageUpdatingReducer = imageUpdatingProductInitialState, action: action): ImageUpdatingReducer => {

    switch (action.type) {

        case 'init': 
            let initImg = { ...action.payload, main_image: false, delete: false, description: action.payload.description?.toString() }
        return {
            ...state,
            initImages: [...state.initImages, initImg],
            imagesToSend: [...state.initImages, initImg]
        }

        case 'add':
            let image = { ...action.payload, main_image: false, delete: false, description: action.payload.description?.toString() }
            return {
                ...state,
                imagesToSend: [...state.imagesToSend, image]
            }


        case 'delete':
            const newImagesToSend = state.imagesToSend.filter(( img ) => img.url_image !== action.payload.url_image)
            const deleteImageFromState = state.imagesToSend.filter(( img ) => img.url_image === action.payload.url_image)[0]
            const deleting = {...deleteImageFromState, delete: true}

            if(state.initImages.find(img => img.url_image === action.payload.url_image)) {
                return {
                    ...state,
                    imagesToSend: [...newImagesToSend, deleting ]
                }
            } else {
                return {
                    ...state,
                    imagesToSend: [...newImagesToSend ]
                }
            }



        case 'select':
            const imageSelected = state.imagesToSend.filter(( img ) => img.url_image === action.payload.url_image)[0]
            const imageSelectedToSend = {...imageSelected, main_image: true}
            const imagesFilter = state.imagesToSend.filter(( img ) => img.url_image !== action.payload.url_image)
            const imagesUnselecting = imagesFilter.map(( img ) => {
                return {...img, main_image: false}
            })
            return {
                ...state,
                imageSelected: action.payload,
                imagesToSend: [...imagesUnselecting, imageSelectedToSend]
            }


        case 'unselected':
            const imageSend = state.imagesToSend.map(( img ) => ({...img, main_image: false}))
            return {
                ...state,
                imageSelected: null,
                imagesToSend: imageSend
            }


        default:
            return state;
    }
}