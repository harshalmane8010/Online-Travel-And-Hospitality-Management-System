// src/api/axiosInstance.ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:9999',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  res => res,
  err => {
    const token = localStorage.getItem('token');
    if (err.response?.status === 401 && token) {
      console.warn('Session expired or unauthorized');
      localStorage.removeItem('token');
      localStorage.removeItem('user-email');
      localStorage.removeItem('user-name');
      localStorage.removeItem('user-role');
    }
    return Promise.reject(err);
  }
);

export default axiosInstance;
