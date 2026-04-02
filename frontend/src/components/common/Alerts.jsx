import React from 'react';

export const Spinner = () => (
  <div className="flex items-center justify-center py-8">
    <div className="spinner"></div>
  </div>
);

export const LoadingOverlay = () => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-8">
      <Spinner />
      <p className="text-center mt-4 text-gray-600">Loading...</p>
    </div>
  </div>
);

export const ErrorMessage = ({ message, onDismiss }) => (
  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
    <div className="flex items-start justify-between">
      <div>
        <h3 className="text-red-800 font-semibold">Error</h3>
        <p className="text-red-700 text-sm mt-1">{message}</p>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="text-red-600 hover:text-red-800 font-bold"
        >
          ×
        </button>
      )}
    </div>
  </div>
);

export const SuccessMessage = ({ message, onDismiss }) => (
  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
    <div className="flex items-start justify-between">
      <div>
        <h3 className="text-green-800 font-semibold">Success</h3>
        <p className="text-green-700 text-sm mt-1">{message}</p>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="text-green-600 hover:text-green-800 font-bold"
        >
          ×
        </button>
      )}
    </div>
  </div>
);

export const WarningMessage = ({ message, onDismiss }) => (
  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
    <div className="flex items-start justify-between">
      <div>
        <h3 className="text-yellow-800 font-semibold">Warning</h3>
        <p className="text-yellow-700 text-sm mt-1">{message}</p>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="text-yellow-600 hover:text-yellow-800 font-bold"
        >
          ×
        </button>
      )}
    </div>
  </div>
);

// Alias exports for compatibility
export const AlertError = ErrorMessage;
export const AlertSuccess = SuccessMessage;
