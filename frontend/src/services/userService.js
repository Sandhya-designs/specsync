/**
 * User Service
 * API calls for user management
 */

import api from './api';

export const userService = {
  /**
   * List all users
   */
  getAllUsers: async (filters = {}) => {
    const params = new URLSearchParams(filters);
    return api.get(`/users?${params}`);
  },

  /**
   * Get user by ID
   */
  getUserById: async (userId) => {
    return api.get(`/users/${userId}`);
  },

  /**
   * Create new user
   */
  createUser: async (userData) => {
    return api.post('/users', userData);
  },

  /**
   * Update user
   */
  updateUser: async (userId, userData) => {
    return api.put(`/users/${userId}`, userData);
  },

  /**
   * Delete user
   */
  deleteUser: async (userId) => {
    return api.delete(`/users/${userId}`);
  },

  /**
   * Get user statistics
   */
  getUserStats: async () => {
    return api.get('/users/stats/overview');
  },
};
