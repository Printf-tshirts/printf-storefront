import axios from "axios";
import { BACKEND_URL } from "../constants";

export const getOrdersAPI = () => {
  const token = localStorage.getItem("token");
  return axios.get(`${BACKEND_URL}/orders/get-orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const getOrderByHandleAPI = ({ handle }) => {
  const token = localStorage.getItem("token");
  return axios.get(`${BACKEND_URL}/orders/get-order-by-handle/${handle}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const addOrderAPI = ({ order }) => {
  const token = localStorage.getItem("token");
  return axios.post(
    `${BACKEND_URL}/orders/add-order`,
    { order },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
