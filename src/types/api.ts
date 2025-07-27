export interface ResponseApiDing<T = unknown> {
    error: boolean;
    code: string;
    message: string;
    data: T;
}


export interface DataErrorResponse {
    timestamp: Date;
    path: string;
    error: boolean;
    status: number;
    code: string;
    message: string;
    type_error: string;
}

export type FetchMethod = 'POST' | 'GET' | 'DELETE' | 'PUT' | 'PATCH' | 'OPTIONS'