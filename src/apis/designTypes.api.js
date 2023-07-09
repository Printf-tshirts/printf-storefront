import axios from "axios";
import { BACKEND_URL } from "../constants";

export const getAllDesignTypesAPI = () => {
  return axios.get(`${BACKEND_URL}/design-types/get-all-design-types`);
};
