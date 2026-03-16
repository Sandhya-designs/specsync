import api from './api';

export const requirementService = {
  createRequirement: async (requirementData) => {
    return api.post('/requirements', requirementData);
  },

  getAllRequirements: async (projectId, page = 1, limit = 10) => {
    return api.get(`/requirements?projectId=${projectId}&page=${page}&limit=${limit}`);
  },

  getRequirementById: async (requirementId) => {
    return api.get(`/requirements/${requirementId}`);
  },

  updateRequirement: async (requirementId, requirementData) => {
    return api.put(`/requirements/${requirementId}`, requirementData);
  },

  getVersionHistory: async (requirementId) => {
    return api.get(`/requirements/${requirementId}/versions`);
  },

  deleteRequirement: async (requirementId) => {
    return api.delete(`/requirements/${requirementId}`);
  },
};
