import { StateImagesProfile } from "@/types"


export const imageInitialState: StateImagesProfile
 = {
    imageSelected: null,
    images: []
}

export const imageReducer = (state: StateImagesProfile = imageInitialState, action: any): StateImagesProfile => {

    switch (action.type) {
        case 'add':
            return {
                ...state,
                images: [...state.images, action.payload]
            }

        case 'delete':
            return {
                ...state,
                images: state.images.filter((img, i) => i !== action.payload)
            }

        case 'select':
            return {
                ...state,
                imageSelected: action.payload
            }
        case 'unselected':
            return {
                ...state,
                imageSelected: null
            }
        case 'clear':
            return {
                ...state,
                images: []
            }
        default:
            return state;
    }
}