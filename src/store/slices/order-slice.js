import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    selectedOrder: null,
  },
  reducers: {
    addOrder: (state, action) => {
      state.orders.push(action.payload);
    },
    setOrders: (state, action) => {
      state.orders = action.payload.orders;
    },
    setSelectedOrder: (state, action) => {
      state.selectedOrder = action.payload;
    },
  },
});

export const { addOrder, setOrders, setSelectedOrder } = orderSlice.actions;

export default orderSlice.reducer;
