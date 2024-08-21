
import { PayloadAction, createSlice } from '@reduxjs/toolkit';


const initialState = {
}

const manageUsersSlice = createSlice({
    name: 'manageProductClient',
    initialState,
    reducers: {
       getProducts(state, action: PayloadAction) {

       },
       getCategories(state) {

       },
       
    }
});

export const {
} = manageUsersSlice.actions;


export default manageUsersSlice.reducer;
