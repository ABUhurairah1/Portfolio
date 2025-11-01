import axiosInstance from '../utils/axios';

export const getSocialMediaList = async () => {
  try {
    const response = await axiosInstance.get('/portfolio/social-media/');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch social media links' };
  }
};

export const getSocialMediaDetail = async (pk) => {
  try {
    const response = await axiosInstance.get(`/portfolio/social-media/${pk}/`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch social media link' };
  }
};

export const createSocialMedia = async (data) => {
  try {
    const response = await axiosInstance.post('/portfolio/social-media/create/', data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to create social media link' };
  }
};

export const updateSocialMedia = async (pk, data) => {
  try {
    const response = await axiosInstance.put(`/portfolio/social-media/${pk}/update/`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to update social media link' };
  }
};

export const deleteSocialMedia = async (pk) => {
  try {
    const response = await axiosInstance.delete(`/portfolio/social-media/${pk}/delete/`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to delete social media link' };
  }
};

