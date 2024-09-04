// export interface Products {
//     error:   boolean;
//     code:    number;
//     message: string;
//     data:    ProductsData;
// }

// export interface ProductsData {
//     items: ProductsItem[];
//     meta:  ProductsMeta;
// }

// export interface ProductsItem {
//     data_created:             Date;
//     data_modified:            Date;
//     id:                       number;
//     name:                     string;
//     product_variations:       ProductVariation[];
//     created_status:           ProductCreatedStatus;
//     products_audits:          ProductsAudit[];
//     sub_category_id:          number;
//     sub_category_description: string;
//     category_id:              number;
//     category_description:     string;
// }

// export interface ProductCreatedStatus {
//     data_created:  Date;
//     data_modified: Date;
//     id:            number;
//     description:   ProductCreatedStatusDescription;
//     data_deleted?: null;
// }

// export enum ProductCreatedStatusDescription {
//     EnProceso = "En proceso",
//     Pendiente = "pendiente",
// }

// export interface ProductVariation {
//     data_created:               Date;
//     data_modified:              Date;
//     id:                         number;
//     name:                       string;
//     description:                string;
//     code:                       string;
//     sku:                        string;
//     price:                      string;
//     weight:                     null;
//     productVariationVariations: ProductVariationVariation[];
//     stocks:                     ProductStocks;
//     productImages:              ProductImage[];
// }

// export interface ProductImage {
//     data_created:  Date;
//     data_modified: Date;
//     data_deleted:  null;
//     user_created:  null;
//     user_modified: null;
//     user_deleted:  null;
//     id:            string;
//     name:          ProductImageName;
//     description:   ProductImageDescription;
//     url_image:     URLImage;
// }

// export enum ProductImageDescription {
//     Description1 = "description 1",
//     Description2 = "description 2",
//     Description3 = "description 3",
// }

// export enum ProductImageName {
//     Image1 = "image 1",
//     Image2 = "image 2",
//     Image3 = "image 3",
// }

// export enum URLImage {
//     WWWImage1COM = "www.image-1.com",
//     WWWImage2COM = "www.image-2.com",
//     WWWImage3COM = "www.image-3.com",
// }

// export interface ProductVariationVariation {
//     id:        string;
//     variation: VariationProduct;
// }

// export interface VariationProduct {
//     id:               number;
//     name:             string;
//     unit_measurement: string;
// }

// export interface ProductStocks {
//     id:            number;
//     initial_stock: string;
//     quantity:      string;
//     due_date:      null;
// }

// export interface ProductsAudit {
//     id:                   string;
//     product_audit_status: ProductCreatedStatus;
// }

// export interface ProductsMeta {
//     currentPage:    number;
//     nextPage:       null;
//     totalRecords:   number;
//     recordsPerPage: number;
//     totalPages:     number;
// }



export interface NewProductAdmin {
    title:        string;
    category:     number;
    sub_category: number;
    description:  string;
    price:        number;
    quantity:     number;
    user_id:      number;
    images:       ImageProduct[];
}


export interface NewProductClient {
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


// export interface ProductsSearchResponse {
//     error:   boolean;
//     code:    number;
//     message: string;
//     data:    ProductsSearchResponseData;
// }

// export interface ProductsSearchResponseData {
//     items: any[];
//     meta:  ProductsSearchResponseMeta;
// }

// export interface ProductsSearchResponseMeta {
//     currentPage:    number;
//     nextPage:       null;
//     totalRecords:   number;
//     recordsPerPage: number;
//     totalPages:     number;
// }

//********************************************************************************** */
//  PRODUCTS SEARCH
//********************************************************************************** */


export interface ProductSearchResponse {
    error:   boolean;
    code:    number;
    message: string;
    data:    DataProductSearchResponse;
}

export interface DataProductSearchResponse {
    items: ItemProductSearchResponse[];
    meta:  Meta;
}

export interface ItemProductSearchResponse {
    data_created:             Date;
    data_modified:            Date;
    id:                       number;
    name:                     string;
    active:                   boolean;
    client_can_modify:        boolean;
    manager_can_modify:       boolean;
    product_variations:       ProductVariation[];
    created_status:           Status;
    products_audits:          ProductsAudit[];
    sub_category_id:          number;
    sub_category_description: string;
    category_id:              number;
    category_description:     string;
}

export interface Status {
    data_created:  Date;
    data_modified: Date;
    id:            number;
    description:   string;
    data_deleted?: null;
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

export interface ProductsAudit {
    data_deleted:         null;
    id:                   string;
    product_audit_status: Status;
}

export interface Meta {
    currentPage:    number;
    nextPage:       null;
    totalRecords:   number;
    recordsPerPage: number;
    totalPages:     number;
}




// export interface ProductSearchResponse {
//     error:   boolean;
//     code:    number;
//     message: string;
//     data:    ProductData;
// }

// export interface ProductData {
//     data_created:       Date;
//     data_modified:      Date;
//     id:                 number;
//     name:               string;
//     active:             boolean;
//     client_can_modify:  boolean;
//     manager_can_modify: boolean;
//     product_variations: ProductVariation[];
//     created_status:     ProductStatus;
//     products_audits:    ProductsAudit[];
//     supplier_products:  SupplierProduct[];
//     sub_category:       SubCategory;
// }

// export interface ProductStatus {
//     data_created:  Date;
//     data_modified: Date;
//     id:            number;
//     description:   string;
//     data_deleted?: null;
// }

// export interface ProductVariation {
//     data_created:               Date;
//     data_modified:              Date;
//     id:                         number;
//     name:                       string;
//     description:                string;
//     code:                       string;
//     sku:                        string;
//     price:                      string;
//     weight:                     null;
//     productVariationVariations: ProductVariationVariation[];
//     stocks:                     Stock[];
//     productImages:              ProductImage[];
// }

// export interface ProductImage {
//     data_created:  Date;
//     data_modified: Date;
//     data_deleted:  null;
//     user_created:  null;
//     user_modified: null;
//     user_deleted:  null;
//     id:            string;
//     name:          string;
//     description:   string;
//     url_image:     string;
//     main_image:    boolean;
// }

// export interface ProductVariationVariation {
//     id:        string;
//     variation: Variation;
// }

// export interface Variation {
//     id:               number;
//     name:             string;
//     unit_measurement: string;
// }

// export interface Stock {
//     id:            number;
//     quantity:      string;
//     initial_stock: string;
//     due_date:      null;
// }

// export interface ProductsAudit {
//     id:                   string;
//     note:                 string;
//     product_audit_status: ProductStatus;
// }

// export interface SubCategory {
//     id:          number;
//     description: string;
//     category:    Category;
// }

// export interface Category {
//     id:          number;
//     description: string;
// }

// export interface SupplierProduct {
//     id:       number;
//     supplier: Supplier;
// }

// export interface Supplier {
//     id:        number;
//     name:      string;
//     address:   string;
//     phone:     string;
//     email:     string;
//     auth_user: AuthUser;
// }

// export interface AuthUser {
//     id: number;
// }



export interface NewProductInterface {
    title:         string;
    category:      number;
    sub_category:  number;
    description:   string;
    price:         number;
    quantity:      number;
    request_audit: boolean;
    images:        ImageNewProductInterface[];
}

export interface ImageNewProductInterface {
    name:        string;
    description: string;
    url_image:   string;
}


export interface NewProductInterfaceAdmin extends NewProductInterface {
    user_id: number;
}













// export interface ProductSearchResponse {
//     error:   boolean;
//     code:    number;
//     message: string;
//     data:    Data;
// }

// export interface Data {
//     items: Item[];
//     meta:  Meta;
// }

// export interface Item {
//     data_created:             Date;
//     data_modified:            Date;
//     id:                       number;
//     name:                     string;
//     active:                   boolean;
//     client_can_modify:        boolean;
//     manager_can_modify:       boolean;
//     product_variations:       ProductVariation[];
//     created_status:           Status;
//     products_audits:          ProductsAudit[];
//     sub_category_id:          number;
//     sub_category_description: string;
//     category_id:              number;
//     category_description:     string;
// }

// export interface Status {
//     data_created:  Date;
//     data_modified: Date;
//     id:            number;
//     description:   string;
//     data_deleted?: null;
// }

// export interface ProductVariation {
//     data_created:               Date;
//     data_modified:              Date;
//     id:                         number;
//     name:                       string;
//     description:                string;
//     code:                       string;
//     sku:                        string;
//     price:                      string;
//     weight:                     null;
//     productVariationVariations: ProductVariationVariation[];
//     stocks:                     Stocks;
//     productImages:              ProductImage[];
// }

// export interface ProductImage {
//     data_created:  Date;
//     data_modified: Date;
//     data_deleted:  null;
//     user_created:  null;
//     user_modified: null;
//     user_deleted:  null;
//     id:            string;
//     name:          string;
//     description:   Date;
//     url_image:     string;
//     main_image:    boolean;
// }

// export interface ProductVariationVariation {
//     id:        string;
//     variation: Variation;
// }

// export interface Variation {
//     id:               number;
//     name:             string;
//     unit_measurement: string;
// }

// export interface Stocks {
//     id:            number;
//     initial_stock: string;
//     quantity:      string;
//     due_date:      null;
// }

// export interface ProductsAudit {
//     data_deleted:         null;
//     id:                   string;
//     product_audit_status: Status;
// }

// export interface Meta {
//     currentPage:    number;
//     nextPage:       null;
//     totalRecords:   number;
//     recordsPerPage: number;
//     totalPages:     number;
// }
