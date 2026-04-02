import React, { useEffect, useState } from 'react';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { Spinner, ErrorMessage, SuccessMessage } from '../components/common/Alerts';
import { Modal } from '../components/common/UIElements';
import { FormGroup, TextInput, TextArea, Select } from '../components/common/FormElements';
import { testCaseService } from '../services/testCaseService';
import { featureService } from '../services/featureService';
import { requirementService } from '../services/requirementService';
import { projectService } from '../services/projectService';
import { useApp } from '../context/AppContext';
import { Plus, TestTube, Trash2 } from 'lucide-react';
import { formatDate } from '../utils/formatters';

export const TestCasesPage = () => {
  const [testCases, setTestCases] = useState([]);
  const [features, setFeatures] = useState([]);
  const [requirements, setRequirements] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    projectId: '',
    testCaseId: '',
    title: '',
    description: '',
    requirementId: '',
    featureId: '',
    priority: 'Medium',
    status: 'Ready',
    steps: [{ step: 1, description: '', expectedResult: '' }],
  });
  const { selectedProject } = useApp();

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (formData.projectId) {
      console.log('Project ID changed to:', formData.projectId);
      loadProjectData();
    }
  }, [formData.projectId]);

  const loadProjectData = async () => {
    try {
      await Promise.all([
        fetchTestCases(),
        fetchFeatures(),
        fetchRequirements()
      ]);
    } catch (err) {
      console.error('Error loading project data:', err);
    }
  };

  const fetchProjects = async () => {
    try {
      console.log('Fetching projects...');
      const result = await projectService.getAllProjects(1, 100);
      console.log('Projects loaded:', result.data?.projects?.length);
      setProjects(result.data?.projects || []);
      if (selectedProject) {
        console.log('Setting project from context:', selectedProject._id);
        setFormData((prev) => ({ ...prev, projectId: selectedProject._id }));
      } else if (result.data?.projects?.length > 0) {
        console.log('Setting first project:', result.data.projects[0]._id);
        setFormData((prev) => ({ ...prev, projectId: result.data.projects[0]._id }));
      }
    } catch (err) {
      console.error('Failed to fetch projects:', err);
      setError(err.message || 'Failed to load projects');
    }
  };

  const fetchTestCases = async () => {
    try {
      setLoading(true);
      setError('');
      if (!formData.projectId) {
        setTestCases([]);
        return;
      }
      const result = await testCaseService.getAllTestCases(formData.projectId);
      setTestCases(result.data?.testCases || []);
    } catch (err) {
      if (err.message && !err.message.includes('projectId')) {
        setError(err.message || 'Failed to load test cases');
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchFeatures = async () => {
    try {
      setError('');
      if (!formData.projectId) return;
      const result = await featureService.getAllFeatures(formData.projectId, 1, 100);
      setFeatures(result.data?.features || []);
    } catch (err) {
      if (err.message && !err.message.includes('projectId')) {
        setError(err.message || 'Failed to load features');
      }
    }
  };

  const fetchRequirements = async () => {
    try {
      setError('');
      if (!formData.projectId) return;
      const result = await requirementService.getAllRequirements(formData.projectId, 1, 100);
      setRequirements(result.data?.requirements || []);
    } catch (err) {
      if (err.message && !err.message.includes('projectId')) {
        setError(err.message || 'Failed to load requirements');
      }
    }
  };

  const handleCreateTestCase = async (e) => {
    e.preventDefault();
    try {
      await testCaseService.createTestCase(formData);
      setSuccess('Test case created successfully!');
      setShowModal(false);
      setFormData({
        projectId: formData.projectId,
        testCaseId: '',
        title: '',
        description: '',
        requirementId: '',
        featureId: '',
        priority: 'Medium',
        status: 'Ready',
        steps: [{ step: 1, description: '', expectedResult: '' }],
      });
      fetchTestCases();
    } catch (err) {
      setError(err.message || 'Failed to create test case');
    }
  };

  if (loading && testCases.length === 0) return <Spinner />;

  const statuses = ['Ready', 'Running', 'Passed', 'Failed', 'Skipped'];
  const priorities = ['Low', 'Medium', 'High', 'Critical'];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Test Cases</h1>
              <p className="text-gray-600 mt-2">Create and manage test cases for features</p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="btn btn-primary flex items-center gap-2"
            >
              <Plus size={20} />
              New Test Case
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

          {/* Test Cases Table */}
          <div className="card overflow-x-auto">
            {testCases.length > 0 ? (
              <table className="w-full">
                <thead className="border-b border-gray-200">
                  <tr>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">ID</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Title</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Priority</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Created</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {testCases.map((tc) => (
                    <tr key={tc._id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4 text-sm font-medium text-gray-900">{tc.testCaseId}</td>
                      <td className="py-4 px-4 text-sm text-gray-700">
                        <div className="flex items-center gap-2">
                          <TestTube size={16} className="text-blue-600" />
                          {tc.title}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          tc.status === 'Passed' ? 'bg-green-100 text-green-800' :
                          tc.status === 'Failed' ? 'bg-red-100 text-red-800' :
                          tc.status === 'Running' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {tc.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-sm">
                        <span className={`font-semibold ${
                          tc.priority === 'Critical' ? 'text-red-600' :
                          tc.priority === 'High' ? 'text-orange-600' :
                          tc.priority === 'Medium' ? 'text-yellow-600' :
                          'text-green-600'
                        }`}>
                          {tc.priority}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        {formatDate(tc.createdAt)}
                      </td>
                      <td className="py-4 px-4 text-sm">
                        <button className="text-red-600 hover:text-red-900 p-1">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 mb-4">No test cases yet</p>
                <button
                  onClick={() => setShowModal(true)}
                  className="btn btn-primary"
                >
                  Create First Test Case
                </button>
              </div>
            )}
          </div>

          {/* Create Test Case Modal */}
          <Modal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            title="Create New Test Case"
            size="lg"
          >
            <form onSubmit={handleCreateTestCase} className="space-y-4 max-h-96 overflow-y-auto">
              <FormGroup label="Test Case ID">
                <TextInput
                  value={formData.testCaseId}
                  onChange={(e) => setFormData({ ...formData, testCaseId: e.target.value })}
                  placeholder="TC-001"
                  required
                />
              </FormGroup>

              <FormGroup label="Title">
                <TextInput
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Test case title"
                  required
                />
              </FormGroup>

              <FormGroup label="Description">
                <TextArea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Description..."
                  rows="3"
                />
              </FormGroup>

              <FormGroup label="Linked Requirement">
                <Select
                  value={formData.requirementId}
                  onChange={(e) => setFormData({ ...formData, requirementId: e.target.value })}
                  options={[
                    { label: 'Select Requirement...', value: '' },
                    ...requirements.map((r) => ({ label: `${r.reqId} - ${r.title}`, value: r._id }))
                  ]}
                  required
                />
                {requirements.length === 0 && (
                  <p className="text-xs text-gray-500 mt-1">No requirements available. Create a requirement first.</p>
                )}
              </FormGroup>

              <FormGroup label="Linked Feature">
                <Select
                  value={formData.featureId}
                  onChange={(e) => setFormData({ ...formData, featureId: e.target.value })}
                  options={[
                    { label: 'Select Feature...', value: '' },
                    ...features.map((f) => ({ label: f.featureName, value: f._id }))
                  ]}
                  required
                />
                {features.length === 0 && (
                  <p className="text-xs text-gray-500 mt-1">No features available. Create a feature first.</p>
                )}
              </FormGroup>

              <div className="grid grid-cols-2 gap-4">
                <FormGroup label="Priority">
                  <Select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    options={priorities.map((p) => ({ label: p, value: p }))}
                  />
                </FormGroup>

                <FormGroup label="Status">
                  <Select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    options={statuses.map((s) => ({ label: s, value: s }))}
                  />
                </FormGroup>
              </div>

              <div className="flex gap-3 justify-end pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Create Test Case
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
