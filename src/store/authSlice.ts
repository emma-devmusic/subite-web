
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
        setAuthState(state, action: PayloadAction<User>) {
            state.user = action.payload;
            if(action.payload?.id) {
                state.isLogged = true
            } else {
                state.isLogged = false
            }
        },
        logout(state) {
            state.isLogged = false;
            state.user = null;
        }
    }
});

export const { login, logout, setAuthState } = authSlice.actions;

export default authSlice.reducer;
