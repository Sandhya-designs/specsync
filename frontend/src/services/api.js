import axios from 'axios';
import { getToken } from '../utils/tokenUtils';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Add token to every request
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle responses
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = '/login';
    }
    
    // Create error object with message
    const errorData = error.response?.data || {};
    const errorMessage = errorData.message || error.message || 'API request failed';
    const err = new Error(errorMessage);
    err.data = errorData;
    err.status = error.response?.status;
    
    return Promise.reject(err);
  }
);

export default api;
