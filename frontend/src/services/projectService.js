import api from './api';

export const projectService = {
  createProject: async (projectData) => {
    return api.post('/projects', projectData);
  },

  getAllProjects: async (page = 1, limit = 10) => {
    return api.get(`/projects?page=${page}&limit=${limit}`);
  },

  getProjectById: async (projectId) => {
    return api.get(`/projects/${projectId}`);
  },

  updateProject: async (projectId, projectData) => {
    return api.put(`/projects/${projectId}`, projectData);
  },

  deleteProject: async (projectId) => {
    return api.delete(`/projects/${projectId}`);
  },
};
