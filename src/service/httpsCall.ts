import axios from "axios";
import { emitLogout } from "./authEvents";

const baseURL = import.meta.env.VITE_BASE_URL;

axios.interceptors.request.use(async (config) => {
  config.baseURL = baseURL;
  const token = localStorage.getItem("accessToken");
  if (token && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/auth/refresh")
    ) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");

      if (refreshToken) {
        try {
          const response = await axios.post(`${baseURL}/auth/refresh`, {
            refreshToken,
          });

          if (response.data.code === 200 || response.data.code === 201) {
            const { accessToken, refreshToken: newRefreshToken } = response.data.data;
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", newRefreshToken);

            axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
            originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;

            return axios(originalRequest);
          }
        } catch {
          localStorage.clear();
          emitLogout();
          return Promise.reject(error);
        }
      } else {
        localStorage.clear();
        emitLogout();
      }
    }

    return Promise.reject(error);
  }
);

const httpsCall = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch,
  interceptors: axios.interceptors,
};

export default httpsCall;
