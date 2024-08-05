export interface Products {
    error:   boolean;
    code:    number;
    message: string;
    data:    ProductsData;
}

export interface ProductsData {
    items: ProductsItem[];
    meta:  ProductsMeta;
}

export interface ProductsItem {
    data_created:             Date;
    data_modified:            Date;
    id:                       number;
    name:                     string;
    product_variations:       ProductVariation[];
    created_status:           ProductCreatedStatus;
    products_audits:          ProductsAudit[];
    sub_category_id:          number;
    sub_category_description: string;
    category_id:              number;
    category_description:     string;
}

export interface ProductCreatedStatus {
    data_created:  Date;
    data_modified: Date;
    id:            number;
    description:   ProductCreatedStatusDescription;
    data_deleted?: null;
}

export enum ProductCreatedStatusDescription {
    EnProceso = "En proceso",
    Pendiente = "pendiente",
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
    stocks:                     ProductStocks;
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
    name:          ProductImageName;
    description:   ProductImageDescription;
    url_image:     URLImage;
}

export enum ProductImageDescription {
    Description1 = "description 1",
    Description2 = "description 2",
    Description3 = "description 3",
}

export enum ProductImageName {
    Image1 = "image 1",
    Image2 = "image 2",
    Image3 = "image 3",
}

export enum URLImage {
    WWWImage1COM = "www.image-1.com",
    WWWImage2COM = "www.image-2.com",
    WWWImage3COM = "www.image-3.com",
}

export interface ProductVariationVariation {
    id:        string;
    variation: VariationProduct;
}

export interface VariationProduct {
    id:               number;
    name:             string;
    unit_measurement: string;
}

export interface ProductStocks {
    id:            number;
    initial_stock: string;
    quantity:      string;
    due_date:      null;
}

export interface ProductsAudit {
    id:                   string;
    product_audit_status: ProductCreatedStatus;
}

export interface ProductsMeta {
    currentPage:    number;
    nextPage:       null;
    totalRecords:   number;
    recordsPerPage: number;
    totalPages:     number;
}





export interface NewProduct {
    title:        string;
    category:     number;
    sub_category: number;
    description:  string;
    price:        number;
    quantity:     number;
    images:       ImageProduct[];
}

export interface ImageProduct {
    name:        string;
    description: string;
    url_image:   string;
}


export interface ProductBodyToSend {
    title:        string;
    category:     number;
    sub_category: number;
    description:  string;
    price:        number;
    quantity:     number;
    images:       Image[];
}

export interface Image {
    name:        string;
    description: string;
    url_image:   string;
}



export interface ProductsSearchResponse {
    error:   boolean;
    code:    number;
    message: string;
    data:    ProductsSearchResponseData;
}

export interface ProductsSearchResponseData {
    items: any[];
    meta:  ProductsSearchResponseMeta;
}

export interface ProductsSearchResponseMeta {
    currentPage:    number;
    nextPage:       null;
    totalRecords:   number;
    recordsPerPage: number;
    totalPages:     number;
}
