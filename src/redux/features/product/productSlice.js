import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "../../../services/productService";
import { toast } from "react-toastify";

const initialState = {
  product: null,
  products: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  totalStoreValue: 0,
  outOfStock: 0,
  category: [],
};

// Create new product
export const createProduct = createAsyncThunk(
  "products/create",
  async (formData, thunkAPI) => {
    try {
      return await productService.createProduct(formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get all product
export const getProducts = createAsyncThunk(
  "products/getallproducts",
  async (_, thunkAPI) => {
    try {
      return await productService.getProducts();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    CALC_STORE_VALUE(state, action) {
      const products = action.payload;
      const singleProductValueArray = [];
      products.map(item => {
        const { price, quantity } = item;
        const singleProductValue = price * quantity;
        return singleProductValueArray.push(singleProductValue);
      });
      const totalValue = singleProductValueArray.reduce((a, b) => {
        return a + b;
      }, 0);
      state.totalStoreValue = totalValue;
    },
    CALT_OUT_OF_STOCK(state, action) {
      const products = action.payload;
      const singleProductQuantityArray = [];
      products.map(item => {
        const { quantity } = item;
        return singleProductQuantityArray.push(quantity);
      });
      let countOfOutOfStockProducts = 0;
      singleProductQuantityArray.forEach(number => {
        if (number === 0) {
          countOfOutOfStockProducts++;
        }
      });
      state.outOfStock = countOfOutOfStockProducts;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(createProduct.pending, state => {
        state.isLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.products.push(action.payload);
        toast.success("Product added successfully");
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getProducts.pending, state => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { CALC_STORE_VALUE, CALT_OUT_OF_STOCK } = productSlice.actions;

export const selectIsLoading = state => state.product.isLoading;
export const selectTotalStoreValue = state => state.product.totalStoreValue;
export const selectOutOfStock = state => state.product.outOfStock;
export const selectCategory = state => state.product.category;

export default productSlice.reducer;
