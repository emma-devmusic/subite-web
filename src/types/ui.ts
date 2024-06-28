import { ReactElement } from "react";

export interface ModalMsg {
        typeMsg?: null | 'error' | 'info' | 'success' | 'warning' | 'spinner';
        msg?: null | string | ReactElement;
}

export interface Modal {
        modalFor: null | 'validate_code' | '2F_code' | 'new_product' | 'new_auction' | 'message' | 'loading' | 'edit_image_profile' | 'validate_new_email' | '2F_code_change';
        modalOpen: boolean;
        typeMsg?: null | 'error' | 'info' | 'success' | 'warning' | 'spinner';
        msg?: null | string | ReactElement;
}

export interface FormNewPassword {
        old_password: string;
        new_password: string;
        new_password_2: string;
}

export interface PasswordChecks {
        pass_length: boolean;
        pass_uppercase: boolean;
        pass_lowercase: boolean;
        pass_specialCaracter: boolean;
        pass_number: boolean;
        pass_2: boolean;
        pass_new_old: boolean;
}