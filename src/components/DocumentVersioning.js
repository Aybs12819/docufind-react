import React, { useState } from 'react';

const DocumentVersioning = ({ documentId }) => {
  const [versions, setVersions] = useState([
    {
      id: 1,
      version: '2.1',
      date: '2024-01-15',
      author: 'Maria Santos',
      changes: 'Updated section 3.2 with new process flow',
      status: 'current'
    },
    {
      id: 2,
      version: '2.0',
      date: '2023-12-20',
      author: 'Maria Santos',
      changes: 'Major revision of entire document',
      status: 'archived'
    }
  ]);

  const handleCompare = () => {
    // TODO: Implement version comparison
  };

  const handleRestore = () => {
    // TODO: Implement version restore
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="version-history">
      <div className="version-header">
        <h3>Version History</h3>
        <div className="version-actions">
          <button className="action-button compare" onClick={handleCompare}>
            Compare Versions
          </button>
          <button className="action-button restore" onClick={handleRestore}>
            Restore Version
          </button>
        </div>
      </div>

      <div className="version-timeline">
        {versions.map((version, index) => (
          <div key={version.id} className="version-item">
            <div className="version-marker">
              <div className="version-dot"></div>
              {index < versions.length - 1 && <div className="version-line"></div>}
            </div>
            <div className="version-content">
              <div className="version-info">
                <span className="version-number">v{version.version}</span>
                <span className={`version-status ${version.status}`}>
                  {version.status}
                </span>
              </div>
              <div className="version-details">
                <p className="version-date">{formatDate(version.date)}</p>
                <p className="version-author">By: {version.author}</p>
                <p className="version-changes">{version.changes}</p>
              </div>
              <div className="version-actions">
                <button className="action-button view">View</button>
                <button className="action-button download">Download</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentVersioning;