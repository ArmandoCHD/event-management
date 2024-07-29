import axios from 'axios';
import axiosInstance from '../axiosConfig';

const API_URL = '/auth';

const authAxiosInstance = axios.create({
  baseURL: 'http://localhost:5000',
});

const login = async (credentials) => {
  try {
    const response = await authAxiosInstance.post(`${API_URL}/login`, credentials);
    const token = response.data.token;
    if (token) {
      localStorage.setItem('token', token);
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

const register = async (userData) => {
  try {
    const response = await authAxiosInstance.post(`${API_URL}/register`, userData);
    const token = response.data.token;
    if (token) {
      localStorage.setItem('token', token);
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

const verifyAndRenewToken = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }
    const response = await authAxiosInstance.post(`${API_URL}/token`, null, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const newToken = response.data.token;
    if (newToken) {
      localStorage.setItem('token', newToken);
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { login, register, verifyAndRenewToken };
