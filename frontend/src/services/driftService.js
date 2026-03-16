import api from './api';

export const driftService = {
  getAllDrift: async (projectId) => {
    return api.get(`/drift/${projectId}`);
  },

  getDriftByType: async (projectId, driftType) => {
    return api.get(`/drift/${projectId}/${driftType}`);
  },
};
