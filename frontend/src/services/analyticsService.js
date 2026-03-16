import api from './api';

export const analyticsService = {
  getAnalytics: async (projectId) => {
    return api.get(`/analytics/${projectId}`);
  },
};
