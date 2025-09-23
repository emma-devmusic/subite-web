
import { CreateUserData, DataUserProfile, ImageProfileState, LoginData, StateImagesProfile, User, ValidateUserData } from '@/types';
import { LoginActionPayload } from '@/types/authPayloads';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import SessionManager from '@/commons/Classes/SessionManager';

// Función para obtener el estado inicial desde cookies
const getInitialAuthState = () => {
    // Solo en el cliente (navegador)
    if (typeof window === 'undefined') {
        return {
            validateUserData: { email: '', code: '' },
            newUser: {} as CreateUserData,
            isLogged: false,
            user: null,
            userProfile: null,
            usersSelected: []
        };
    }

    try {
        const session = SessionManager.getInstance();
        const user = session.getAuthData();
        const isLogged = session.isAuthenticated();
        
        return {
            validateUserData: { email: '', code: '' },
            newUser: {} as CreateUserData,
            isLogged,
            user,
            userProfile: null,
            usersSelected: []
        };
    } catch (error) {
        console.error('Error loading initial auth state from cookies:', error);
        return {
            validateUserData: { email: '', code: '' },
            newUser: {} as CreateUserData,
            isLogged: false,
            user: null,
            userProfile: null,
            usersSelected: []
        };
    }
};

interface AuthSlice {
    validateUserData: ValidateUserData;
    newUser: CreateUserData
    isLogged: boolean;
    user: User | null;
    userProfile: DataUserProfile | null
    usersSelected: number[]
}


const initialState: AuthSlice = getInitialAuthState();

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Mantener solo para compatibilidad con otros middlewares si es necesario
        registerUser(state, action: PayloadAction<CreateUserData>) {
            state.newUser = action.payload
        },
        // setAuthState se usa para sincronización con cookies del dashboard
        setAuthState(state, action: PayloadAction<User>) {
            state.user = action.payload;
            if (action.payload?.basic_data?.email) {
                state.isLogged = true
            } else {
                state.isLogged = false
            }
        },
        logout(state) {
            //for middleware - solo logout disponible en cliente
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
    logout,
    setAuthState,
    registerUser,
    email_validation,
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
