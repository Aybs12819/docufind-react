import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage';
import MainDashboard from './MainDashboard';
import DocumentManagement from './DocumentManagement';
import RegisterPage from './RegisterPage';
import AdminDashboard from './AdminDashboard';
import ProtectedRoute from './ProtectedRoute';
import { UserProvider } from './UserContext';
import VoiceCommand from './components/VoiceCommand'; // Corrected import

const App = () => {
  return (
    <UserProvider>
      <Router>
        <div className="voice-commands-container">
          <VoiceCommand />
        </div>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute requiredRole="user">
                <MainDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/documents"
            element={
              <ProtectedRoute requiredRole="dcc">
                <DocumentManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
