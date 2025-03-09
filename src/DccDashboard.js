import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';

const DocumentApproval = () => {
  const [pendingDocuments, setPendingDocuments] = useState([
    {
      id: 1,
      title: 'Quality Manual Update',
      submittedBy: 'John Doe',
      department: 'Quality Assurance',
      dateSubmitted: '2024-01-15',
      status: 'pending',
      type: 'EOMS'
    },
    // More documents...
  ]);

  return (
    <div className="document-approval">
      <div className="section-header">
        <h2>Document Approval</h2>
        <div className="filter-group">
          <select className="filter-select">
            <option value="all">All Types</option>
            <option value="eoms">EOMS</option>
            <option value="process">Process Manual</option>
            <option value="forms">Forms</option>
          </select>
        </div>
      </div>

      <div className="approval-grid">
        {pendingDocuments.map(doc => (
          <div key={doc.id} className="approval-card">
            <div className="approval-header">
              <span className={`status-badge ${doc.status}`}>{doc.status}</span>
              <span className="document-type">{doc.type}</span>
            </div>
            <div className="approval-content">
              <h3>{doc.title}</h3>
              <p>Submitted by: {doc.submittedBy}</p>
              <p>Department: {doc.department}</p>
              <p>Date: {doc.dateSubmitted}</p>
            </div>
            <div className="approval-actions">
              <button className="action-button view">View Document</button>
              <button className="action-button approve">Approve</button>
              <button className="action-button reject">Reject</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const DocumentTracking = () => {
  return (
    <div className="document-tracking">
      <h2>Document Tracking</h2>
      {/* Document tracking implementation */}
    </div>
  );
};

const CampusDocuments = () => {
  return (
    <div className="campus-documents">
      <h2>Campus Documents</h2>
      {/* Campus-specific document management */}
    </div>
  );
};

const DccDashboard = () => {
  return (
    <DashboardLayout>
      <div className="dcc-sidebar-nav">
        <Link to="" className="nav-item">
          <i className="fas fa-check-circle"></i>
          <span>Document Approval</span>
        </Link>
        <Link to="tracking" className="nav-item">
          <i className="fas fa-search"></i>
          <span>Document Tracking</span>
        </Link>
        <Link to="campus-docs" className="nav-item">
          <i className="fas fa-folder"></i>
          <span>Campus Documents</span>
        </Link>
      </div>

      <div className="dashboard-content">
        <Routes>
          <Route path="" element={<DocumentApproval />} />
          <Route path="tracking" element={<DocumentTracking />} />
          <Route path="campus-docs" element={<CampusDocuments />} />
        </Routes>
      </div>
    </DashboardLayout>
  );
};

export default DccDashboard;