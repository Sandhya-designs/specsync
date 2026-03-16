import api from './api';

export const featureService = {
  createFeature: async (featureData) => {
    return api.post('/features', featureData);
  },

  getAllFeatures: async (projectId, page = 1, limit = 10) => {
    return api.get(`/features?projectId=${projectId}&page=${page}&limit=${limit}`);
  },

  getFeatureById: async (featureId) => {
    return api.get(`/features/${featureId}`);
  },

  updateFeature: async (featureId, featureData) => {
    return api.put(`/features/${featureId}`, featureData);
  },

  deleteFeature: async (featureId) => {
    return api.delete(`/features/${featureId}`);
  },
};
