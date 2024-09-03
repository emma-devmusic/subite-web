import { Middleware, configureStore } from '@reduxjs/toolkit';

import uiReducer from './uiSlice';
import authReducer from './authSlice';
import manageUserReducer from './manageUserSlice';
import categoryReducer from './categorySlice';
import productReducer from './productSlice';

import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import { sessionStorageMiddleware } from './middlewares/sessionStorage-middleware';
import { registerUserMiddleware } from './middlewares/registerUser-middleware';
import { profileUserMiddleware } from './middlewares/profileUser-middleware';
import { configUserMiddleware } from './middlewares/configUser-middleware';
import { manageUserAuditsMiddleware } from './middlewares/manageUserAudits-middleware';
import { manageCategoryMiddleware } from './middlewares/manage-categories-middleware';
import { manageProductMiddleware } from './middlewares/manage-products-middleware';

const middlewares = [
  sessionStorageMiddleware,
  registerUserMiddleware,
  profileUserMiddleware,
  configUserMiddleware,
  manageUserAuditsMiddleware,
  manageCategoryMiddleware,
  manageProductMiddleware
] as Middleware[]

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    auth: authReducer,
    manageUser: manageUserReducer,
    category: categoryReducer,
    product: productReducer
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