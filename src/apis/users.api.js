import axios from "axios";
import { BACKEND_URL } from "../constants";

export const registerUserAPI = (payload) => {
  return axios.post(`${BACKEND_URL}/users/register`, payload);
};
export const loginUserAPI = (payload) => {
  return axios.post(`${BACKEND_URL}/users/login`, payload);
};

export const getUserAPI = () => {
  const token = localStorage.getItem("token");
  return axios.get(`${BACKEND_URL}/users/get-user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const changePasswordAPI = (payload) => {
  const token = localStorage.getItem("token");
  return axios.put(`${BACKEND_URL}/users/change-password`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateUserAPI = (payload) => {
  const token = localStorage.getItem("token");
  return axios.put(`${BACKEND_URL}/users/update-user`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
