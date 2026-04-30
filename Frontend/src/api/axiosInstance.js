import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/parking`,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    const message = err.response?.data?.message || "Something went wrong";
    return Promise.reject(new Error(message));
  },
);

export default axiosInstance;
