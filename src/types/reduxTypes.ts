import { isAdmin } from '../helpers/helpers';
import { DataAuditDocumentResponse, DataUserState, DataUserStatus, UserItem } from './dataFetching';
import { BasicData } from './user';

export interface LoginData {
    email: string;
    password: string;
}

export interface CreateUserDataRedux {
    name: string;
    last_name: string;
    email: string;
    password: string;
    password2: string;
    dni: string;
    cell_phone: string;
    cell_phone_secondary: string;
    address: string;
    age: string;
    gender_type: number;
    two_factor_enabled: boolean;
}

export interface User {
    role_id:    number;
    basic_data: BasicData;
    permission: Permission[];
}


export interface Permission {
    id:                 number;
    auth_module_id:     number;
    module_description: string;
    module_endpoint:    string;
    auth_actions_id:    number;
    action_description: string;
    action_method:      string;
}


export interface UserState {
    isAdmin: boolean;
    users: UserItem[];
    usersSelected: DataUserState | null;
    userDocument: DataAuditDocumentResponse;
    userStatusArray: DataUserStatus[];
}