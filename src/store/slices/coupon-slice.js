import { createSlice } from "@reduxjs/toolkit";

const couponSlice = createSlice({
  name: "shipping",
  initialState: {
    selectedCoupon: null,
  },
  reducers: {
    selectCoupon: (state, action) => {
      state.selectedCoupon = action.payload;
    },
    resetCoupon: (state) => {
      state.selectedCoupon = null;
    },
  },
});

export const { selectCoupon, resetCoupon } = couponSlice.actions;

export default couponSlice.reducer;
