import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Spinner } from './Alerts';

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <Spinner />;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <Spinner />;
  }

  return !isAuthenticated ? children : <Navigate to="/dashboard" />;
};

export const Layout = ({ children }) => (
  <div className="min-h-screen bg-gray-50 flex flex-col">
    {children}
  </div>
);
