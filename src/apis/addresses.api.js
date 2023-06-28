import axios from "axios";
import { BACKEND_URL } from "../constants";

export const getAddressesAPI = () => {
  const token = localStorage.getItem("token");
  return axios.get(`${BACKEND_URL}/addresses/get-addresses`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const addAddressAPI = ({ address }) => {
  const token = localStorage.getItem("token");
  return axios.post(
    `${BACKEND_URL}/addresses/add-address`,
    { address },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const deleteAddressAPI = ({ addressId }) => {
  const token = localStorage.getItem("token");
  return axios.delete(`${BACKEND_URL}/addresses/delete-address/${addressId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
