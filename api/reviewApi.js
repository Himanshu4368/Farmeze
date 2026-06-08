import API, { API_FALLBACK_BASE_URLS } from "./axios";

const normalizeReviews = (data) => {
  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data?.reviews)) {
    return data.reviews;
  }

  if (Array.isArray(data?.data)) {
    return data.data;
  }

  if (Array.isArray(data?.items)) {
    return data.items;
  }

  return [];
};

const requestWithFallback = async (method, path, data) => {
  try {
    const response = await API.request({
      method,
      url: path,
      data,
    });

    return response.data;
  } catch (primaryError) {
    for (const baseURL of API_FALLBACK_BASE_URLS) {
      try {
        const response = await API.request({
          method,
          url: `${baseURL}${path}`,
          data,
        });

        return response.data;
      } catch {
        // Try the next configured development URL.
      }
    }

    throw primaryError;
  }
};

export const getProductReviews = async (productId) => {
  const paths = [
    `/reviews/product/${productId}`,
    `/reviews/${productId}`,
    `/products/${productId}/reviews`,
  ];

  let lastError;

  for (const path of paths) {
    try {
      const data = await requestWithFallback("get", path);
      return normalizeReviews(data);
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError;
};

export const createProductReview = async (productId, reviewData) => {
  const paths = [
    {
      path: "/reviews",
      data: {
        productId,
        ...reviewData,
      },
    },
    {
      path: `/products/${productId}/reviews`,
      data: reviewData,
    },
    {
      path: `/reviews/product/${productId}`,
      data: reviewData,
    },
  ];

  let lastError;

  for (const { path, data } of paths) {
    try {
      return await requestWithFallback("post", path, data);
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError;
};
