import { PayloadAction, createSlice } from '@reduxjs/toolkit';


const initialState = {
}

const manageUsersSlice = createSlice({
    name: 'manageUser',
    initialState,
    reducers: {
        getUsers(state) {
            //middleware
        }
    }
});

export const { getUsers } = manageUsersSlice.actions;

    
export default manageUsersSlice.reducer;
