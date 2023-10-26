import { configureStore } from "@reduxjs/toolkit";
import productModalSlice from "./productModal/productModalSlice.js";
import  cartItemsSlice  from "./shopping-cart/cartItemSlice.js";
import authSlice from "./slices/authSlice.js";
import { apiSlice } from './slices/apiSlice.js'

export const store = configureStore({
    reducer:{
        productModal: productModalSlice,
        cartItems : cartItemsSlice,
        auth : authSlice,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})