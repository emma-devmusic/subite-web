export interface SearchCategoriesResponse {
    error:   boolean;
    code:    number;
    message: string;
    data:    CategoryData;
}

export interface CategoryData {
    items: CategoryItem[];
    meta:  CategoryMeta;
}

export interface CategoryItem {
    id:             number;
    name:           string;
    description:    string;
    subcategories?: CategoryItem[];
}

export interface CategoryMeta {
    currentPage:    number;
    nextPage:       null;
    totalRecords:   number;
    recordsPerPage: number;
    totalPages:     number;
}
