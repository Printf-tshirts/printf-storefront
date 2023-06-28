const { createSlice } = require("@reduxjs/toolkit");

const productSlice = createSlice({
  name: "product",
  initialState: {
    // products: [],
    product: {},
    selectedVariant: {},
    categoryProducts: [],
    searchProducts: [],
    productsCount: 0,
  },
  reducers: {
    // setProducts(state, action) {
    //   state.products = action.payload;
    // },
    setProduct(state, action) {
      state.product = action.payload;
    },
    setSelectedVariant(state, action) {
      state.selectedVariant = action.payload;
    },
    setCategoryProducts(state, action) {
      state.categoryProducts = action.payload;
    },
    setProductsCount(state, action) {
      state.productsCount = action.payload;
    },
    setSearchProducts(state, action) {
      state.searchProducts = action.payload;
    },
  },
});

export const {
  // setProducts,
  setProduct,
  setSelectedVariant,
  setCategoryProducts,
  setSearchProducts,
  setProductsCount,
} = productSlice.actions;
export default productSlice.reducer;
