
export interface User {
    name: string;
    id: string;
    email: string;
    phone: string;
    urlImg: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface CreateUserData {
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

