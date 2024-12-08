export interface CategoriesHomeResponse {
    error:   boolean;
    code:    number;
    message: string;
    data:    DataCategoriesHomeResponse;
}

export interface DataCategoriesHomeResponse {
    items: ItemDataCategoriesHomeResponse[];
    meta:  Meta;
}

export interface ItemDataCategoriesHomeResponse {
    id:             number;
    name:           string;
    description:    string;
    subcategories?: ItemDataCategoriesHomeResponse[];
}

export interface Meta {
    currentPage:    number;
    nextPage:       null;
    totalRecords:   number;
    recordsPerPage: number;
    totalPages:     number;
}
