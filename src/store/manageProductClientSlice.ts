
import { PayloadAction, createSlice } from '@reduxjs/toolkit';


const initialState = {
}

const manageUsersSlice = createSlice({
    name: 'manageProductClient',
    initialState,
    reducers: {
       searchProcuts(state, action: PayloadAction) {

       },
    }
});

export const {
} = manageUsersSlice.actions;


export default manageUsersSlice.reducer;
