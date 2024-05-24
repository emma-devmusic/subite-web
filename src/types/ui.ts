import { ReactElement } from "react";

export interface ModalMsg {
        typeMsg?: null | 'error' | 'info' | 'success' | 'warning' | 'spinner';
        msg?: null | string | ReactElement;
}

export interface Modal {
        modalFor: null | 'new_user' | '2F_code' | 'new_product' | 'new_auction' | 'message' | 'loading';
        modalOpen: boolean;
        typeMsg?: null | 'error' | 'info' | 'success' | 'warning' | 'spinner';
        msg?: null | string | ReactElement;
}