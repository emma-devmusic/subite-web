
import { CreateUserData, LoginData, User } from '@/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';



interface AuthSlice {
    newUser: CreateUserData
    isLogged: boolean;
    loginData: LoginData;
    user: User | null;
}


const initialState: AuthSlice = {
    newUser: {} as CreateUserData,
    isLogged: false,
    loginData: { email: '', password: ''},
    user: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        registerUser(state, action: PayloadAction<CreateUserData>){
            state.newUser = action.payload
        },
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

export const { login, loginData, logout, setAuthState, registerUser } = authSlice.actions;

export default authSlice.reducer;
