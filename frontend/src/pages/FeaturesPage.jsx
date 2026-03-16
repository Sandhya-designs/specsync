import React, { useEffect, useState } from 'react';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { Spinner, ErrorMessage, SuccessMessage } from '../components/common/Alerts';
import { Modal } from '../components/common/UIElements';
import { FormGroup, TextInput, TextArea, Select } from '../components/common/FormElements';
import { featureService } from '../services/featureService';
import { requirementService } from '../services/requirementService';
import { projectService } from '../services/projectService';
import { useApp } from '../context/AppContext';
import { Plus, Zap } from 'lucide-react';

export const FeaturesPage = () => {
  const [features, setFeatures] = useState([]);
  const [requirements, setRequirements] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    projectId: '',
    featureName: '',
    description: '',
    requirementId: null,
    implementedVersion: null,
    status: 'Planning',
  });
  const { selectedProject } = useApp();

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (formData.projectId) {
      fetchFeatures();
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

  const fetchFeatures = async () => {
    try {
      setLoading(true);
      const result = await featureService.getAllFeatures(formData.projectId);
      setFeatures(result.data?.features || []);
    } catch (err) {
      setError(err.message || 'Failed to load features');
    } finally {
      setLoading(false);
    }
  };

  const fetchRequirements = async () => {
    try {
      const result = await requirementService.getAllRequirements(formData.projectId, 1, 100);
      setRequirements(result.data?.requirements || []);
    } catch (err) {
      console.error('Failed to load requirements:', err);
    }
  };

  const handleCreateFeature = async (e) => {
    e.preventDefault();
    try {
      await featureService.createFeature(formData);
      setSuccess('Feature created successfully!');
      setShowModal(false);
      setFormData({
        projectId: formData.projectId,
        featureName: '',
        description: '',
        requirementId: null,
        implementedVersion: null,
        status: 'Planning',
      });
      fetchFeatures();
    } catch (err) {
      setError(err.message || 'Failed to create feature');
    }
  };

  if (loading && features.length === 0) return <Spinner />;

  const statuses = ['Planning', 'In Development', 'Complete', 'Testing', 'Released'];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Features</h1>
              <p className="text-gray-600 mt-2">Manage feature implementations and track progress</p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="btn btn-primary flex items-center gap-2"
            >
              <Plus size={20} />
              New Feature
            </button>
          </div>

          {error && <ErrorMessage message={error} onDismiss={() => setError('')} />}
          {success && <SuccessMessage message={success} onDismiss={() => setSuccess('')} />}

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

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div key={feature._id} className="card">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <Zap size={20} className="text-yellow-500" />
                      <h3 className="text-lg font-semibold text-gray-900">{feature.featureName}</h3>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
                  </div>
                </div>
                <div className="space-y-2 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Status</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium  ${
                      feature.status === 'Released' ? 'bg-green-100 text-green-800' :
                      feature.status === 'Testing' ? 'bg-blue-100 text-blue-800' :
                      feature.status === 'Complete' ? 'bg-green-50 text-green-700' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {feature.status}
                    </span>
                  </div>
                  {feature.requirementId ? (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Version</span>
                      <span className="text-sm font-medium text-gray-900">
                        v{feature.implementedVersion || 1}
                      </span>
                    </div>
                  ) : (
                    <div className="bg-red-50 border border-red-200 rounded p-2">
                      <span className="text-xs text-red-700">⚠️ Orphan feature - no requirement</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {features.length === 0 && !loading && (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">No features yet</p>
              <button
                onClick={() => setShowModal(true)}
                className="btn btn-primary"
              >
                Create First Feature
              </button>
            </div>
          )}

          {/* Create Feature Modal */}
          <Modal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            title="Create New Feature"
            size="lg"
          >
            <form onSubmit={handleCreateFeature} className="space-y-4">
              <FormGroup label="Feature Name">
                <TextInput
                  value={formData.featureName}
                  onChange={(e) => setFormData({ ...formData, featureName: e.target.value })}
                  placeholder="Feature name"
                  required
                />
              </FormGroup>

              <FormGroup label="Description">
                <TextArea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Feature description..."
                  rows="3"
                  required
                />
              </FormGroup>

              <FormGroup label="Linked Requirement (Optional)">
                <Select
                  value={formData.requirementId || ''}
                  onChange={(e) => setFormData({ ...formData, requirementId: e.target.value || null })}
                  options={requirements.map((r) => ({ label: `${r.reqId} - ${r.title}`, value: r._id }))}
                />
              </FormGroup>

              <FormGroup label="Status">
                <Select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  options={statuses.map((s) => ({ label: s, value: s }))}
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
                  Create Feature
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
