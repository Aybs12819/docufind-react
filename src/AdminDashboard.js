// src/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import axios from 'axios';

import { Routes, Route, Link } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';

// Admin Dashboard Components
const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@psu.edu.ph', role: 'process-owner', campus: 'Lingayen' },
    { id: 2, name: 'Jane Smith', email: 'jane@psu.edu.ph', role: 'dcc', campus: 'Binmaley' },
  ]);

  return (
    <div className="user-management">
      <div className="section-header">
        <h2>User Management</h2>
        <button className="add-button">Add New User</button>
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Search users..." />
      </div>
      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Campus</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.campus}</td>
              <td>
                <button className="action-button edit">Edit</button>
                <button className="action-button delete">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const CampusManagement = () => (
  <div className="campus-management">
    <h2>Campus Management</h2>
    {/* Campus management content */}
  </div>
);

const DocumentTemplates = () => (
  <div className="document-templates">
    <h2>Document Templates</h2>
    {/* Document templates content */}
  </div>
);

const SystemSettings = () => (
  <div className="system-settings">
    <h2>System Settings</h2>
    {/* System settings content */}
  </div>
);

const AdminDashboard = () => {
  return (
    <DashboardLayout>
      <div className="admin-sidebar-nav">
        <Link to="" className="nav-item">
          <i className="fas fa-home"></i>
          <span>Dashboard Overview</span>
        </Link>
        <Link to="users" className="nav-item">
          <i className="fas fa-users"></i>
          <span>User Management</span>
        </Link>
        <Link to="campus" className="nav-item">
          <i className="fas fa-building"></i>
          <span>Campus Management</span>
        </Link>
        <Link to="templates" className="nav-item">
          <i className="fas fa-file-alt"></i>
          <span>Document Templates</span>
        </Link>
        <Link to="settings" className="nav-item">
          <i className="fas fa-cog"></i>
          <span>System Settings</span>
        </Link>
      </div>

      <div className="dashboard-content">
        <Routes>
          <Route path="" element={<UserManagement />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="campus" element={<CampusManagement />} />
          <Route path="templates" element={<DocumentTemplates />} />
          <Route path="settings" element={<SystemSettings />} />
        </Routes>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
