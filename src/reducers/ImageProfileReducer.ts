import { ImageProfile, ImageProfileState } from "@/types"


export const imageProfileInitialState: ImageProfileState
 = {
    imageProfileSelected: null,
    images: [],
    imagesToDelete: []
}

type action = 
| { type: 'add', payload: ImageProfile }
| { type: 'delete', payload: ImageProfile }
| { type: 'select', payload: ImageProfile }
| { type: 'unselected' }

export const imageProfileReducer = (state: ImageProfileState = imageProfileInitialState, action: action): ImageProfileState => {

    switch (action.type) {
        case 'add':
            return {
                ...state,
                images: [...state.images, action.payload],
                imagesToDelete: []
            }

        case 'delete':
            return {
                ...state,
                images: state.images.filter(( img ) => img.id !== action.payload.id),
                imagesToDelete: [...state.imagesToDelete, action.payload.id]
            }

        case 'select':
            return {
                ...state,
                imageProfileSelected: action.payload
            }
        case 'unselected':
            return {
                ...state,
                imageProfileSelected: null
            }
        default:
            return state;
    }
}