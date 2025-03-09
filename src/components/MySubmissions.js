import React, { useState } from 'react';

const MySubmissions = () => {
  const [submissions, setSubmissions] = useState([
    {
      id: 1,
      title: 'Student Registration Process Manual',
      submissionDate: '2024-01-15',
      type: 'Process Manual',
      status: 'pending',
      reviewer: 'John Smith',
      comments: [
        {
          author: 'John Smith',
          date: '2024-01-16',
          text: 'Please add more details to section 3.2'
        }
      ]
    },
    {
      id: 2,
      title: 'Laboratory Safety Guidelines',
      submissionDate: '2024-01-14',
      type: 'EOMS',
      status: 'approved',
      reviewer: 'Maria Garcia',
      approvalDate: '2024-01-15'
    }
  ]);

  const [filterStatus, setFilterStatus] = useState('all');

  return (
    <div className="submissions-section">
      <div className="section-header">
        <h2>My Submissions</h2>
        <div className="filter-controls">
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            className="status-filter"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="submissions-list">
        {submissions.map(submission => (
          <div key={submission.id} className="submission-card">
            <div className="submission-header">
              <h3>{submission.title}</h3>
              <span className={`status-badge ${submission.status}`}>
                {submission.status}
              </span>
            </div>

            <div className="submission-details">
              <div className="detail-item">
                <label>Submission Date:</label>
                <span>{submission.submissionDate}</span>
              </div>
              <div className="detail-item">
                <label>Document Type:</label>
                <span>{submission.type}</span>
              </div>
              <div className="detail-item">
                <label>Reviewer:</label>
                <span>{submission.reviewer}</span>
              </div>
              {submission.approvalDate && (
                <div className="detail-item">
                  <label>Approval Date:</label>
                  <span>{submission.approvalDate}</span>
                </div>
              )}
            </div>

            {submission.comments && submission.comments.length > 0 && (
              <div className="submission-comments">
                <h4>Comments</h4>
                {submission.comments.map((comment, index) => (
                  <div key={index} className="comment">
                    <div className="comment-header">
                      <span className="comment-author">{comment.author}</span>
                      <span className="comment-date">{comment.date}</span>
                    </div>
                    <p className="comment-text">{comment.text}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="submission-actions">
              <button className="action-button view">View Document</button>
              {submission.status === 'rejected' && (
                <button className="action-button revise">Revise</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MySubmissions;