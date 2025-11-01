import axiosInstance from '../utils/axios';

export const getResumeList = async () => {
  try {
    const response = await axiosInstance.get('/portfolio/resume/');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch resume items' };
  }
};

export const getResumeDetail = async (pk) => {
  try {
    const response = await axiosInstance.get(`/portfolio/resume/${pk}/`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch resume item' };
  }
};

export const createResume = async (data) => {
  try {
    const response = await axiosInstance.post('/portfolio/resume/create/', data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to create resume item' };
  }
};

export const updateResume = async (pk, data) => {
  try {
    const response = await axiosInstance.put(`/portfolio/resume/${pk}/update/`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to update resume item' };
  }
};

export const deleteResume = async (pk) => {
  try {
    const response = await axiosInstance.delete(`/portfolio/resume/${pk}/delete/`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to delete resume item' };
  }
};

