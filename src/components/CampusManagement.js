import React, { useState } from 'react';

const CampusManagement = () => {
  const [campuses, setCampuses] = useState([
    {
      id: 1,
      name: 'Lingayen',
      address: 'Lingayen, Pangasinan',
      dcc: 'John Doe',
      contactNumber: '123-456-7890',
      email: 'lingayen.dcc@psu.edu.ph',
      status: 'active'
    },
    // Add other campuses as needed
  ]);

  const [showForm, setShowForm] = useState(false);
  const [selectedCampus, setSelectedCampus] = useState(null);

  return (
    <div className="campus-management">
      <div className="section-header">
        <h2>Campus Management</h2>
        <button className="add-button" onClick={() => setShowForm(true)}>
          Add Campus
        </button>
      </div>

      <div className="campus-grid">
        {campuses.map(campus => (
          <div key={campus.id} className="campus-card">
            <div className="campus-header">
              <h3>{campus.name}</h3>
              <span className={`status-badge ${campus.status}`}>
                {campus.status}
              </span>
            </div>
            <div className="campus-info">
              <p><strong>Address:</strong> {campus.address}</p>
              <p><strong>DCC:</strong> {campus.dcc}</p>
              <p><strong>Contact:</strong> {campus.contactNumber}</p>
              <p><strong>Email:</strong> {campus.email}</p>
            </div>
            <div className="campus-actions">
              <button 
                className="action-button edit"
                onClick={() => {
                  setSelectedCampus(campus);
                  setShowForm(true);
                }}
              >
                Edit
              </button>
              <button className="action-button view">View Details</button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{selectedCampus ? 'Edit Campus' : 'Add New Campus'}</h2>
              <button className="close-button" onClick={() => {
                setShowForm(false);
                setSelectedCampus(null);
              }}>&times;</button>
            </div>
            <form className="campus-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>Campus Name</label>
                  <input 
                    type="text" 
                    defaultValue={selectedCampus?.name || ''}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <input 
                    type="text" 
                    defaultValue={selectedCampus?.address || ''}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>DCC Name</label>
                  <input 
                    type="text" 
                    defaultValue={selectedCampus?.dcc || ''}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Contact Number</label>
                  <input 
                    type="tel" 
                    defaultValue={selectedCampus?.contactNumber || ''}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input 
                    type="email" 
                    defaultValue={selectedCampus?.email || ''}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select defaultValue={selectedCampus?.status || 'active'}>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="form-actions">
                <button type="button" className="cancel-button" onClick={() => {
                  setShowForm(false);
                  setSelectedCampus(null);
                }}>
                  Cancel
                </button>
                <button type="submit" className="submit-button">
                  {selectedCampus ? 'Update Campus' : 'Add Campus'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampusManagement;