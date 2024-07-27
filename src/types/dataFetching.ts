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
    conn: string;
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
    cell_phone_secondary?: string;
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
    meta: Meta;
}
export interface UserItem {
    user_id: number;
    user_name: string;
    user_last_name: string;
    user_email: string;
    user_phone: string;
    role_id: number;
    role_description: 'Administrator' | 'Client';
    user_active: boolean;
    current_audit_id: number;
    current_audit_status: 'aprobado' | 'en proceso' | 'pendiente';
}
export interface Meta {
    totalItems: number;
    itemsCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
}
export interface SearchUsersResponse {
    error: boolean;
    code: number;
    message: string;
    data: Data2;
}


export interface SearchUser {
    error: boolean;
    code: number;
    message: string;
    data: DataUserState;
}

export interface DataUserState {
    user_id: number;
    user_name: string;
    user_last_name: string;
    user_email: string;
    user_phone: string;
    cell_phone_secondary: null;
    role_id: number;
    role_description: string;
    user_active: boolean;
    user_date_created: Date;
    user_address: string;
    floor: null;
    email_verified: boolean;
    user_dni: string;
    account_verified: boolean;
    user_gender: string;
    default_image_profile: any[];
    audit_status_history: AuditStatusHistory[];
    audit_images_documents: AuditImagesDocuments[];
}

export interface AuditStatusHistory {
    id: number;
    data_created: Date;
    data_deleted: null;
    audit_status_id: number;
    audit_status_description: string;
    notes: any[];
}

export interface AuditImagesDocuments {
    content_type_image: string;
    data_created: Date;
    description: string;
    document_name: string;
    id: number
}


export interface AuditDocumentResponse {
    error: boolean;
    code: number;
    message: string;
    data: DataAuditDocumentResponse;
}

export interface DataAuditDocumentResponse {
    signed_url: string | null;
}



export interface UserStatusResponse {
    error: boolean;
    code: number;
    message: string;
    data: DataUserStatus[];
}

export interface DataUserStatus {
    id: number;
    description: string;
}


export interface SetNewUserStatusResponse {
    error:   boolean;
    code:    number;
    message: string;
}
