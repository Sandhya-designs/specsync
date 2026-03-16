import React from 'react';
import { TrendingUp, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { getRiskLevelColor, getRiskLevelBgColor } from '../../utils/formatters';

export const StatCard = ({ title, value, icon: Icon, trend, trendLabel }) => (
  <div className="card flex items-center justify-between">
    <div>
      <p className="text-sm text-gray-600 mb-1">{title}</p>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
      {trend && (
        <p className={`text-sm mt-2 ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
          {trend > 0 ? '↑' : '↓'} {trendLabel}
        </p>
      )}
    </div>
    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-primary">
      <Icon size={24} />
    </div>
  </div>
);

export const RiskMeter = ({ riskLevel, driftScore }) => {
  const bgColor = getRiskLevelBgColor(riskLevel);
  const badgeColor = getRiskLevelColor(riskLevel);

  const getProgressWidth = () => {
    if (driftScore <= 10) return '25%';
    if (driftScore <= 20) return '50%';
    if (driftScore <= 30) return '75%';
    return '100%';
  };

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Drift Risk Level</h3>
      <div className={`p-6 rounded-lg ${bgColor} mb-4`}>
        <div className="flex items-center justify-between mb-4">
          <span className={`badge ${badgeColor}`}>{riskLevel}</span>
          <span className="text-2xl font-bold text-gray-900">{driftScore}</span>
        </div>
        <div className="w-full bg-gray-300 rounded-full h-3 mb-2">
          <div
            className="bg-primary h-3 rounded-full transition-all duration-300"
            style={{ width: getProgressWidth() }}
          />
        </div>
        <p className="text-sm text-gray-600">Drift Score: {driftScore}/50</p>
      </div>
    </div>
  );
};

export const MetricBox = ({ label, value, color = 'primary', icon: Icon }) => (
  <div className="bg-white rounded-lg p-4 border border-gray-100 flex items-center gap-3">
    <div className={`w-10 h-10 bg-${color}-100 rounded-lg flex items-center justify-center text-${color}`}>
      {Icon && <Icon size={20} />}
    </div>
    <div>
      <p className="text-xs text-gray-600 font-medium">{label}</p>
      <p className="text-lg font-bold text-gray-900">{value}</p>
    </div>
  </div>
);

export const QuickActions = ({ actions }) => (
  <div className="card">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {actions.map((action, index) => (
        <button
          key={index}
          onClick={action.onClick}
          className={`flex items-center gap-2 px-4 py-3 rounded-lg border transition-all ${
            action.primary
              ? 'btn btn-primary'
              : 'border border-gray-200 text-gray-700 hover:bg-gray-50'
          }`}
        >
          {action.icon && <action.icon size={18} />}
          {action.label}
        </button>
      ))}
    </div>
  </div>
);

export const RecentActivity = ({ items }) => (
  <div className="card">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={index} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white ${
            item.type === 'created' ? 'bg-green-500' :
            item.type === 'updated' ? 'bg-blue-500' :
            item.type === 'deleted' ? 'bg-red-500' :
            'bg-gray-500'
          }`}>
            {item.type.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">{item.title}</p>
            <p className="text-xs text-gray-600">{item.timestamp}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const DriftSummary = ({ driftIssues }) => (
  <div className="card">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">Drift Summary</h3>
    <div className="space-y-2">
      {driftIssues?.map((issue, index) => (
        <div key={index} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
          <span className="text-sm text-gray-700">{issue.type}</span>
          <span className="font-bold text-gray-900">{issue.count}</span>
        </div>
      ))}
    </div>
  </div>
);
