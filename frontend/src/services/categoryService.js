import axiosInstance from '../axiosConfig';

export const getCategories = async () => {
    try {
        const response = await axiosInstance.get('/categories');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getCategoryById = async (id) => {
    try {
        const response = await axiosInstance.get(`/categories/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createCategory = async (categoryData) => {
    try {
        const response = await axiosInstance.post('/categories/add', categoryData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteCategory = async (id) => {
    try {
        const response = await axiosInstance.delete(`/categories/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
