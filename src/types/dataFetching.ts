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
