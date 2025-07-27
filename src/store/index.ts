import { Middleware, configureStore } from '@reduxjs/toolkit';

import uiReducer from './slices/uiSlice';
import authReducer from './slices/authSlice';
import manageUserReducer from './slices/manageUserSlice';
import categoryReducer from './slices/categorySlice';
import productReducer from './slices/productSlice';
import auctionReducer from './slices/auctionSlice';
import homeReducer from './slices/homeSlice';
import homeCategoriesReducer from './slices/homeCategoriesSlice';
import offersReducer from './slices/offersSlice';

import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import { authMiddleware } from './middlewares/auth-middleware';
import { registerUserMiddleware } from './middlewares/registerUser-middleware';
import { profileUserMiddleware } from './middlewares/profileUser-middleware';
import { configUserMiddleware } from './middlewares/configUser-middleware';
import { manageUserAuditsMiddleware } from './middlewares/manageUserAudits-middleware';
import { manageCategoryMiddleware } from './middlewares/manage-categories-middleware';
import { manageProductMiddleware } from './middlewares/manage-products-middleware';
import { auctionMiddleware } from './middlewares/auction-middleware';
import { offersMiddleware } from './middlewares/offers-middleware';
import { homeCategoriesMiddleware } from './middlewares/home-categories-middleware';
import { homeMiddleware } from './middlewares/home-middleware';

const middlewares = [
  authMiddleware,
  registerUserMiddleware,
  profileUserMiddleware,
  configUserMiddleware,
  manageUserAuditsMiddleware,
  manageCategoryMiddleware,
  manageProductMiddleware,
  auctionMiddleware,
  offersMiddleware,
  homeMiddleware,
  homeCategoriesMiddleware
] as Middleware[]

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    auth: authReducer,
    manageUser: manageUserReducer,
    category: categoryReducer,
    product: productReducer,
    auction: auctionReducer,
    home: homeReducer,
    homeCategories: homeCategoriesReducer,
    offers: offersReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }).concat(middlewares)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;


export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;