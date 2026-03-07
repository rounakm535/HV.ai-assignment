import axios from 'axios';

const api = axios.create({
  baseURL: 'https://hv-ai-assignment.onrender.com/api',
});

// Add a request interceptor to append JWT token
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
