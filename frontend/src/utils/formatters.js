export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getRiskLevelColor = (riskLevel) => {
  switch (riskLevel) {
    case 'Stable':
      return 'badge-success';
    case 'Moderate':
      return 'badge-warning';
    case 'High Risk':
      return 'badge-danger';
    default:
      return 'badge-success';
  }
};

export const getRiskLevelBgColor = (riskLevel) => {
  switch (riskLevel) {
    case 'Stable':
      return 'bg-green-50';
    case 'Moderate':
      return 'bg-yellow-50';
    case 'High Risk':
      return 'bg-red-50';
    default:
      return 'bg-white';
  }
};

export const getStatusBadgeColor = (status) => {
  switch (status.toLowerCase()) {
    case 'active':
    case 'released':
    case 'passed':
      return 'badge-success';
    case 'in development':
    case 'pending':
    case 'in progress':
      return 'badge-warning';
    case 'on hold':
    case 'failed':
      return 'badge-danger';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const getPriorityColor = (priority) => {
  switch (priority?.toLowerCase()) {
    case 'critical':
      return 'text-red-600';
    case 'high':
      return 'text-orange-600';
    case 'medium':
      return 'text-yellow-600';
    case 'low':
      return 'text-green-600';
    default:
      return 'text-gray-600';
  }
};

export const truncate = (text, length = 50) => {
  return text?.length > length ? text.substring(0, length) + '...' : text;
};

export const capitalizeFirst = (text) => {
  return text?.charAt(0).toUpperCase() + text?.slice(1);
};
