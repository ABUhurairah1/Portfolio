import axiosInstance from '../utils/axios';

// Helper function to convert data to FormData if it contains files
const toFormData = (data) => {
  // Check if data contains any File objects (including nested in arrays)
  const hasFile = (obj) => {
    if (obj instanceof File) return true;
    if (Array.isArray(obj)) {
      return obj.some(item => hasFile(item));
    }
    if (obj && typeof obj === 'object' && obj !== null) {
      return Object.values(obj).some(value => hasFile(value));
    }
    return false;
  };
  
  if (!hasFile(data)) {
    return data;
  }
  
  const formData = new FormData();
  
  const appendToFormData = (key, value) => {
    if (value === null || value === undefined) {
      return;
    }
    
    if (value instanceof File) {
      formData.append(key, value);
    } else if (Array.isArray(value)) {
      // Handle arrays - for nested objects, use JSON string
      value.forEach((item, index) => {
        if (item instanceof File) {
          formData.append(`${key}[${index}]`, item);
        } else if (item && typeof item === 'object') {
          // For nested objects in arrays, check if they contain files
          const hasFileInItem = hasFile(item);
          if (hasFileInItem) {
            // If item has files, append each field separately
            Object.keys(item).forEach(subKey => {
              if (item[subKey] instanceof File) {
                formData.append(`${key}[${index}].${subKey}`, item[subKey]);
              } else if (item[subKey] !== null && item[subKey] !== undefined) {
                formData.append(`${key}[${index}].${subKey}`, 
                  typeof item[subKey] === 'object' 
                    ? JSON.stringify(item[subKey]) 
                    : item[subKey].toString()
                );
              }
            });
          } else {
            // No files, just stringify the object
            formData.append(`${key}[${index}]`, JSON.stringify(item));
          }
        } else {
          formData.append(`${key}[${index}]`, item.toString());
        }
      });
    } else if (typeof value === 'object') {
      // For objects, stringify if no files
      formData.append(key, JSON.stringify(value));
    } else {
      formData.append(key, value.toString());
    }
  };
  
  Object.keys(data).forEach(key => {
    appendToFormData(key, data[key]);
  });
  
  return formData;
};

export const getProjectList = async () => {
  try {
    const response = await axiosInstance.get('/projects/');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch projects' };
  }
};

export const getProjectDetail = async (pk) => {
  try {
    const response = await axiosInstance.get(`/projects/${pk}/`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch project' };
  }
};

export const createProject = async (data) => {
  try {
    const formData = toFormData(data);
    const response = await axiosInstance.post('/projects/create/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to create project' };
  }
};

export const updateProject = async (pk, data) => {
  try {
    const formData = toFormData(data);
    const response = await axiosInstance.put(`/projects/${pk}/update/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to update project' };
  }
};

export const deleteProject = async (pk) => {
  try {
    const response = await axiosInstance.delete(`/projects/${pk}/delete/`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to delete project' };
  }
};

