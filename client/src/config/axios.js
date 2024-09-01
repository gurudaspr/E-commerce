import axios from 'axios'
import { useAuthStore } from '../store/useAuthStore.js'

// Create Axios instance
const axiosInstance = axios.create({
    baseURL: '/api/v1',  // Base URL for your API
  });
// Add a request interceptor to include token and handle different content types
axiosInstance.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token; // Get token from Zustand store

    // Only add the Authorization header if the token exists
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;