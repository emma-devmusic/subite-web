import { Middleware, configureStore } from '@reduxjs/toolkit';

import uiReducer from './uiSlice';
import authReducer from './authSlice';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import { sessionStorageMiddleware } from './middlewares/sessionStorage-middleware';
import { registerUserMiddleware } from './middlewares/registerUser-middleware';
import { profileUserMiddleware } from './middlewares/profileUser-middleware';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    auth: authReducer
  },
  middleware: ( getDefaultMiddleware  ) => getDefaultMiddleware({
    serializableCheck: false,
  })
  .concat( [sessionStorageMiddleware as Middleware, registerUserMiddleware as Middleware, profileUserMiddleware as Middleware] )
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;


export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;