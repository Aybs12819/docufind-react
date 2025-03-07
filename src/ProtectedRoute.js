import React from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from './UserContext';

const ProtectedRoute = ({ children, requiredRole }) => {
    const { loggedInUser } = useContext(UserContext);

    if (!loggedInUser || loggedInUser.role !== requiredRole) {
        return <Navigate to="/login" />; // Redirect to login if no permission
    }

    return children; // Render the child components if permission is granted
};

export default ProtectedRoute;
