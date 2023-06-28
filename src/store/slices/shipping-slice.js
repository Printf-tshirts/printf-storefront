import { createSlice } from "@reduxjs/toolkit";

const shippingSlice = createSlice({
  name: "shipping",
  initialState: {
    shippings: [],
    selectedShipping: null,
  },
  reducers: {
    setShippings: (state, action) => {
      state.shippings = action.payload.shippings;
    },
    selectShipping: (state, action) => {
      state.selectedShipping = action.payload;
    },
    resetShippings: (state) => {
      state.selectedShipping = null;
      state.shippings = [];
    },
  },
});

export const { selectShipping, resetShippings, setShippings } =
  shippingSlice.actions;

export default shippingSlice.reducer;
