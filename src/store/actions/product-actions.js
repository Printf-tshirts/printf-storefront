import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getProductsAPI,
  getProductByVariantHandleAPI,
  getProductsByCategoryAPI,
  getProductsBySearchAPI,
} from "../../apis/products.api";
import {
  setCategoryProducts,
  setProduct,
  setProducts,
  setProductsCount,
  setSearchProducts,
} from "../slices/product-slice";

// export const fetchProducts = createAsyncThunk(
//   "product/fetchProducts",
//   async (_, { dispatch }) => {
//     try {
//       const response = await getProductsAPI();
//       dispatch(setProducts(response.data.products));
//     } catch (error) {
//       // Handle error...
//     }
//   },
// );

export const fetchProductByVariantHandle = createAsyncThunk(
  "product/fetchProductByVariantHandle",
  async ({ variantHandle, categoryHandle, productCode }, { dispatch }) => {
    try {
      const response = await getProductByVariantHandleAPI({
        variantHandle,
        categoryHandle,
        productCode,
      });
      dispatch(setProduct(response.data.product));
    } catch (error) {
      // Handle error...
    }
  },
);

export const fetchProductsByCategory = createAsyncThunk(
  "product/fetchProductsByCategory",
  async (payload, { dispatch }) => {
    try {
      const response = await getProductsByCategoryAPI(payload);
      dispatch(setCategoryProducts(response.data.products));
      dispatch(setProductsCount(response.data.productsCount));
    } catch (error) {
      // Handle error...
    }
  },
);

export const fetchProductsBySearch = createAsyncThunk(
  "product/fetchProductsBySearch",
  async (payload, { dispatch }) => {
    try {
      const response = await getProductsBySearchAPI(payload);
      dispatch(setSearchProducts(response.data.products));
      dispatch(setProductsCount(response.data.productsCount));
    } catch (error) {
      // Handle error...
    }
  },
);
