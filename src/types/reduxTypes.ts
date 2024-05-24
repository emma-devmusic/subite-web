
// export interface User {
//     name: string;
//     id: string;
//     email: string;
//     phone: string;
//     urlImg: string;
// }

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

export interface BasicData {
    name:             string;
    last_name:        string;
    email:            string;
    account_verified: boolean;
    email_verified:   boolean;
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
