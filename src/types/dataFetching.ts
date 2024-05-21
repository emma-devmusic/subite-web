export interface LoginResponse {
    error:   boolean;
    code:    number;
    message: string;
    data:    Data;
}

export interface Data {
    two_factor:  boolean;
    access:      Access;
    permissions: string;
}

export interface Access {
    accessToken:  string;
    refreshToken: string;
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

