

export interface NewAuctionInterface {
    init_date: string;
    end_date: string;
    publication_date: string;
    product_id: number;
    price?: number;
    bid_amount: number;
}

export interface UpdateAuctionInterface {
    init_date?: string;
    end_date?: string;
    publication_date: string;
    product_id: number;
    price?: number;
    bid_amount?: number;
}

export interface OffersAuctionSearchInterface {
    error:   boolean;
    code:    number;
    message: string;
    data:    DataOffersAuctionSearchInterface;
}

export interface DataOffersAuctionSearchInterface {
    items: ItemOffersAuctionSearchInterface[];
    meta:  MetaDataOffersAuctionSearchInterface;
}

export interface ItemOffersAuctionSearchInterface {
    id:               number;
    offer_date:       Date;
    amount:           number;
    full_name:        string;
    address:          string;
    phone:            string;
    product_auctions: ProductAuctions;
    auth_user:        AuthUser;
}

export interface AuthUser {
    id: number;
}

export interface ProductAuctions {
    data_deleted: null;
    id:           number;
}

export interface MetaDataOffersAuctionSearchInterface {
    currentPage:    number;
    nextPage:       null;
    totalRecords:   number;
    recordsPerPage: number;
    totalPages:     number;
}
