import axios from "axios";
import { BACKEND_URL } from "../constants";
import { objectToQueryString } from "../helpers/queryCreator";

export const getProductsAPI = () => {
  return axios.get(`${BACKEND_URL}/products/get-products`);
};

export const getProductByVariantHandleAPI = ({
  variantHandle,
  categoryHandle,
  productCode,
}) => {
  return axios.get(
    `${BACKEND_URL}/products/get-product-by-variant-handle?variantHandle=${variantHandle}&categoryHandle=${categoryHandle}&productCode=${productCode}`,
  );
};

export const getProductsByCategoryAPI = (payload) => {
  const query = objectToQueryString(payload);
  return axios.get(`${BACKEND_URL}/products/get-products-by-category?${query}`);
};

export const getProductsBySearchAPI = ({ query, skip, limit }) => {
  return axios.get(
    `${BACKEND_URL}/products/get-products-by-search?searchTerm=${query}&skip=${skip}&limit=${limit}`,
  );
};

export const getTagsFromCategoryAPI = ({ categoryHandle }) => {
  return axios.get(
    `${BACKEND_URL}/products/get-tags-from-category?categoryHandle=${categoryHandle}`,
  );
};
