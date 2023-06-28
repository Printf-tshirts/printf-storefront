import axios from "axios";
import { BACKEND_URL } from "../constants";

export const getShippingsAPI = () => {
  const token = localStorage.getItem("token");
  return axios.get(`${BACKEND_URL}/shipping/get-shippings`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
