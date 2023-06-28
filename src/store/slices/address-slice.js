import { createSlice } from "@reduxjs/toolkit";

const addressSlice = createSlice({
  name: "address",
  initialState: {
    addresses: [],
    selectedAddress: null,
  },
  reducers: {
    addAddress: (state, action) => {
      state.addresses.push(action.payload);
    },
    setAddresses: (state, action) => {
      state.addresses = action.payload.addresses;
    },
    removeAddress: (state, action) => {
      state.addresses = state.addresses.filter(
        (address) => address.id !== action.payload.id,
      );
    },
    selectAddress: (state, action) => {
      state.selectedAddress = action.payload;
    },
    resetAddresses: (state) => {
      state.selectedAddress = null;
      state.addresses = [];
    },
  },
});

export const {
  addAddress,
  removeAddress,
  selectAddress,
  resetAddresses,
  setAddresses,
} = addressSlice.actions;

export default addressSlice.reducer;
