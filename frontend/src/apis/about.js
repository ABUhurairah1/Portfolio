import axiosInstance from '../utils/axios';

export const getAboutList = async () => {
  try {
    const response = await axiosInstance.get('/portfolio/about/');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch about information' };
  }
};

export const getAboutDetail = async (pk) => {
  try {
    const response = await axiosInstance.get(`/portfolio/about/${pk}/`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch about information' };
  }
};

export const createAbout = async (data) => {
  try {
    const response = await axiosInstance.post('/portfolio/about/create/', data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to create about information' };
  }
};

export const updateAbout = async (pk, data) => {
  try {
    const response = await axiosInstance.put(`/portfolio/about/${pk}/update/`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to update about information' };
  }
};

export const deleteAbout = async (pk) => {
  try {
    const response = await axiosInstance.delete(`/portfolio/about/${pk}/delete/`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to delete about information' };
  }
};

