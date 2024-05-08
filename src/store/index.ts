import { configureStore } from '@reduxjs/toolkit';

import uiReducer from './uiSlice';
import authReducer from './authSlice';
import { useDispatch, TypedUseSelectorHook, useSelector, useStore } from 'react-redux';

// export const store = configureStore({
//   reducer: {
    
//   },
// })

export const makeStore = () => {
  return configureStore({
    reducer: {
      iu: uiReducer,
      auth: authReducer
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']


export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore = useStore.withTypes<AppStore>()