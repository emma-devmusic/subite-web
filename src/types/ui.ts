import { ReactElement } from "react";

export interface ModalMsg {
        typeMsg?: null | 'error' | 'info' | 'success' | 'warning' | 'spinner';
        msg?: null | string | ReactElement;
}

export interface Modal {
        modalFor:
        | null
        | 'validate_code'
        | '2F_code'
        | 'new_product'
        | 'new_auction'
        | 'message'
        | 'loading'
        | 'edit_image_profile'
        | 'validate_new_email'
        | '2F_code_change'
        | 'verify_account'
        | 'audit_document'
        | 'audit_user'
        | 'category'
        | 'categoryInfo'
        | 'audit_product'
        | 'new_auction'
        | 'offers'
        | 'new_offer'
        | 'edit_auction';
        modalOpen?: boolean;
        modalTitle?: string;
        typeMsg?: null | 'error' | 'info' | 'success' | 'warning' | 'spinner';
        msg?: null | string | ReactElement;
        onAccept?: null | (() => void);
        onClose?: null | (() => void);
        onCancel?: null | (() => void);
        data?: unknown;
        automaticClose?: boolean;
        timeToClose?: number;
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



export interface QueryObject {
        pageQuerys: string;
        searchQuerys: string;
}


