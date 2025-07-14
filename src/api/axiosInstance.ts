import axios from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:9999',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // Optional: timeout in milliseconds
});

// Attach token to outgoing requests
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.set('Authorization', `Bearer ${token}`);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle 401 Unauthorized responses gracefully
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user-email');
      localStorage.removeItem('user-name');
      localStorage.removeItem('user-role');
      // Optionally: Notify user or trigger login modal
      console.warn('Session expired or unauthorized');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
