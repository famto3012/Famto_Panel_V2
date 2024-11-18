import axios from "axios";
import { EncryptStorage } from "encrypt-storage";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
const secretKey = import.meta.env.VITE_APP_LOCALSTORAGE_KEY;

const encryptStorage = new EncryptStorage(secretKey, {
  prefix: "FAMTO",
});

const refreshAccessToken = async () => {
  try {
    const refreshToken = encryptStorage.getItem("refreshToken");

    if (!refreshToken) {
      console.log("No refresh token available, logging out");
      clearStorage();
      return null;
    }

    console.log("Refreshing access token...");

    const response = await axios.post(`${BASE_URL}/auth/refresh-token`, {
      refreshToken,
    });

    const { accessToken } = response.data;

    encryptStorage.setItem("token", accessToken);

    console.log("Access token refreshed successfully:", accessToken);

    return accessToken;
  } catch (error) {
    console.log("Error refreshing access token:", error.message);
    clearStorage();
    return null;
  }
};

const clearStorage = () => {
  encryptStorage.removeItem("token");
  encryptStorage.removeItem("role");
  encryptStorage.removeItem("userId");
  encryptStorage.removeItem("fcmToken");
  encryptStorage.removeItem("username");
  encryptStorage.removeItem("refreshToken");
};

const useApiClient = (navigate) => {
  const token = encryptStorage.getItem("token");

  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401) {
        try {
          const newAccessToken = await refreshAccessToken();

          error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosInstance(error.config);
        } catch (refreshError) {
          clearStorage();
          navigate("/auth/sign-in");
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useApiClient;
