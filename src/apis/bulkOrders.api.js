import axios from "axios";
import { BACKEND_URL } from "../constants";

export const addBulkOrderAPI = (payload) => {
  return axios.post(`${BACKEND_URL}/bulk-orders/add-bulk-order`, {
    ...payload,
  });
};
