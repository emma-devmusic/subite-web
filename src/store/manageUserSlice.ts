import { AuditDocumentResponse, DataAuditDocumentResponse, DataUserState, UserItem, UserState } from '@/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';


const initialState: UserState = {
    isAdmin: false,
    users: [],
    usersSelected: null,
    userDocument: {signed_url: null}
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
        getDocument(state, action: PayloadAction<number | string>){
            //middleware
        },
        setDocument(state, action: PayloadAction<DataAuditDocumentResponse>) {
            state.userDocument = action.payload
        }
    }
});

export const {
    getUsers,
    getUser,
    getPermissions,
    getDocument,
    setDocument,
    setRole,
    setUser,
    setUsers } = manageUsersSlice.actions;


export default manageUsersSlice.reducer;
