import { Middleware, configureStore } from '@reduxjs/toolkit';

import uiReducer from './uiSlice';
import authReducer from './authSlice';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import { sessionStorageMiddleware } from './middlewares/sessionStorage-middleware';
import { registerUserMiddleware } from './middlewares/registerUser-middleware';

export const store = configureStore({
  reducer: {
    iu: uiReducer,
    auth: authReducer
  },
  middleware: ( getDefaultMiddleware  ) => getDefaultMiddleware()
  .concat( [sessionStorageMiddleware as Middleware, registerUserMiddleware as Middleware] )
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;


export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;