import { AuctionState } from "@/types";
import { DataOffersAuctionSearchInterface, ItemOffersAuctionSearchInterface, MetaDataOffersAuctionSearchInterface, NewAuctionInterface, UpdateAuctionInterface } from "@/types/auction";
import { ItemHomeProductsSearchResponse } from "@/types/homeResponse";
import { AuctionProductItem, ItemProductSearchResponse } from "@/types/products";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";



const initialState: AuctionState = {
    auctions: [],
    auctionSelected: {} as any
}

const auctionSlice = createSlice({
    name: 'auction',
    initialState,
    reducers: {
        setAuctions(state, action: PayloadAction<AuctionProductItem[]>) {
            state.auctions = action.payload;
        },
        // setAuctionSelected(state, action:PayloadAction<AuctionProductItem>) {
        //     state.auctionSelected = action.payload;
        // },
        getAuctions() {

        },
        getAuctionById() {

        },
        newAuction(state, action: PayloadAction<NewAuctionInterface>) {},
        
        updateAuction(state, action: PayloadAction<UpdateAuctionInterface>) {},

        selectAuction(state, action:PayloadAction<ItemProductSearchResponse | ItemHomeProductsSearchResponse>) {
            state.auctionSelected = action.payload.products_acutions!.find(auction => !auction.data_deleted) as AuctionProductItem;
        },

        deleteAuction(state, action: PayloadAction<{id:number, auctionTab: string}>) {},
        clearAuctionState(state) {
            state.auctions = [];
            state.auctionSelected = {} as any;
        }
    },
})


export const {
    setAuctions, 
    getAuctions, 
    getAuctionById, 
    newAuction, 
    updateAuction, 
    selectAuction, 
    deleteAuction,
    clearAuctionState } = auctionSlice.actions;

export default auctionSlice.reducer;