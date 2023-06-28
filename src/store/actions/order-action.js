import { createAsyncThunk } from "@reduxjs/toolkit";

import { getOrderByHandleAPI } from "../../apis/orders.api";
import { setSelectedOrder } from "../slices/order-slice";

export const fetchOrder = createAsyncThunk(
  "order/fetchOrder",
  async ({ orderHandle }, { dispatch, thunkAPI }) => {
    try {
      console.log(orderHandle);
      const response = await getOrderByHandleAPI({ handle: orderHandle });
      console.log(response.data.order);
      dispatch(setSelectedOrder(response.data.order));
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);
