import API from "./axios";

export const addToCart = async (productId) => {
  const response = await API.post("/cart/add", {
    productId,
  });

  return response.data;
};