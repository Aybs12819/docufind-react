import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from '../components/Login';
import Register from '../components/Register';
import ForgotPassword from '../components/ForgotPassword';
import ResetPassword from '../components/ResetPassword';
import DocumentList from '../components/DocumentList';
import DocumentEditor from '../components/DocumentEditor';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <LoadingSpinner />;
    }

    return user ? children : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/documents" element={
                <PrivateRoute>
                    <DocumentList />
                </PrivateRoute>
            } />
            <Route path="/documents/:id" element={
                <PrivateRoute>
                    <DocumentEditor />
                </PrivateRoute>
            } />
            <Route path="/" element={<Navigate to="/documents" />} />
        </Routes>
    );
};

export default AppRoutes;