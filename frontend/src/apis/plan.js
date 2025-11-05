import axiosInstance from '../utils/axios';

export const getPlanList = async () => {
  try {
    const response = await axiosInstance.get('/plans/');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch plans' };
  }
};

export const getPlanDetail = async (pk) => {
  try {
    const response = await axiosInstance.get(`/plans/${pk}/`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch plan' };
  }
};

export const createPlan = async (data) => {
  try {
    const response = await axiosInstance.post('/plans/create/', data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to create plan' };
  }
};

export const updatePlan = async (pk, data) => {
  try {
    const response = await axiosInstance.put(`/plans/${pk}/update/`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to update plan' };
  }
};

export const deletePlan = async (pk) => {
  try {
    const response = await axiosInstance.delete(`/plans/${pk}/delete/`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to delete plan' };
  }
};

