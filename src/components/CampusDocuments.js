import React, { useState } from 'react';

const CampusDocuments = () => {
  const [documents, setDocuments] = useState([
    {
      id: 1,
      title: 'Campus Quality Manual',
      category: 'EOMS',
      version: '2.1',
      lastUpdated: '2024-01-15',
      status: 'active',
      department: 'Quality Assurance',
      owner: 'Maria Santos'
    },
    // More documents will be added here
  ]);

  const [activeView, setActiveView] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    'all',
    'EOMS',
    'Process Manual',
    'Forms',
    'Reports',
    'Guidelines'
  ];

  return (
    <div className="campus-documents">
      <div className="section-header">
        <h2>Campus Documents</h2>
        <div className="document-controls">
          <div className="view-toggles">
            <button 
              className={`view-toggle ${activeView === 'grid' ? 'active' : ''}`}
              onClick={() => setActiveView('grid')}
            >
              <i className="fas fa-th-large"></i>
            </button>
            <button 
              className={`view-toggle ${activeView === 'list' ? 'active' : ''}`}
              onClick={() => setActiveView('list')}
            >
              <i className="fas fa-list"></i>
            </button>
          </div>
          <button className="add-button">
            <i className="fas fa-plus"></i> Upload Document
          </button>
        </div>
      </div>

      <div className="document-filters">
        <div className="category-filters">
          {categories.map(category => (
            <button
              key={category}
              className={`category-button ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Search documents..." />
        </div>
      </div>

      <div className={`documents-container ${activeView}`}>
        {documents.map(doc => (
          <div key={doc.id} className="document-item">
            <div className="document-icon">
              <i className="fas fa-file-alt"></i>
            </div>
            <div className="document-info">
              <h3>{doc.title}</h3>
              <div className="document-meta">
                <span className="document-category">{doc.category}</span>
                <span className="document-version">v{doc.version}</span>
              </div>
              <div className="document-details">
                <p>Last updated: {doc.lastUpdated}</p>
                <p>Owner: {doc.owner}</p>
                <p>Department: {doc.department}</p>
              </div>
            </div>
            <div className="document-actions">
              <button className="action-button view">View</button>
              <button className="action-button download">Download</button>
              <button className="action-button edit">Edit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CampusDocuments;