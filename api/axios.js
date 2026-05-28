import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

export const API_BASE_URL =
  "https://farmeze-backend-4.onrender.com/api";

export const API_FALLBACK_BASE_URLS =
  Platform.OS === "android"
    ? [
        "http://192.168.1.103:5000/api",
        "http://10.0.2.2:5000/api",
      ]
    : ["http://localhost:5000/api"];

const API = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});

API.interceptors.request.use(
  async (config) => {

    const token = await AsyncStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => Promise.reject(error)
);

export default API;
