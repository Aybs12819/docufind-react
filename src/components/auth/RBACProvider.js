import React, { createContext, useContext, useMemo } from 'react';

const RBACContext = createContext();

export const useRBAC = () => {
  const context = useContext(RBACContext);
  if (!context) {
    throw new Error('useRBAC must be used within an RBACProvider');
  }
  return context;
};

export const RBACProvider = ({ children, initialRoles = ['user'] }) => {
  const permissions = useMemo(() => ({
    user: ['view_documents'],
    editor: ['view_documents', 'edit_documents'],
    admin: ['view_documents', 'edit_documents', 'manage_documents']
  }), []);

  const hasPermission = (permission) => {
    return initialRoles.some(role => 
      permissions[role]?.includes(permission)
    );
  };

  const value = useMemo(() => ({
    hasPermission
  }), [initialRoles]);

  return (
    <RBACContext.Provider value={value}>
      {children}
    </RBACContext.Provider>
  );
};