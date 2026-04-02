import React, { useEffect, useState } from 'react';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { Spinner, ErrorMessage } from '../components/common/Alerts';
import { Modal } from '../components/common/UIElements';
import { FormGroup, TextInput, TextArea, Select, CheckboxGroup } from '../components/common/FormElements';
import { requirementService } from '../services/requirementService';
import { projectService } from '../services/projectService';
import { useApp } from '../context/AppContext';
import { Plus, FileText, History } from 'lucide-react';
import { formatDate } from '../utils/formatters';

export const RequirementsPage = () => {
  const [requirements, setRequirements] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showVersionModal, setShowVersionModal] = useState(false);
  const [selectedReq, setSelectedReq] = useState(null);
  const [versions, setVersions] = useState([]);
  const [formData, setFormData] = useState({
    projectId: '',
    reqId: '',
    title: '',
    description: '',
    priority: 'Medium',
    acceptanceCriteria: [],
  });
  const { selectedProject } = useApp();

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (formData.projectId) {
      fetchRequirements();
    }
  }, [formData.projectId]);

  const fetchProjects = async () => {
    try {
      const result = await projectService.getAllProjects(1, 100);
      setProjects(result.data?.projects || []);
      if (selectedProject) {
        setFormData((prev) => ({ ...prev, projectId: selectedProject._id }));
      } else if (result.data?.projects?.length > 0) {
        setFormData((prev) => ({ ...prev, projectId: result.data.projects[0]._id }));
      }
    } catch (err) {
      setError(err.message || 'Failed to load projects');
    }
  };

  const fetchRequirements = async () => {
    try {
      setLoading(true);
      setError('');
      if (!formData.projectId) {
        setRequirements([]);
        return;
      }
      const result = await requirementService.getAllRequirements(formData.projectId);
      setRequirements(result.data?.requirements || []);
    } catch (err) {
      // Only show error if it's not the projectId error
      if (err.message && !err.message.includes('projectId')) {
        setError(err.message || 'Failed to load requirements');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCreateRequirement = async (e) => {
    e.preventDefault();
    try {
      await requirementService.createRequirement(formData);
      setShowModal(false);
      setFormData({
        projectId: formData.projectId,
        reqId: '',
        title: '',
        description: '',
        priority: 'Medium',
        acceptanceCriteria: [],
      });
      fetchRequirements();
    } catch (err) {
      setError(err.message || 'Failed to create requirement');
    }
  };

  const fetchVersionHistory = async (requirementId) => {
    try {
      const result = await requirementService.getVersionHistory(requirementId);
      setVersions(result.versions || []);
      setShowVersionModal(true);
    } catch (err) {
      setError(err.message || 'Failed to load version history');
    }
  };

  if (loading && requirements.length === 0) return <Spinner />;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Requirements</h1>
              <p className="text-gray-600 mt-2">Manage and track software requirements</p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="btn btn-primary flex items-center gap-2"
            >
              <Plus size={20} />
              New Requirement
            </button>
          </div>

          {error && <ErrorMessage message={error} onDismiss={() => setError('')} />}

          {/* Project Filter */}
          {projects.length > 0 && (
            <div className="mb-6">
              <FormGroup label="Select Project">
                <Select
                  value={formData.projectId}
                  onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
                  options={projects.map((p) => ({ label: p.projectName, value: p._id }))}
                />
              </FormGroup>
            </div>
          )}

          {/* Requirements List */}
          <div className="space-y-4">
            {requirements.map((req) => (
              <div key={req._id} className="card">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <FileText size={20} className="text-primary" />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{req.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{req.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-4">
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        {req.reqId}
                      </span>
                      <span className={`text-xs font-semibold ${
                        req.priority === 'Critical' ? 'text-red-600' :
                        req.priority === 'High' ? 'text-orange-600' :
                        req.priority === 'Medium' ? 'text-yellow-600' :
                        'text-green-600'
                      }`}>
                        {req.priority} Priority
                      </span>
                      <span className="text-xs text-gray-600">
                        Version {req.currentVersion}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedReq(req);
                      fetchVersionHistory(req._id);
                    }}
                    className="btn btn-secondary btn-small flex items-center gap-1"
                  >
                    <History size={16} />
                    History
                  </button>
                </div>
              </div>
            ))}
          </div>

          {requirements.length === 0 && !loading && (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">No requirements yet</p>
              <button
                onClick={() => setShowModal(true)}
                className="btn btn-primary"
              >
                Create First Requirement
              </button>
            </div>
          )}

          {/* Create Requirement Modal */}
          <Modal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            title="Create New Requirement"
            size="lg"
          >
            <form onSubmit={handleCreateRequirement} className="space-y-4">
              <FormGroup label="Project">
                <Select
                  value={formData.projectId}
                  onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
                  options={projects.map((p) => ({ label: p.projectName, value: p._id }))}
                  required
                />
              </FormGroup>

              <FormGroup label="Requirement ID">
                <TextInput
                  value={formData.reqId}
                  onChange={(e) => setFormData({ ...formData, reqId: e.target.value })}
                  placeholder="REQ-001"
                  required
                />
              </FormGroup>

              <FormGroup label="Title">
                <TextInput
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Requirement title"
                  required
                />
              </FormGroup>

              <FormGroup label="Description">
                <TextArea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detailed description..."
                  rows="4"
                  required
                />
              </FormGroup>

              <FormGroup label="Priority">
                <Select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  options={[
                    { label: 'Low', value: 'Low' },
                    { label: 'Medium', value: 'Medium' },
                    { label: 'High', value: 'High' },
                    { label: 'Critical', value: 'Critical' },
                  ]}
                />
              </FormGroup>

              <div className="flex gap-3 justify-end pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Create Requirement
                </button>
              </div>
            </form>
          </Modal>

          {/* Version History Modal */}
          <Modal
            isOpen={showVersionModal}
            onClose={() => setShowVersionModal(false)}
            title={`Version History: ${selectedReq?.title}`}
            size="lg"
          >
            <div className="space-y-4">
              {versions.map((version, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">Version {version.versionNumber}</h4>
                    <span className="text-sm text-gray-600">
                      {formatDate(version.createdAt)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{version.description}</p>
                  {version.changeLog && (
                    <p className="text-sm text-gray-700 italic">
                      Changes: {version.changeLog}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </Modal>
        </div>
      </main>

      <Footer />
    </div>
  );
};
