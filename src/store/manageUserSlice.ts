import { UserItem, UserState } from '@/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';


const initialState: UserState = {
    isAdmin: false,
    users: [
        {
            user_id: 1,
            user_name: "Sebastian",
            user_last_name: "Lescano",
            user_email: "fayser.dev@gmail.com",
            user_phone: "3624924514",
            role_id: 1,
            role_description: "Administrator",
            user_active: true,
            current_audit_id: 5,
            current_audit_status: "aprobado"
        },
        {
            user_id: 4,
            user_name: "Analia",
            user_last_name: "Romero",
            user_email: "ema.araujo.ea@gmail.com",
            user_phone: "3666554413",
            role_id: 2,
            role_description: "Client",
            user_active: true,
            current_audit_id: 1,
            current_audit_status: "pendiente"
        },
        {
            user_id: 5,
            user_name: "Seba",
            user_last_name: "Test 1",
            user_email: "lb.lescano.vs@gmail.com",
            user_phone: "1234567897",
            role_id: 2,
            role_description: "Client",
            user_active: true,
            current_audit_id: 2,
            current_audit_status: "en proceso"
        },
    ],
    usersSelected: {}
}

const manageUsersSlice = createSlice({
    name: 'manageUser',
    initialState,
    reducers: {
        getUsers(state, action: PayloadAction<string>) {
            //middleware
        },
        getPermissions(state) {
            //middleware
        },
        setRole(state, action: PayloadAction<boolean>) {
            state.isAdmin = action.payload
        },
        // searchUsers(state, action: PayloadAction<string>) {

        // },
        setUsers(state, action: PayloadAction<UserItem[]>) {
            state.users = action.payload
        }
    }
});

export const {
    getUsers,
    getPermissions,
    setRole,
    // searchUsers,
    setUsers } = manageUsersSlice.actions;


export default manageUsersSlice.reducer;
