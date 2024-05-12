
import { LoginData, User } from '@/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';



interface AuthSlice {
    isLogged: boolean;
    loginData: LoginData;
    user: User | null;
}


const initialState: AuthSlice = {
    isLogged: false,
    loginData: { email: '', password: ''},
    user: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginData(state, action:PayloadAction<LoginData>) {
            state.loginData = action.payload
        },
        login(state, action: PayloadAction<User>) {
            state.user = action.payload;
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

export const { login, loginData, logout, setAuthState } = authSlice.actions;

export default authSlice.reducer;
