import React, { useEffect, useState } from 'react';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { Spinner, ErrorMessage } from '../components/common/Alerts';
import { driftService } from '../services/driftService';
import { useApp } from '../context/AppContext';
import { AlertTriangle, Check, X } from 'lucide-react';
import { formatDate } from '../utils/formatters';

export const DriftReportPage = () => {
  const [driftReport, setDriftReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const { selectedProject } = useApp();

  useEffect(() => {
    if (selectedProject) {
      fetchDriftReport();
    }
  }, [selectedProject]);

  const fetchDriftReport = async () => {
    try {
      setLoading(true);
      const result = await driftService.getAllDrift(selectedProject._id);
      setDriftReport(result.data);
    } catch (err) {
      setError(err.message || 'Failed to load drift report');
    } finally {
      setLoading(false);
    }
  };

  const getDriftColor = (type) => {
    switch (type) {
      case 'Version Mismatch':
        return 'bg-yellow-50 border-yellow-200';
      case 'Orphan Feature':
        return 'bg-red-50 border-red-200';
      case 'Implementation Gap':
        return 'bg-orange-50 border-orange-200';
      case 'Testing Gap':
        return 'bg-blue-50 border-blue-200';
      case 'Critical Risk':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const getDriftIcon = (type) => {
    return <AlertTriangle size={20} className="text-warning" />;
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

  const allIssues = driftReport?.issues || [];
  const filteredIssues = selectedType === 'all'
    ? allIssues
    : allIssues.filter((issue) => issue.type === selectedType);

  const driftTypes = [...new Set(allIssues.map((issue) => issue.type))];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Drift Report</h1>
            <p className="text-gray-600 mt-2">
              Project: <span className="font-semibold">{selectedProject.projectName}</span>
            </p>
          </div>

          {error && <ErrorMessage message={error} onDismiss={() => setError('')} />}

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="card text-center">
              <p className="text-gray-600 mb-2">Total Issues</p>
              <p className="text-4xl font-bold text-gray-900">{allIssues.length}</p>
            </div>
            <div className="card text-center">
              <p className="text-gray-600 mb-2">Drift Score</p>
              <p className="text-4xl font-bold text-primary">{driftReport?.driftScore || 0}</p>
            </div>
            <div className="card text-center">
              <p className="text-gray-600 mb-2">Risk Level</p>
              <p className={`text-3xl font-bold ${
                driftReport?.riskLevel === 'Stable' ? 'text-green-600' :
                driftReport?.riskLevel === 'Moderate' ? 'text-yellow-600' :
                'text-red-600'
              }`}>
                {driftReport?.riskLevel}
              </p>
            </div>
            <div className="card text-center">
              <p className="text-gray-600 mb-2">Critical Issues</p>
              <p className="text-4xl font-bold text-red-600">
                {allIssues.filter((i) => i.severity === 'Critical').length}
              </p>
            </div>
          </div>

          {/* Filter */}
          <div className="card mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter by Type</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedType('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedType === 'all'
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                All Issues ({allIssues.length})
              </button>
              {driftTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedType === type
                      ? 'bg-primary text-white'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                >
                  {type} ({allIssues.filter((i) => i.type === type).length})
                </button>
              ))}
            </div>
          </div>

          {/* Issues Table */}
          <div className="card overflow-x-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Detected Issues</h3>
            {filteredIssues.length > 0 ? (
              <table className="w-full">
                <thead className="border-b border-gray-200">
                  <tr>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Type</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Issue</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Severity</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredIssues.map((issue, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4 text-sm font-medium text-gray-900">{issue.type}</td>
                      <td className="py-4 px-4 text-sm text-gray-700">{issue.issue}</td>
                      <td className="py-4 px-4 text-sm">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          issue.severity === 'Critical' ? 'bg-red-100 text-red-800' :
                          issue.severity === 'High' ? 'bg-orange-100 text-orange-800' :
                          issue.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {issue.severity}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">{issue.details}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-8">
                <Check size={48} className="mx-auto mb-4 text-green-600" />
                <p className="text-gray-600">No drift issues detected!</p>
              </div>
            )}
          </div>

          {/* Recommendations */}
          <div className="card mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Review and update requirements to match current implementation</li>
              <li>Link orphan features to appropriate requirements</li>
              <li>Implement missing features for open requirements</li>
              <li>Add test cases for untested features</li>
              <li>Prioritize critical and high-priority requirements</li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
