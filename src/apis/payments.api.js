import axios from "axios";
import { BACKEND_URL } from "../constants";

export const addPaymentAPI = ({ paymentId, amount }) => {
  const token = localStorage.getItem("token");
  return axios.post(
    `${BACKEND_URL}/payments/capture?paymentId=${paymentId}&amount=${amount}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
