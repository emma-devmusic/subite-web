export interface HomeProductResponse {
    error:   boolean;
    code:    number;
    message: string;
    data:    DataHomeProductResponse;
}

export interface DataHomeProductResponse {
    data_created:       Date;
    data_modified:      Date;
    id:                 number;
    name:               string;
    active:             boolean;
    product_variations: ProductVariation[];
    sub_category:       SubCategory;
    products_acutions:  ProductsAcution[];
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
    stocks:                     Stock[];
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

export interface Stock {
    id:            number;
    quantity:      string;
    initial_stock: string;
    due_date:      null;
}

export interface ProductsAcution {
    data_deleted:     null;
    id:               number;
    init_date:        Date;
    end_date:         Date;
    bid_amount:       number;
    publication_date: Date;
    last_offers:      LastOffers;
}

export interface LastOffers {
    total_offers: number;
    last_results: any[];
}

export interface SubCategory {
    id:          number;
    description: string;
    category:    Category;
}

export interface Category {
    id:          number;
    description: string;
}
