import API from "./axios";

export const getPromotions = async () => {
  const response = await API.get(
    "/promotions"
  );

  return response.data;
};

export const getPromotionByCode = async (code) => {
  const response = await API.get(
    `/promotions/code/${encodeURIComponent(code.trim())}`
  );

  return response.data;
};
