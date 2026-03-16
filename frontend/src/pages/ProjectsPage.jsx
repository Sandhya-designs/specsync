import React, { useEffect, useState } from 'react';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { Spinner, ErrorMessage, SuccessMessage } from '../components/common/Alerts';
import { Modal, Pagination } from '../components/common/UIElements';
import { FormGroup, TextInput, TextArea, Select } from '../components/common/FormElements';
import { projectService } from '../services/projectService';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, RefreshCw } from 'lucide-react';

export const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [formData, setFormData] = useState({ projectName: '', description: '', status: 'Active' });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { setSelectedProject, refreshTrigger } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, [currentPage, refreshTrigger]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const result = await projectService.getAllProjects(currentPage, 10);
      console.log('Projects API Response:', result);
      console.log('Projects array:', result.data?.projects);
      console.log('Pagination:', result.data?.pagination);
      setProjects(result.data?.projects || []);
      setTotalPages(result.data?.pagination?.totalPages || 1);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError(err.message || 'Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await projectService.updateProject(editingProjectId, formData);
        setSuccess('Project updated successfully!');
      } else {
        await projectService.createProject(formData);
        setSuccess('Project created successfully!');
      }
      setShowModal(false);
      setIsEditing(false);
      setEditingProjectId(null);
      setFormData({ projectName: '', description: '', status: 'Active' });
      fetchProjects();
    } catch (err) {
      setError(err.message || 'Failed to save project');
    }
  };

  const handleEditProject = (project) => {
    setIsEditing(true);
    setEditingProjectId(project._id);
    setFormData({
      projectName: project.projectName,
      description: project.description,
      status: project.status,
    });
    setShowModal(true);
  };

  const handleDeleteProject = async (projectId) => {
    if (window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      try {
        await projectService.deleteProject(projectId);
        setSuccess('Project deleted successfully!');
        fetchProjects();
      } catch (err) {
        setError(err.message || 'Failed to delete project');
      }
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setIsEditing(false);
    setEditingProjectId(null);
    setFormData({ projectName: '', description: '', status: 'Active' });
  };

  const handleViewDetails = (project) => {
    setSelectedProject(project);
    navigate('/requirements');
  };

  if (loading && projects.length === 0) return <Spinner />;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
              <p className="text-gray-600 mt-2">Manage your projects and track requirements</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={fetchProjects}
                className="btn btn-secondary flex items-center gap-2"
                title="Refresh projects list"
              >
                <RefreshCw size={20} />
                Refresh
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setFormData({ projectName: '', description: '', status: 'Active' });
                  setShowModal(true);
                }}
                className="btn btn-primary flex items-center gap-2"
              >
                <Plus size={20} />
                New Project
              </button>
            </div>
          </div>

          {error && <ErrorMessage message={error} onDismiss={() => setError('')} />}
          {success && <SuccessMessage message={success} onDismiss={() => setSuccess('')} />}

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div key={project._id} className="card cursor-pointer hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{project.projectName}</h3>
                    <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                    {project.status}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <button
                    onClick={() => handleViewDetails(project)}
                    className="text-primary hover:text-blue-700 font-medium text-sm"
                  >
                    View Details →
                  </button>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleEditProject(project)}
                      className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
                      title="Edit project"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={() => handleDeleteProject(project._id)}
                      className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded"
                      title="Delete project"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {projects.length === 0 && !loading && (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">No projects yet</p>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setFormData({ projectName: '', description: '', status: 'Active' });
                  setShowModal(true);
                }}
                className="btn btn-primary"
              >
                Create First Project
              </button>
            </div>
          )}

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}

          {/* Create/Edit Project Modal */}
          <Modal
            isOpen={showModal}
            onClose={handleModalClose}
            title={isEditing ? 'Edit Project' : 'Create New Project'}
          >
            <form onSubmit={handleCreateProject} className="space-y-4">
              <FormGroup label="Project Name">
                <TextInput
                  value={formData.projectName}
                  onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                  placeholder="Enter project name"
                  required
                />
              </FormGroup>

              <FormGroup label="Description">
                <TextArea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Project description..."
                  rows="4"
                  required
                />
              </FormGroup>

              <FormGroup label="Status">
                <Select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  options={[
                    { label: 'Active', value: 'Active' },
                    { label: 'On Hold', value: 'On Hold' },
                    { label: 'Completed', value: 'Completed' },
                  ]}
                />
              </FormGroup>

              <div className="flex gap-3 justify-end pt-4">
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {isEditing ? 'Update Project' : 'Create Project'}
                </button>
              </div>
            </form>
          </Modal>
        </div>
      </main>

      <Footer />
    </div>
  );
};
