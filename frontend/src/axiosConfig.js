import axios from 'axios';
import { verifyAndRenewToken } from './services/authService';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000',
});

axiosInstance.interceptors.request.use(
  async config => {
    try {
      await verifyAndRenewToken();
      const newToken = localStorage.getItem('token');
      if (newToken) {
        config.headers['Authorization'] = `Bearer ${newToken}`;
        console.log('Token enviado:', newToken);
      }
    } catch (error) {
      console.error('Error al renovar el token:', error);
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
