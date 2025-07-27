
import { CreateUserData, DataUserProfile, ImageProfileState, LoginData, StateImagesProfile, User, ValidateUserData } from '@/types';
import { LoginActionPayload } from '@/types/authPayloads';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';



interface AuthSlice {
    validateUserData: ValidateUserData;
    newUser: CreateUserData
    isLogged: boolean;
    user: User | null;
    userProfile: DataUserProfile | null
    usersSelected: number[]
}


const initialState: AuthSlice = {
    validateUserData: { email: '', code: '' },
    newUser: {} as CreateUserData,
    isLogged: false,
    user: null,
    userProfile: null,
    usersSelected: []
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        registerUser(state, action: PayloadAction<CreateUserData>) {
            state.newUser = action.payload
        },
        loginData(state, action: PayloadAction<LoginActionPayload>) {
            // state.loginData = action.payload
        },
        login(state, action: PayloadAction<User>) {
            state.user = action.payload;
            state.isLogged = true;
        },
        setAuthState(state, action: PayloadAction<User>) {
            state.user = action.payload;
            if (action.payload?.basic_data?.email) {
                state.isLogged = true
            } else {
                state.isLogged = false
            }
        },
        logout(state) {
            //for middleware
        },
        clearRedux(state) {
            state.validateUserData = { email: '', code: '' }
            state.newUser = {} as CreateUserData
            state.isLogged = false
            state.user = null
            state.userProfile = null
        },
        email_validation(state, action: PayloadAction<ValidateUserData>) {
            state.validateUserData = action.payload
        },
        twoFactorAuthentication(state, action: PayloadAction<{ code: string; }>) {
            //for middleware
        },
        loggear() {
            //for middleware
        },
        getUserProfile() {
            //for middleware
        },
        UserProfileToRedux(state, action: PayloadAction<DataUserProfile>) {
            state.userProfile = action.payload;
        },
        sendMailVerification() {
            //for middleware
        },
        savingImages(state, action: PayloadAction<StateImagesProfile>) {
            //for middleware
        },
        updateImageProfile(state, action: PayloadAction<ImageProfileState>) {
            //for middleware
        },
        newPassword(state, action: PayloadAction<{ old_password: string; new_password: string; }>) {
            //for middleware
        },
        changeEmail(state, action: PayloadAction<{ email: string }>) {
            //for middleware
        },
        validate_email(state, action: PayloadAction<{ code: { code: string; }; }>) {
            //for middleware
        },
        two_factor_change(state, action: PayloadAction<{ two_factor_enabled: boolean }>) {
            //for middleware
        },
        send_two_factor_code_change(state, action: PayloadAction<{ code: string }>) {
            //for middleware
        },
        delete_account(state) {
            //for middleware
        },
        verify_account(state, action: PayloadAction<{ document: any[], file: any[] }>) {
            //for middleware
        },
        selectUserToggle(state, action: PayloadAction<number>) {
            if(!state.usersSelected.find( userId => userId === action.payload)){
                state.usersSelected = [ ...state.usersSelected, action.payload]
            } else {
                state.usersSelected = state.usersSelected.filter( userId => userId !== action.payload)
            }
        },
        selectUser(state, action:PayloadAction<number>) {
            if(!state.usersSelected.find( userId => userId === action.payload)){
                state.usersSelected = [ ...state.usersSelected, action.payload]
            }
        },
        unselectUser(state, action:PayloadAction<number>) {
            if(state.usersSelected.find( userId => userId === action.payload)){
                state.usersSelected = state.usersSelected.filter( userId => userId !== action.payload)
            }
        }
    }
});

export const {
    login,
    loginData,
    logout,
    setAuthState,
    registerUser,
    email_validation,
    twoFactorAuthentication,
    loggear,
    getUserProfile,
    UserProfileToRedux,
    sendMailVerification,
    savingImages,
    updateImageProfile,
    newPassword,
    clearRedux,
    changeEmail,
    validate_email,
    two_factor_change,
    send_two_factor_code_change,
    delete_account,
    verify_account,
    selectUserToggle,
    selectUser,
    unselectUser
} = authSlice.actions;

export default authSlice.reducer;
