// src/ProtectedRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from './UserContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useContext(UserContext);

  if (!user) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // User's role is not authorized
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
