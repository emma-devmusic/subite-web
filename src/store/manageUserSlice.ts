import { AuditDocumentResponse, DataAuditDocumentResponse, DataUserState, DataUserStatus, UserItem, UserState } from '@/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';


const initialState: UserState = {
    isAdmin: false,
    users: [],
    usersSelected: null,
    userDocument: { signed_url: null },
    userStatusArray: null
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
        setUsers(state, action: PayloadAction<UserItem[]>) {
            state.users = action.payload
        },
        getUser(state, payload: PayloadAction<string | number>) {
            //middleware
        },
        setUser(state, action: PayloadAction<DataUserState>) {
            state.usersSelected = action.payload
        },
        getDocument(state, action: PayloadAction<number | string>) {
            //middleware
        },
        setDocument(state, action: PayloadAction<DataAuditDocumentResponse>) {
            state.userDocument = action.payload
        },
        getStatus(state) {
            //middleware
        },
        setSelectStatus(state, action: PayloadAction<DataUserStatus[]>) {
            state.userStatusArray = action.payload
        },
        setStatusAccount(state, action: PayloadAction<{status: string, note: string; id: number | string;}>) {
            //middleware
        },
        deleteUser(state, action: PayloadAction<number | string>) {
            //middleware
        }
    }
});

export const {
    getUsers,
    getUser,
    getPermissions,
    getDocument,
    getStatus,
    setDocument,
    setRole,
    setUser,
    setUsers,
    setSelectStatus,
    setStatusAccount,
    deleteUser
} = manageUsersSlice.actions;


export default manageUsersSlice.reducer;
