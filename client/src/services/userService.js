import api from './api';

const userService = {
  // Get user profile
  getProfile: async () => {
    const response = await api.get('/users/profile');
    return response.data;
  },

  // Update profile
  updateProfile: async (data) => {
    const response = await api.put('/users/profile', data);
    return response.data;
  },

  // Update password
  updatePassword: async (data) => {
    const response = await api.put('/users/password', data);
    return response.data;
  },

  // Set default resume
  setDefaultResume: async (resumeId) => {
    const response = await api.put(`/users/default-resume/${resumeId}`);
    return response.data;
  },

  // Delete account
  deleteAccount: async () => {
    const response = await api.delete('/users/account');
    return response.data;
  },
};

export default userService;
