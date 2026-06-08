import API, { API_FALLBACK_BASE_URLS } from "./axios";

export const createOrder = async (orderData) => {

  const response = await API.post(
    "/orders",
    orderData
  );

  return response.data;
};

export const getOrders = async () => {

  const response = await API.get(
    "/orders"
  );

  return response.data;
};

export const getUserOrders = async (email) => {
  if (!email) {
    return [];
  }

  const path = `/orders/user/${encodeURIComponent(email)}`;

  try {
    const response = await API.get(path);
    return response.data;
  } catch (primaryError) {
    for (const baseURL of API_FALLBACK_BASE_URLS) {
      try {
        const response = await API.get(`${baseURL}${path}`);
        return response.data;
      } catch {
        // Try the next configured development URL.
      }
    }

    throw primaryError;
  }
};

export const getOrderById = async (id) => {

  const response = await API.get(
    `/orders/${id}`
  );

  return response.data;
};
