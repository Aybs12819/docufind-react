import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../UserContext';

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <img src="/PSU.png" alt="PSU Logo" className="sidebar-logo" />
          <button 
            className="toggle-button"
            onClick={() => setSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? '←' : '→'}
          </button>
        </div>
        <div className="user-info">
          <img src="/default-avatar.png" alt="User" className="user-avatar" />
          <div className="user-details">
            <h4>{user?.name || 'User'}</h4>
            <p>{user?.role || 'Role'}</p>
          </div>
        </div>
        <nav className="sidebar-nav">
          {children}
        </nav>
      </div>

      {/* Main Content */}
      <div className={`main-content ${isSidebarOpen ? 'shifted' : ''}`}>
        <header className="dashboard-header">
          <div className="header-title">
            <h1>DOCUFIND</h1>
          </div>
          <div className="header-actions">
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
        </header>
        <main className="content-area">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;