
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface UiSlice {
    menuOpen: boolean;
    loading: boolean;
}


const initialState: UiSlice = {
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
        }
    }
});

export const { uiMenu, uiSetLoading } = uiSlice.actions;

export default uiSlice.reducer;
