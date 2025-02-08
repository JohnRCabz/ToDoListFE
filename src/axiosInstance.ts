import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://your-backend-api.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
