import api from './api';

export const authService = {
  signup: async (userData) => {
    return api.post('/auth/signup', userData);
  },

  login: async (credentials) => {
    return api.post('/auth/login', credentials);
  },

  getCurrentUser: async () => {
    return api.get('/auth/me');
  },
};
