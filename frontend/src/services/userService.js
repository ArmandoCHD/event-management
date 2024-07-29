import axiosInstance from '../axiosConfig';

export const getUsers = async () => {
  try {
    const response = await axiosInstance.get('/users');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createUser = async (userData) => {
  try {
    const response = await axiosInstance.post('/users', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (userId, userData) => {
  try {
    const response = await axiosInstance.put(`/users/${userId}`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await axiosInstance.delete(`/users/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
