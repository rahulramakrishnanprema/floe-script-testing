import axios, { AxiosInstance } from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const api: AxiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Global response interceptor to handle auth errors uniformly
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // Optionally, you could trigger a logout here
      console.warn('Unauthorized - token may be expired');
    }
    return Promise.reject(error);
  }
);
