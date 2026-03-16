import React from 'react';
import { ChevronRight } from 'lucide-react';

export const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`bg-white rounded-xl shadow-xl ${sizeClasses[size]} w-full`}>
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
          >
            ×
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export const Breadcrumb = ({ items }) => (
  <div className="flex items-center gap-2 text-sm">
    {items.map((item, index) => (
      <React.Fragment key={index}>
        {index > 0 && <ChevronRight size={16} className="text-gray-400" />}
        {item.href ? (
          <a href={item.href} className="text-primary hover:underline">
            {item.label}
          </a>
        ) : (
          <span className="text-gray-600">{item.label}</span>
        )}
      </React.Fragment>
    ))}
  </div>
);

export const Pagination = ({ currentPage, totalPages, onPageChange }) => (
  <div className="flex items-center justify-center gap-2 mt-6">
    <button
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
      className="btn btn-secondary"
    >
      Previous
    </button>
    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
      <button
        key={page}
        onClick={() => onPageChange(page)}
        className={`px-3 py-1 rounded ${
          currentPage === page
            ? 'bg-primary text-white'
            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
        }`}
      >
        {page}
      </button>
    ))}
    <button
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
      className="btn btn-secondary"
    >
      Next
    </button>
  </div>
);

export const Badge = ({ children, variant = 'default' }) => {
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-blue-100 text-blue-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
  };

  return (
    <span className={`badge ${variants[variant]}`}>
      {children}
    </span>
  );
};
