import { configureStore } from "@reduxjs/toolkit";
import productModalSlice from "./productModal/productModalSlice.js";
import  cartItemsSlice  from "./shopping-cart/cartItemSlice.js";

export const store = configureStore({
    reducer:{
        productModal: productModalSlice,
        cartItems : cartItemsSlice
    }
})