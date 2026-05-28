import API, { API_FALLBACK_BASE_URLS } from "./axios";

const normalizeProducts = (data) => {
  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data?.products)) {
    return data.products;
  }

  if (Array.isArray(data?.data)) {
    return data.data;
  }

  if (Array.isArray(data?.items)) {
    return data.items;
  }

  if (Array.isArray(data?.result)) {
    return data.result;
  }

  return [];
};

export const getProducts = async () => {
  return requestProducts();
};

export const getProductsByCategory = async (category) => {
  return requestProducts({ category });
};

export const getFeaturedProducts = async () => {
  return requestProducts({ featured: true });
};

const requestProducts = async (params) => {
  try {
    const response = await API.get("/products", { params });
    return normalizeProducts(response.data);
  } catch (primaryError) {
    for (const baseURL of API_FALLBACK_BASE_URLS) {
      try {
        const response = await API.get(`${baseURL}/products`, { params });
        return normalizeProducts(response.data);
      } catch {
        // Try the next configured development URL.
      }
    }

    throw primaryError;
  }
};
