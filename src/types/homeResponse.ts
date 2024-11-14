export interface HomeProductsSearchResponse {
    error:   boolean;
    code:    number;
    message: string;
    data:    DataHomeProductsSearchResponse;
}

export interface DataHomeProductsSearchResponse {
    items: ItemHomeProductsSearchResponse[];
    meta:  MetaHomeProductsSearchResponse;
}

export interface ItemHomeProductsSearchResponse {
    data_created:             Date;
    data_modified:            Date;
    id:                       number;
    name:                     string;
    active:                   boolean;
    product_variations:       ProductVariation[];
    products_acutions:        ProductsAcution[];
    sub_category_id:          number;
    sub_category_description: string;
    category_id:              number;
    category_description:     string;
}

export interface ProductVariation {
    data_created:               Date;
    data_modified:              Date;
    id:                         number;
    name:                       string;
    description:                string;
    code:                       string;
    sku:                        string;
    price:                      string;
    weight:                     null;
    productVariationVariations: ProductVariationVariation[];
    stocks:                     Stocks;
    productImages:              ProductImage[];
}

export interface ProductImage {
    data_created:  Date;
    data_modified: Date;
    data_deleted:  null;
    user_created:  null;
    user_modified: null;
    user_deleted:  null;
    id:            string;
    name:          string;
    description:   Date;
    url_image:     string;
    main_image:    boolean;
}

export interface ProductVariationVariation {
    id:        string;
    variation: Variation;
}

export interface Variation {
    id:               number;
    name:             string;
    unit_measurement: string;
}

export interface Stocks {
    id:            number;
    initial_stock: string;
    quantity:      string;
    due_date:      null;
}

export interface ProductsAcution {
    data_deleted:     null;
    id:               number;
    init_date:        Date;
    end_date:         Date;
    bid_amount:       number;
    publication_date: Date;
}

export interface MetaHomeProductsSearchResponse {
    currentPage:    number;
    nextPage:       null;
    totalRecords:   number;
    recordsPerPage: number;
    totalPages:     number;
}
