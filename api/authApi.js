import API, { API_FALLBACK_BASE_URLS } from './axios';

const requestAuth = async (path, data) => {
  try {
    const response = await API.post(path, data);
    return response.data;
  } catch (primaryError) {
    for (const baseURL of API_FALLBACK_BASE_URLS) {
      try {
        const response = await API.post(`${baseURL}${path}`, data);
        return response.data;
      } catch {
        // Try the next configured development URL.
      }
    }

    throw primaryError;
  }
};

const requestProfile = async (method, path, data) => {
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

export const loginUser = async (data) => {
  return requestAuth('/auth/login', data);
};

export const signupUser = async (data) => {
  return requestAuth('/auth/signup', data);
};

export const getUserProfile = async (userId) => {
  return requestProfile('get', `/auth/profile/${userId}`);
};

export const updateUserProfile = async (userId, data) => {
  return requestProfile('patch', `/auth/profile/${userId}`, data);
};
