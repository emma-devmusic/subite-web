
import { User } from '@/types/interfaces';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';



interface AuthSlice {
    isLogged: boolean;
    user: User | null;
}


const initialState: AuthSlice = {
    isLogged: false,
    user: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<User>) {
            state.user = action.payload;
            state.isLogged = true
        },
        logout(state) {
            state.isLogged = false;
            state.user = null;
        }
    }
});

export const { login, logout, } = authSlice.actions;

export default authSlice.reducer;
