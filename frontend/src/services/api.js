import axios from 'axios';

// Create a configured instance of Axios
const api = axios.create({
  baseURL: 'http://localhost:8000', // Your Python Backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Automatic Interceptor: Attach the Token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;