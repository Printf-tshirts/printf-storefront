import axios from "axios";
import { BACKEND_URL } from "../constants";

export const getCartAPI = () => {
  const token = localStorage.getItem("token");
  return axios.get(`${BACKEND_URL}/cart/get-cart`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const updateCartAPI = ({ cart }) => {
  return axios.post(`${BACKEND_URL}/cart/update-cart`, { cart });
};
