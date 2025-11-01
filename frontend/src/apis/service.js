import axiosInstance from '../utils/axios';

// Helper function to convert data to FormData if it contains files
const toFormData = (data) => {
  const hasFile = Object.values(data).some(value => value instanceof File);
  
  if (hasFile) {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if (data[key] !== null && data[key] !== undefined) {
        const value = data[key];
        if (value instanceof File) {
          formData.append(key, value);
        } else if (typeof value === 'number' || typeof value === 'boolean') {
          formData.append(key, value.toString());
        } else if (typeof value === 'object') {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value);
        }
      }
    });
    return formData;
  }
  
  return data;
};

export const getServiceList = async () => {
  try {
    const response = await axiosInstance.get('/portfolio/service/');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch services' };
  }
};

export const getServiceDetail = async (pk) => {
  try {
    const response = await axiosInstance.get(`/portfolio/service/${pk}/`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch service' };
  }
};

export const createService = async (data) => {
  try {
    const formData = toFormData(data);
    const response = await axiosInstance.post('/portfolio/service/create/', formData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to create service' };
  }
};

export const updateService = async (pk, data) => {
  try {
    const formData = toFormData(data);
    const response = await axiosInstance.put(`/portfolio/service/${pk}/update/`, formData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to update service' };
  }
};

export const deleteService = async (pk) => {
  try {
    const response = await axiosInstance.delete(`/portfolio/service/${pk}/delete/`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to delete service' };
  }
};

