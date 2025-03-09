import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import Templates from './Templates';

const MyDocuments = () => {
  const [documents, setDocuments] = useState([
    {
      id: 1,
      title: 'Student Registration Process',
      type: 'Process Manual',
      status: 'draft',
      lastModified: '2024-01-15',
      comments: 2,
      version: '1.0'
    }
  ]);

  const handleCreateNew = () => {
    setSelectedDocument(null);
    setShowEditor(true);
  };

  const handleEdit = (document) => {
    setSelectedDocument(document);
    setShowEditor(true);
  };

  const handleSave = (documentData) => {
    // Handle save logic here
    setShowEditor(false);
    setSelectedDocument(null);
  };

  return (
    <div className="my-documents">
      {!showEditor ? (
        <>
          <div className="section-header">
            <h2>My Documents</h2>
            <button className="add-button" onClick={handleCreateNew}>
              Create New Document
            </button>
          </div>

          <div className="document-stats">
            <div className="stat-card">
              <h3>Draft</h3>
              <span className="stat-number">3</span>
            </div>
            <div className="stat-card">
              <h3>Under Review</h3>
              <span className="stat-number">2</span>
            </div>
            <div className="stat-card">
              <h3>Published</h3>
              <span className="stat-number">8</span>
            </div>
          </div>

          <div className="documents-list">
            {documents.map(doc => (
              <div key={doc.id} className="process-doc-card">
                <div className="doc-header">
                  <div className="doc-title">
                    <h3>{doc.title}</h3>
                    <span className={`doc-status ${doc.status}`}>{doc.status}</span>
                  </div>
                  <div className="doc-version">v{doc.version}</div>
                </div>
                <div className="doc-meta">
                  <span>Type: {doc.type}</span>
                  <span>Last Modified: {doc.lastModified}</span>
                  <span>Comments: {doc.comments}</span>
                </div>
                <div className="doc-actions">
                  <button className="action-button edit">Edit</button>
                  <button className="action-button submit">Submit for Review</button>
                  <button className="action-button view">Preview</button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <DocumentEditor
          document={selectedDocument}
          onSave={handleSave}
          onCancel={() => {
            setShowEditor(false);
            setSelectedDocument(null);
          }}
        />
      )}
    </div>
  );
};

const ProcessOwnerDashboard = () => {
  return (
    <DashboardLayout>
      <div className="process-owner-nav">
        <Link to="" className="nav-item">
          <i className="fas fa-file-alt"></i>
          <span>My Documents</span>
        </Link>
        <Link to="templates" className="nav-item">
          <i className="fas fa-copy"></i>
          <span>Templates</span>
        </Link>
        <Link to="submissions" className="nav-item">
          <i className="fas fa-tasks"></i>
          <span>My Submissions</span>
        </Link>
      </div>

      <div className="dashboard-content">
        <Routes>
          <Route path="" element={<MyDocuments />} />
          <Route path="templates" element={<Templates />} />
          {/* Add other routes as needed */}
        </Routes>
      </div>
    </DashboardLayout>
  );
};

export default ProcessOwnerDashboard;