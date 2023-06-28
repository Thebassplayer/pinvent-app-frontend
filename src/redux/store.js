import { configureStore } from "@reduxjs/toolkit";

// Reducers
import authReducer from "./features/auth/authSlice";
import productReducer from "./features/product/productSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
  },
});
