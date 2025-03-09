import React, { useState } from 'react';

const DocumentPreview = ({ document, onClose }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState(100);

  return (
    <div className="preview-overlay">
      <div className="preview-container">
        <div className="preview-header">
          <div className="preview-title">
            <h3>{document.title}</h3>
            <span className="document-version">v{document.version}</span>
          </div>
          <div className="preview-controls">
            <div className="zoom-controls">
              <button onClick={() => setZoom(zoom - 10)}>
                <i className="fas fa-search-minus"></i>
              </button>
              <span>{zoom}%</span>
              <button onClick={() => setZoom(zoom + 10)}>
                <i className="fas fa-search-plus"></i>
              </button>
            </div>
            <button className="close-preview" onClick={onClose}>
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>

        <div className="preview-toolbar">
          <div className="page-navigation">
            <button disabled={currentPage === 1}>
              <i className="fas fa-chevron-left"></i>
            </button>
            <span>Page {currentPage} of {document.totalPages}</span>
            <button disabled={currentPage === document.totalPages}>
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
          <div className="preview-actions">
            <button className="action-button download">
              <i className="fas fa-download"></i> Download
            </button>
            <button className="action-button print">
              <i className="fas fa-print"></i> Print
            </button>
          </div>
        </div>

        <div className="preview-content" style={{ zoom: `${zoom}%` }}>
          {/* Document content will be rendered here */}
          <div className="document-page">
            {document.content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentPreview;