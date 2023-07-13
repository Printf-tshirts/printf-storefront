import axios from "axios";
import { BACKEND_URL } from "../constants";

export const addContactAPI = (payload) => {
  return axios.post(`${BACKEND_URL}/contacts/add-contact`, {
    ...payload,
  });
};
