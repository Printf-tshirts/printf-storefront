import axios from "axios";
import { BACKEND_URL } from "../constants";

export const getAllColorsAPI = () => {
  return axios.get(`${BACKEND_URL}/colors/get-all-colors`);
};
