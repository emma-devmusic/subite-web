import { ItemHomeProductsSearchResponse, MetaHomeProductsSearchResponse } from "./homeResponse";

export interface HomeState {
    homeProducts: ItemHomeProductsSearchResponse[],
    homeActiveProduct: null,
    productMeta: MetaHomeProductsSearchResponse
}