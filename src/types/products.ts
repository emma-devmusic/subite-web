


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


//********************************************************************************** */
//  PRODUCTS SEARCH
//********************************************************************************** */


export interface ProductSearchIDResponse {
    error:   boolean;
    code:    number;
    message: string;
    data:    DataProductSearchIDResponse;
}

export interface DataProductSearchIDResponse {
    data_created:       Date;
    data_modified:      Date;
    id:                 number;
    name:               string;
    active:             boolean;
    client_can_modify:  boolean;
    manager_can_modify: boolean;
    product_variations: ProductVariationProductSearchIDResponse[];
    created_status:     Status;
    products_audits:    ProductsAudit[];
    supplier_products:  SupplierProduct[];
    sub_category:       SubCategory;
}

export interface Status {
    data_created:  Date;
    data_modified: Date;
    id:            number;
    description:   string;
    data_deleted?: null;
}

export interface ProductVariationProductSearchIDResponse {
    data_created:               Date;
    data_modified:              Date;
    id:                         number;
    name:                       string;
    description:                string;
    code:                       string;
    sku:                        string;
    price:                      string;
    weight:                     null;
    productVariationVariations: ProductVariationVariationProductSearchIDResponse[];
    stocks:                     Stock[];
    productImages:              ProductImageProductSearchIDResponse[];
}

export interface ProductImageProductSearchIDResponse {
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

export interface ProductVariationVariationProductSearchIDResponse {
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

export interface ProductsAudit {
    data_deleted:         null;
    id:                   string;
    note:                 null;
    product_audit_status: Status;
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

export interface SupplierProduct {
    id:       number;
    supplier: Supplier;
}

export interface Supplier {
    id:        number;
    name:      string;
    address:   string;
    phone:     string;
    email:     string;
    auth_user: AuthUser;
}

export interface AuthUser {
    id: number;
}




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
    supplier_products?:        SupplierItem[];
    sub_category_id:          number;
    sub_category_description: string;
    category_id:              number;
    category_description:     string;

}

export interface SupplierItem {
    id: number;
    supplier: Supplier
}

export interface Supplier {
    id: number;
    name: string;
    address: string;
    phone: string;
    email: string;
    auth_user: { id: number }
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
    description:   string;
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
    data_created?: Date;
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
















export interface UpdateProductInterface {
    product_title?:         string;
    variation_title?:       string;
    category?:              number;
    sub_category?:          number;
    product_description?:   string;
    variation_description?: string;
    product_id:             number;
    request_audit?:         boolean;
    code?:                  string;
    sku?:                   string;
    active?:                boolean;
    weight?:                number;
    price?:                 number;
    quantity?:              number;
    images?:                ImageUpdatingProduct[];
    product_variation_id:   number;
    userId?:                number;
}

export interface ImageUpdatingProduct {
    delete:         boolean;
    url_image:      string;
    id:             string;
    name?:          string;
    main_image:     boolean;
    description?:   string;
}
