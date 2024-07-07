export interface LoginResponse {
    error: boolean;
    code: number;
    message: string;
    data: Data;
}

export interface Data {
    two_factor: boolean;
    access: Access;
    permissions: string;
}

export interface Access {
    accessToken: string;
    refreshToken: string;
}


export interface RegisterResponse {
    error: boolean;
    code: number;
    message: string;
}

export interface ValidateUserData {
    email: string;
    code: string;
}

export interface CreateUserData {
    name: string;
    last_name: string;
    email: string;
    password: string;
    dni: string;
    cell_phone: string;
    cell_phone_secondary: string;
    address: string;
    age: string;
    gender_type: number;
    two_factor_enabled: boolean;
}


export interface GenderTypes {
    id: number;
    description: string;
}


export interface UserDataLogin {
    two_factor: boolean;
    access: Access;
    permissions: string;
}

export interface Access {
    accessToken: string;
    refreshToken: string;
}


export interface TwoFactorResponse {
    error: boolean;
    code: number;
    message: string;
}


export interface SendEmailVerificationResponse {
    error: boolean;
    code: number;
    message: string;
}


export interface ImagesProfileSendResponse {
    error: boolean;
    code: number;
    message: string;
}

export interface ImagesProfileUpdateResponse {
    error: boolean;
    code: number;
    message: string;
}



export interface PasswordChangeResponse {
    error: boolean;
    code: number;
    message: string;
    data: string[];
}


export interface EmailChangeResponse {
    error: boolean;
    code: number;
    message: string;
    data: string[];
}


export interface ValidateNewEmailResponse {
    error: boolean;
    code: number;
    message: string;
}


export interface TwoFactorChangeResponse {
    error: boolean;
    code: number;
    message: string;
    data: string[];
}




export interface Data2 {
    items: UserItem[];
    meta:  Meta;
}
export interface UserItem {
    user_id:              number;
    user_name:            string;
    user_last_name:       string;
    user_email:           string;
    user_phone:           string;
    role_id:              number;
    role_description:     'Administrator' | 'Client';
    user_active:          boolean;
    current_audit_id:     number;
    current_audit_status: 'aprobado' | 'en proceso' | 'pendiente';
}
export interface Meta {
    totalItems:   number;
    itemsCount:   number;
    itemsPerPage: number;
    totalPages:   number;
    currentPage:  number;
}
export interface SearchUsersResponse {
    error:   boolean;
    code:    number;
    message: string;
    data:    Data2;
}
