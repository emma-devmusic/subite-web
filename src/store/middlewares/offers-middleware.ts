import { Dispatch, MiddlewareAPI } from "@reduxjs/toolkit";
import { store } from "..";
import { fetchData } from "@/services/fetchData";
import { uiModal, uiSetLoading } from "../slices/uiSlice";
import Swal from 'sweetalert2'
import { path_role } from "@/commons/helpers";
import { NewOfferResponse } from "@/types/offers";
import { GetOffersResponse } from "@/types/offersResponse";
import { getOffers, setOffers } from "../slices/offersSlice";
import SessionManager from "@/commons/Classes/SessionManager";

export const offersMiddleware = (state: MiddlewareAPI) => {
    const session = SessionManager.getInstance();

    return (next: Dispatch) => async (action: any) => {

        next(action);
        const token = session.getToken()
        const role_id = session.getRole() ?? 0

        if (action.type === 'offers/getOffers') {

            state.dispatch(uiSetLoading(true))
            const path = path_role(role_id) === 'admin'
                ? `/auction-process/admin/auctions/${action.payload}`
                : `/auction/clients/${action.payload}`

            try {
                console.log(path)
                const offers: GetOffersResponse = await fetchData(
                    path,
                    'GET',
                    null,
                    token
                )
                state.dispatch(setOffers(offers.data.items))
                state.dispatch(uiSetLoading(false))
            } catch (error: any) {
                state.dispatch(uiSetLoading(false))
                Swal.fire('Información', `${error.code[0]} | Fallo en la carga`, 'error')
            }
        }


        if (action.type === 'offers/createOffer') {
            state.dispatch(uiSetLoading(true))
            const path = path_role(role_id) === 'admin'
                ? `/auction-process/admin/offers`
                : `/auction/clients/offers`
            try {
                const offers: NewOfferResponse = await fetchData(
                    path,
                    'POST',
                    action.payload,
                    token
                )
                Swal.fire('Oferta Realizada', `${offers.message}`, 'success')
                state.dispatch(uiModal({
                    modalFor: 'offers',
                    modalOpen: true,
                    modalTitle: `Ofertas del producto: ${store.getState().product.productSelected.name}`
                }))
                state.dispatch(getOffers(`${store.getState().auction.auctionSelected.id}`))
                state.dispatch(uiSetLoading(false))

            } catch (error: any) {
                console.log(error)
                Swal.fire('Información', `${error.code}`, 'error')
                state.dispatch(uiSetLoading(false))
            }
        }


        if (action.type === 'offers/deleteOffer') {
            state.dispatch(uiSetLoading(true))
            const path = path_role(role_id) === 'admin'
                ? `/auction-process/admin/offers/${action.payload}`
                : `/auction/clients/offers/${action.payload}`

            try {
                const response: any = await fetchData(
                    path,
                    'DELETE',
                    null,
                    token
                )
                state.dispatch(uiModal({
                    modalFor: 'offers',
                    modalOpen: true,
                    modalTitle: `Ofertas del producto: ${store.getState().product.productSelected.name}`
                }))
                state.dispatch(getOffers(`${store.getState().auction.auctionSelected.id}`))
                Swal.fire('Info', `${response.message}`, 'success')
            } catch (error: any) {
                Swal.fire('Información', `${error.code}`, 'error')
                state.dispatch(uiSetLoading(false))
            }
        }


    }
}