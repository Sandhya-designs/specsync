import api from './api';

export const testCaseService = {
  createTestCase: async (testCaseData) => {
    return api.post('/testcases', testCaseData);
  },

  getAllTestCases: async (projectId, featureId = null, page = 1, limit = 10) => {
    let url = `/testcases?projectId=${projectId}&page=${page}&limit=${limit}`;
    if (featureId) url += `&featureId=${featureId}`;
    return api.get(url);
  },

  getTestCaseById: async (testCaseId) => {
    return api.get(`/testcases/${testCaseId}`);
  },

  updateTestCase: async (testCaseId, testCaseData) => {
    return api.put(`/testcases/${testCaseId}`, testCaseData);
  },

  deleteTestCase: async (testCaseId) => {
    return api.delete(`/testcases/${testCaseId}`);
  },
};
