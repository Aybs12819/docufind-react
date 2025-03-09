import React, { useState } from 'react';

const DocumentTracking = () => {
  const [documents, setDocuments] = useState([
    {
      id: 1,
      title: 'Quality Manual 2024',
      trackingNumber: 'DOC-2024-001',
      type: 'EOMS',
      currentStatus: 'under-review',
      submittedBy: 'Maria Santos',
      department: 'Quality Assurance',
      campus: 'Lingayen',
      timeline: [
        { status: 'submitted', date: '2024-01-10', by: 'Maria Santos' },
        { status: 'under-review', date: '2024-01-12', by: 'DCC Office' }
      ]
    },
    // More documents...
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const getStatusLabel = (status) => {
    const labels = {
      'submitted': 'Submitted',
      'under-review': 'Under Review',
      'approved': 'Approved',
      'rejected': 'Rejected',
      'revised': 'Revised'
    };
    return labels[status] || status;
  };

  return (
    <div className="document-tracking">
      <div className="section-header">
        <h2>Document Tracking</h2>
        <div className="tracking-filters">
          <input
            type="text"
            placeholder="Search by title or tracking number..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="submitted">Submitted</option>
            <option value="under-review">Under Review</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="revised">Revised</option>
          </select>
        </div>
      </div>

      <div className="tracking-list">
        {documents.map(doc => (
          <div key={doc.id} className="tracking-card">
            <div className="tracking-header">
              <div className="tracking-title">
                <h3>{doc.title}</h3>
                <span className="tracking-number">{doc.trackingNumber}</span>
              </div>
              <span className={`status-badge ${doc.currentStatus}`}>
                {getStatusLabel(doc.currentStatus)}
              </span>
            </div>
            
            <div className="tracking-details">
              <div className="detail-group">
                <label>Type:</label>
                <span>{doc.type}</span>
              </div>
              <div className="detail-group">
                <label>Submitted By:</label>
                <span>{doc.submittedBy}</span>
              </div>
              <div className="detail-group">
                <label>Department:</label>
                <span>{doc.department}</span>
              </div>
              <div className="detail-group">
                <label>Campus:</label>
                <span>{doc.campus}</span>
              </div>
            </div>

            <div className="tracking-timeline">
              {doc.timeline.map((event, index) => (
                <div key={index} className="timeline-event">
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <span className="event-status">{getStatusLabel(event.status)}</span>
                    <span className="event-date">{event.date}</span>
                    <span className="event-by">{event.by}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="tracking-actions">
              <button className="action-button view">View Document</button>
              <button className="action-button history">Full History</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentTracking;