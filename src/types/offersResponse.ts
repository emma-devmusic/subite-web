export interface GetOffersResponse {
    error:   boolean;
    code:    number;
    message: string;
    data:    DataGetOffersResponse;
}

export interface DataGetOffersResponse {
    items: ItemGetOffersResponse[];
    meta:  MetaGetOffersResponse;
}

export interface ItemGetOffersResponse {
    id:               number;
    offer_date:       Date;
    data_created:     Date | string;
    amount:           number;
    user_data_contact_checked?: boolean;
    full_name?:        string;
    address?:          string;
    phone?:            string;
    product_auctions: ProductAuctions;
    auth_user?:        {id: number;};
}

export interface ProductAuctions {
    data_deleted: null;
    id:           number;
}

export interface MetaGetOffersResponse {
    currentPage:    number;
    nextPage:       null;
    totalRecords:   number;
    recordsPerPage: number;
    totalPages:     number;
}
