
import { CreateUserData, DataUserProfile, ImageProfileState, LoginData, StateImagesProfile, User } from '@/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ValidateUserData } from '../types/dataFetching';



interface AuthSlice {
    validateUserData: ValidateUserData;
    newUser: CreateUserData
    isLogged: boolean;
    loginData: LoginData;
    user: User | null;
    userProfile: DataUserProfile | null
}


const initialState: AuthSlice = {
    validateUserData: {email: '', code: ''},
    newUser: {} as CreateUserData,
    isLogged: false,
    loginData: { email: '', password: ''},
    user: null,
    userProfile: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        registerUser(state, action: PayloadAction<CreateUserData>){
            state.newUser = action.payload
        },
        loginData(state, action:PayloadAction<LoginData>) {
            // state.loginData = action.payload
        },
        login(state, action: PayloadAction<User>) {
            state.user = action.payload;
            state.isLogged = true;
        },
        setAuthState(state, action: PayloadAction<User>) {
            state.user = action.payload;
            if(action.payload?.basic_data?.email) {
                state.isLogged = true
            } else {
                state.isLogged = false
            }
        },
        logout(state) {
            state.isLogged = false;
            state.user = null;
        },
        email_validation(state, action:PayloadAction<ValidateUserData>) {
            state.validateUserData = action.payload
        },
        twoFactorAuthentication(state, action: PayloadAction <{code: string;}>){
            //interceptado
        },
        loggear() {
            //interceptado
        },
        getUserProfile() {
            //Interceptado
        },
        UserProfileToRedux(state, action: PayloadAction<DataUserProfile>) {
            state.userProfile = action.payload;
        },
        sendMailVerification() {
            //Interceptado
        },
        savingImages(state, action: PayloadAction<StateImagesProfile>){
            //Interceptado
        },
        updateImageProfile( state, action: PayloadAction<ImageProfileState>){
            //Interceptado
        }
    }
});

export const { login, loginData, logout, setAuthState, registerUser, email_validation, twoFactorAuthentication, loggear, getUserProfile, UserProfileToRedux, sendMailVerification, savingImages, updateImageProfile } = authSlice.actions;

export default authSlice.reducer;
