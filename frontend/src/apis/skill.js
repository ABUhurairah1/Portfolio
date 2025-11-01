import axiosInstance from '../utils/axios';

// Helper function to convert data to FormData if it contains files
const toFormData = (data) => {
  // Check if data contains any File objects
  const hasFile = Object.values(data).some(value => value instanceof File);
  
  if (hasFile) {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if (data[key] !== null && data[key] !== undefined) {
        // FormData values must be string, File, or Blob
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

export const getSkillList = async () => {
  try {
    const response = await axiosInstance.get('/portfolio/skill/');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch skills' };
  }
};

export const getSkillDetail = async (pk) => {
  try {
    const response = await axiosInstance.get(`/portfolio/skill/${pk}/`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch skill' };
  }
};

export const createSkill = async (data) => {
  try {
    const formData = toFormData(data);
    const response = await axiosInstance.post('/portfolio/skill/create/', formData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to create skill' };
  }
};

export const updateSkill = async (pk, data) => {
  try {
    const formData = toFormData(data);
    const response = await axiosInstance.put(`/portfolio/skill/${pk}/update/`, formData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to update skill' };
  }
};

export const deleteSkill = async (pk) => {
  try {
    const response = await axiosInstance.delete(`/portfolio/skill/${pk}/delete/`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to delete skill' };
  }
};

