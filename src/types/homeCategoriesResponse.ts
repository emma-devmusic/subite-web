export interface HomeCategoriesResponse {
    error:   boolean;
    code:    number;
    message: string;
    data:    DataHomeCategoriesResponse;
}

export interface DataHomeCategoriesResponse {
    items: ItemHomeCategoriesResponse[];
    meta:  Meta;
}

export interface ItemHomeCategoriesResponse {
    id:             number;
    name:           string;
    description:    string;
    subcategories?: ItemHomeCategoriesResponse[];
}

export interface Meta {
    currentPage:    number;
    nextPage:       null;
    totalRecords:   number;
    recordsPerPage: number;
    totalPages:     number;
}
