import axios from "axios";
import { BACKEND_URL } from "../constants";

export const getCouponByCodeAPI = ({ code }) => {
  const token = localStorage.getItem("token");
  return axios.get(`${BACKEND_URL}/coupons/get-coupon-by-code?code=${code}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
