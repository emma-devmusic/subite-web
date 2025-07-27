import Swal from "sweetalert2";
import { Dispatch, MiddlewareAPI, PayloadAction } from "@reduxjs/toolkit";
import { uiCloseModal, uiSetLoading } from "../slices/uiSlice";
import { fetchData } from "@/services/fetchData";
import { path_role } from "@/commons/helpers";
import { getProducts } from "../slices/productSlice";
import { getParamsAuctionState } from "@/commons/helpers/auctions";
import SessionManager from "@/commons/Classes/SessionManager";

export const auctionMiddleware = (state: MiddlewareAPI) => {
  const session = SessionManager.getInstance();
  return (next: Dispatch) => async (action: PayloadAction<any>) => {
    next(action);
    const token = session.getToken()
    const role_id = session.getRole() ?? 0
    if (action.type === "auction/newAuction") {
      state.dispatch(uiSetLoading(true));
      console.log("Llamada a la Api - AUCTION - NEW AUCTION");
      action.payload.bid_amount = parseInt(action.payload.bid_amount);
      try {
        if (action.payload.price) {
          await fetchData(
            `/manage-auction-products/${path_role(role_id)}/update`,
            "PATCH",
            {
              user_id: parseInt(action.payload.user_id),
              price: parseInt(action.payload.price),
              product_id: parseInt(action.payload.product_id),
              product_variation_id: parseInt(
                action.payload.product_variation_id
              ),
            },
            token
          );
          delete action.payload.price;
        }
        delete action.payload.user_id;
        delete action.payload.product_variation_id;
        await fetchData(
          "/auction-process/admin/auctions",
          "POST",
          action.payload,
          token
        );
        state.dispatch(uiCloseModal());
        state.dispatch(getProducts("search?page=1&limit=10"));
      } catch (error: any) {
        Swal.fire("Error", `${error.code}`, "error");
      }
      state.dispatch(uiSetLoading(false));
    }

    if (action.type === "auction/updateAuction") {
      state.dispatch(uiSetLoading(true));
      console.log("Llamada a la Api - AUCTION - UPDATE AUCTION");
      action.payload.bid_amount = parseInt(action.payload.bid_amount);
      try {
        if (action.payload.price) {
          await fetchData(
            `/manage-auction-products/${path_role(role_id)}/update`,
            "PATCH",
            {
              user_id: parseInt(action.payload.user_id),
              price: parseInt(action.payload.price),
              product_id: parseInt(action.payload.product_id),
              product_variation_id: parseInt(
                action.payload.product_variation_id
              ),
            },
            token
          );
          delete action.payload.price;
        }
        delete action.payload.user_id;
        delete action.payload.product_variation_id;
        await fetchData(
          "/auction-process/admin/auctions",
          "PATCH",
          action.payload,
          token
        );
        state.dispatch(uiCloseModal());
        state.dispatch(
          getProducts(
            "search?page=1&limit=10&with_auction=" +
              getParamsAuctionState(location.pathname)
          )
        );
      } catch (error: any) {
        Swal.fire("Error", `${error.code}`, "error");
      }
      state.dispatch(uiSetLoading(false));
    }

    if (action.type === "auction/deleteAuction") {
      state.dispatch(uiSetLoading(true));
      console.log("Llamada a la Api - AUCTION - DELETE AUCTION");
      try {
        await fetchData(
          `/auction-process/admin/auctions/${action.payload.id}`,
          "DELETE",
          null,
          token
        );
        state.dispatch(uiCloseModal());
        state.dispatch(
          getProducts(
            `search?page=1&limit=10&with_auction=${action.payload.auctionTab}`
          )
        );
      } catch (error: any) {
        Swal.fire("Error", `${error.code}`, "error");
      }
      state.dispatch(uiSetLoading(false));
    }
  };
};
