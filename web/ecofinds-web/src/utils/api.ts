import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // Replace with your backend URL
});

// Add a request interceptor to include JWT token if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
