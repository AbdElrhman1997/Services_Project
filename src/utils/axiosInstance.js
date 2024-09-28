import axios from "axios";
import { useTranslation } from "react-i18next";
const BASE_URL = process.env.REACT_APP_BASE_URL;

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL, // Your base URL
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const { i18n } = useTranslation();
    // Get the current language from i18n
    const currentLanguage = i18n.language || "en"; // Default to English if not set

    // Set the Accept-Language header
    config.headers["Accept-Language"] = currentLanguage;

    // You can also set other headers here if needed
    return config;
  },
  (error) => {
    // Handle the error
    return Promise.reject(error);
  }
);

export default axiosInstance;
