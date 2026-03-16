import React, { useEffect, useState } from 'react';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { Spinner, ErrorMessage } from '../components/common/Alerts';
import { analyticsService } from '../services/analyticsService';
import { useApp } from '../context/AppContext';
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const COLORS = ['#0066cc', '#00cc99', '#ffaa00', '#ff3333', '#9966ff'];

export const AnalyticsPage = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { selectedProject } = useApp();

  useEffect(() => {
    if (selectedProject) {
      fetchAnalytics();
    }
  }, [selectedProject]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const result = await analyticsService.getAnalytics(selectedProject._id);
      setAnalytics(result.data);
    } catch (err) {
      setError(err.message || 'Failed to load analytics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner />;

  if (!selectedProject) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 mb-4">Please select a project first</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Prepare data for charts
  const volatilityData = [
    { month: 'Week 1', volatility: 2.5 },
    { month: 'Week 2', volatility: 3.2 },
    { month: 'Week 3', volatility: 2.8 },
    { month: 'Week 4', volatility: analytics?.requirementMetrics?.volatilityRate || 1.3 },
  ];

  const statusData = [
    { name: 'Active', value: (analytics?.requirementMetrics?.statusDistribution?.Active || 0) },
    { name: 'On Hold', value: (analytics?.requirementMetrics?.statusDistribution?.['On Hold'] || 0) },
    { name: 'Completed', value: (analytics?.requirementMetrics?.statusDistribution?.Completed || 0) },
  ].filter((item) => item.value > 0);

  const priorityData = [
    { name: 'Critical', value: (analytics?.requirementMetrics?.priorityDistribution?.Critical || 0) },
    { name: 'High', value: (analytics?.requirementMetrics?.priorityDistribution?.High || 0) },
    { name: 'Medium', value: (analytics?.requirementMetrics?.priorityDistribution?.Medium || 0) },
    { name: 'Low', value: (analytics?.requirementMetrics?.priorityDistribution?.Low || 0) },
  ].filter((item) => item.value > 0);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
            <p className="text-gray-600 mt-2">
              Project: <span className="font-semibold">{selectedProject.projectName}</span>
            </p>
          </div>

          {error && <ErrorMessage message={error} onDismiss={() => setError('')} />}

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="card text-center">
              <p className="text-gray-600 mb-2">Total Requirements</p>
              <p className="text-4xl font-bold text-gray-900">
                {analytics?.requirementMetrics?.total || 0}
              </p>
            </div>
            <div className="card text-center">
              <p className="text-gray-600 mb-2">Volatility Rate</p>
              <p className="text-4xl font-bold text-primary">
                {(analytics?.requirementMetrics?.volatilityRate || 0).toFixed(1)}
              </p>
            </div>
            <div className="card text-center">
              <p className="text-gray-600 mb-2">Test Coverage</p>
              <p className="text-4xl font-bold text-success">
                {(analytics?.testingMetrics?.testCoverage || 0).toFixed(1)}%
              </p>
            </div>
            <div className="card text-center">
              <p className="text-gray-600 mb-2">Completion Ratio</p>
              <p className="text-4xl font-bold text-warning">
                {(analytics?.featureMetrics?.completionRatio || 0).toFixed(1)}%
              </p>
            </div>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Volatility Trend */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Volatility Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={volatilityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="volatility"
                    stroke="#0066cc"
                    strokeWidth={2}
                    dot={{ fill: '#0066cc', r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Status Distribution */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Status Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Priority Distribution */}
          <div className="card mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Priority Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={priorityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#0066cc" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Most Modified Requirements */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Most Modified Requirements</h3>
            {analytics?.requirementMetrics?.mostModifiedRequirements?.length > 0 ? (
              <div className="space-y-3">
                {analytics.requirementMetrics.mostModifiedRequirements.map((req, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <span className="font-medium text-gray-900">{req.title}</span>
                    <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-bold">
                      {req.modificationCount} changes
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-center py-8">No modification data available</p>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
