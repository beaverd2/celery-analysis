import axios from 'axios';

//local
const API_URL = 'http://127.0.0.1:8000';

const api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});
const api2 = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

api.interceptors.request.use(config => {
  config.headers.Authorization = localStorage.getItem('token');
  return config;
});

api.interceptors.response.use(
  config => {
    return config;
  },
  async error => {
    const originalRequest = error.config;
    console.log(originalRequest);
    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await api2.patch('/auth/refresh_token');
        localStorage.setItem('token', response.data.access_token);
        return api.request(originalRequest);
      } catch (error) {
        console.log('не авторизован');
      }
    }
    throw error;
  }
);

export default api;
