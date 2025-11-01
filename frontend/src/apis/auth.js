import axiosInstance from '../utils/axios';

/**
 * Admin login API
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise} Login response with tokens and user data
 */
export const login = async (email, password) => {
  try {
    const response = await axiosInstance.post('/admin_pannel/login/', {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Login failed' };
  }
};

/**
 * Logout - Clear tokens from localStorage
 */
export const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user');
};

/**
 * Get current user from localStorage
 * @returns {Object|null} User object or null
 */
export const getCurrentUser = () => {
  try {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

/**
 * Check if user is authenticated
 * @returns {boolean}
 */
export const isAuthenticated = () => {
  return !!localStorage.getItem('access_token');
};

/**
 * Check if user is admin
 * @returns {boolean}
 */
export const isAdmin = () => {
  const user = getCurrentUser();
  return user?.is_admin === true;
};

/**
 * Change password API
 * @param {string} currentPassword - Current password
 * @param {string} newPassword - New password
 * @returns {Promise} Response with success message
 */
export const changePassword = async (currentPassword, newPassword) => {
  try {
    const response = await axiosInstance.post('/admin_pannel/change-password/', {
      current_password: currentPassword,
      new_password: newPassword,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to change password' };
  }
};

/**
 * Refresh access token using refresh token
 * @returns {Promise} New tokens
 */
export const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await axiosInstance.post('/api/token/refresh/', {
      refresh: refreshToken,
    });

    const { access } = response.data;
    localStorage.setItem('access_token', access);
    return access;
  } catch (error) {
    logout();
    throw error;
  }
};