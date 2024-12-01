// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './CartSlice.js'
import authReducer from "../src/Pages/authSlice.js";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer
  },
});

export default store;
