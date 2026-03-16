import React, { createContext, useState, useCallback, useEffect } from 'react';
import { setToken, removeToken, setUser, removeUser, getToken, getUser } from '../utils/tokenUtils';
import { authService } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize auth state from localStorage
  useEffect(() => {
    const token = getToken();
    const storedUser = getUser();
    if (token && storedUser) {
      setUserState(storedUser);
    }
    setLoading(false);
  }, []);

  const signup = useCallback(async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.signup(userData);
      console.log('Signup response:', response);
      // Backend returns { statusCode, data: { token, user }, message, success }
      const token = response.data?.token || response.token;
      const user = response.data?.user || response.user;
      setToken(token);
      setUser(user);
      setUserState(user);
      return response;
    } catch (err) {
      const message = err.message || 'Signup failed';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.login(credentials);
      console.log('Login response:', response);
      // Backend returns { statusCode, data: { token, user }, message, success }
      const token = response.data?.token || response.token;
      const user = response.data?.user || response.user;
      console.log('Extracted token:', token);
      console.log('Extracted user:', user);
      setToken(token);
      setUser(user);
      setUserState(user);
      return response;
    } catch (err) {
      const message = err.message || 'Login failed';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    removeToken();
    removeUser();
    setUserState(null);
    setError(null);
  }, []);

  const isAuthenticated = !!user;

  const value = {
    user,
    loading,
    error,
    isAuthenticated,
    signup,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
