import { NewOfferAdmin, NewOfferClients, OffersState } from "@/types/offers";
import { ItemGetOffersResponse, MetaGetOffersResponse } from "@/types/offersResponse";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState: OffersState = {
    bestOffer: {amount: 0} as ItemGetOffersResponse,
    offers: [],
    offerSelected: null,
    offersMeta: {} as MetaGetOffersResponse
}



const offersSlice = createSlice({
    name: 'offers',
    initialState,
    reducers: {
        // Add reducers here
        getOffers(state, action: PayloadAction<string>){},

        setOffers(state, action: PayloadAction<ItemGetOffersResponse[]>){
            state.offers = action.payload;
            action.payload.forEach( offer => {
                if(offer.amount > state.bestOffer?.amount) {
                    state.bestOffer = offer
                }
            })
        },
        createOffer(state, action: PayloadAction<NewOfferClients | NewOfferAdmin>) {

        },
        updateOffer(state, action: PayloadAction){

        },
        deleteOffer(state, action: PayloadAction<number>){

        },

        clearOffers(state){
            state.bestOffer = {amount: 0} as ItemGetOffersResponse,
            state.offers = []
            state.offerSelected = null
            state.offersMeta = {} as MetaGetOffersResponse
        }
    }
})


export const {
    getOffers,
    setOffers,
    createOffer,
    clearOffers,
    updateOffer,
    deleteOffer
} = offersSlice.actions

export default offersSlice.reducer;