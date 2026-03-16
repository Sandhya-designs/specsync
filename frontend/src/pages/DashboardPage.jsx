import React, { useEffect, useState } from 'react';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { Spinner, ErrorMessage } from '../components/common/Alerts';
import {
  StatCard,
  RiskMeter,
  QuickActions,
  RecentActivity,
  DriftSummary,
} from '../components/dashboard/DashboardComponents';
import { projectService } from '../services/projectService';
import { driftService } from '../services/driftService';
import { useApp } from '../context/AppContext';
import { Plus, BarChart3, AlertTriangle, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const DashboardPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { selectedProject, setSelectedProject } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await projectService.getAllProjects(1, 5);
      setProjects(result.data?.projects || []);
      if (result.data?.projects?.length > 0) {
        setSelectedProject(result.data.projects[0]);
      }
    } catch (err) {
      setError(err.message || 'Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner />;

  const quickActions = [
    {
      label: 'New Project',
      icon: Plus,
      onClick: () => navigate('/projects'),
      primary: true,
    },
    {
      label: 'Add Requirement',
      icon: Plus,
      onClick: () => navigate('/requirements'),
    },
    {
      label: 'View Drift Report',
      icon: AlertTriangle,
      onClick: () => navigate('/drift'),
    },
    {
      label: 'Analytics',
      icon: BarChart3,
      onClick: () => navigate('/analytics'),
    },
  ];

  const recentActivities = [
    {
      type: 'created',
      title: 'Project "E-Commerce Platform" created',
      timestamp: '2 hours ago',
    },
    {
      type: 'updated',
      title: 'Requirement REQ-001 version updated',
      timestamp: '4 hours ago',
    },
    {
      type: 'created',
      title: 'Feature "Payment Integration" added',
      timestamp: '6 hours ago',
    },
  ];

  const driftSummaryData = [
    { type: 'Version Mismatch', count: 3 },
    { type: 'Orphan Features', count: 1 },
    { type: 'Implementation Gap', count: 2 },
    { type: 'Testing Gap', count: 4 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {error && <ErrorMessage message={error} onDismiss={() => setError('')} />}

          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-2">Welcome back! Here's your project overview.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <StatCard
              title="Total Projects"
              value={projects.length}
              icon={BarChart3}
              trend={5}
              trendLabel="from last month"
            />
            <StatCard
              title="Total Requirements"
              value="24"
              icon={CheckCircle}
              trend={3}
              trendLabel="new this week"
            />
            <StatCard
              title="Test Coverage"
              value="87%"
              icon={CheckCircle}
              trend={2}
              trendLabel="improvement"
            />
            <StatCard
              title="Drift Issues"
              value="10"
              icon={AlertTriangle}
              trend={-2}
              trendLabel="resolved this week"
            />
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              <RiskMeter riskLevel="Moderate" driftScore={21} />
              <QuickActions actions={quickActions} />
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <DriftSummary driftIssues={driftSummaryData} />
              <RecentActivity items={recentActivities} />
            </div>
          </div>

          {/* Projects Section */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Projects</h2>
            {projects.length > 0 ? (
              <div className="space-y-3">
                {projects.map((project) => (
                  <div
                    key={project._id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                    onClick={() => {
                      setSelectedProject(project);
                      navigate(`/projects/${project._id}`);
                    }}
                  >
                    <div>
                      <h3 className="font-semibold text-gray-900">{project.projectName}</h3>
                      <p className="text-sm text-gray-600">{project.description}</p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      {project.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-center py-8">No projects yet. Create one to get started!</p>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
