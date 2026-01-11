import { create } from 'zustand';
import authService from '../services/authService';

const useAuthStore = create((set) => ({
  user: authService.getStoredUser(),
  isAuthenticated: authService.isAuthenticated(),
  isLoading: false,
  error: null,

  // Login
  login: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authService.login(credentials);
      set({
        user: response.data,
        isAuthenticated: true,
        isLoading: false,
      });
      return response;
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.message || 'Login failed',
      });
      throw error;
    }
  },

  // Register
  register: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authService.register(userData);
      set({
        user: response.data,
        isAuthenticated: true,
        isLoading: false,
      });
      return response;
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.message || 'Registration failed',
      });
      throw error;
    }
  },

  // Logout
  logout: async () => {
    await authService.logout();
    set({
      user: null,
      isAuthenticated: false,
    });
  },

  // Update user data
  updateUser: (userData) => {
    set({ user: { ...userData } });
    localStorage.setItem('user', JSON.stringify(userData));
  },

  // Clear error
  clearError: () => set({ error: null }),
}));

export default useAuthStore;
