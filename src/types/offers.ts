import { ItemGetOffersResponse, MetaGetOffersResponse } from "./offersResponse";

export interface OffersState {
    bestOffer: ItemGetOffersResponse;
    offers: ItemGetOffersResponse[];
    offerSelected: ItemGetOffersResponse | null;
    offersMeta: MetaGetOffersResponse;
}



export interface NewOfferAdmin {
    offer_date:                Date;
    amount:                    number;
    user_data_contact_checked: boolean;
    full_name:                 string;
    address:                   string;
    phone:                     string;
    product_auction_id:        number;
    user_id:                   number;
}


export interface NewOfferClients {
    offer_date:                Date | string;
    amount:                    number;
    product_auction_id:        number;
    user_data_contact_checked: boolean;
    fullname?:                  string;
    address?:                   string;
    phone?:                     string;
}



export interface NewOfferResponse {
    timestamp:  Date | string;
    path:       string;
    error:      boolean;
    status:     number;
    code:       string;
    type_error: string;
    message?: string;
}






