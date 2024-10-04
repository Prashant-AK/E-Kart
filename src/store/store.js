// src/store/store.js
import { setupListeners } from "@reduxjs/toolkit/query";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import apiSlice from "./ApiSlice";

import authReducer from "./auth/authSlice";

const rootReducer = combineReducers({
  authReducer: authReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
  //   [api]
  //   counterApi: counterApiReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([apiSlice.middleware]),
});

setupListeners(store.dispatch);
