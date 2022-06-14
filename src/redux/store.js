import { configureStore } from "@reduxjs/toolkit";
import productModalSlice from "./productModal/productModalSlice.js";
import  cartItemsSlice  from "./shopping-cart/cartItemSlice.js";
import userSlice from "./authen/userSlice.js"
import infoUserSlice from "./authen/infoUserSlice.js";

export const store = configureStore({
    reducer:{
        productModal: productModalSlice,
        cartItems : cartItemsSlice,
        authen : userSlice,
        users : infoUserSlice,
    }
})