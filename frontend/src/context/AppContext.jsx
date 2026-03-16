import React, { createContext, useState, useCallback } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedRequirement, setSelectedRequirement] = useState(null);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const triggerRefresh = useCallback(() => {
    setRefreshTrigger((prev) => prev + 1);
  }, []);

  const value = {
    selectedProject,
    setSelectedProject,
    selectedRequirement,
    setSelectedRequirement,
    selectedFeature,
    setSelectedFeature,
    refreshTrigger,
    triggerRefresh,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = React.useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
