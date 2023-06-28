export const objectToQueryString = (obj) => {
  const keys = Object.keys(obj);
  const query = keys.map((key) => `${key}=${obj[key]}`).join("&");
  return query;
};
