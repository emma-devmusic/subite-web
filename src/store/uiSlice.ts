
import { Modal, ModalMsg } from '@/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface UiSlice {
    modal: Modal;
    menuOpen: boolean;
    loading: boolean;
}


const initialState: UiSlice = {
    modal: {
        modalFor: null,
        modalOpen: false,
        modalTitle: ''
    },
    menuOpen: false,
    loading: false,
}

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        uiMenu(state, action: PayloadAction<boolean>) {
            state.menuOpen = action.payload
        },
        uiSetLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload
        },
        uiModal(state, action: PayloadAction<Modal>) {
            state.modal = action.payload
        },
        uiCloseModal(state) {
            state.modal = initialState.modal
        },
        uiModalMessage(state, action: PayloadAction<ModalMsg>){
            state.modal.msg = action.payload.msg
            state.modal.typeMsg = action.payload.typeMsg
        }
    }
});

export const { uiMenu, uiSetLoading, uiModal, uiCloseModal, uiModalMessage } = uiSlice.actions;

export default uiSlice.reducer;
