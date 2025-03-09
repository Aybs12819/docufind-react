import React, { useState, useEffect } from 'react';

const UserForm = ({ user, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    email: '',
    contact: '',
    designation: '',
    campus: '',
    role: '',
    password: '',
  });

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  const generateEmployeeId = () => {
    const year = new Date().getFullYear();
    // In a real application, this number would come from your backend
    const sequentialNumber = Math.floor(1000 + Math.random() * 9000);
    return `PSU-${year}-${sequentialNumber}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const employeeId = user ? user.employeeId : generateEmployeeId();
    onSubmit({ ...formData, employeeId });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{user ? 'Edit User' : 'Add New User'}</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            {user && (
              <div className="form-group">
                <label>Employee ID</label>
                <input
                  type="text"
                  value={user.employeeId}
                  disabled
                  className="disabled-input"
                />
              </div>
            )}
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Middle Name (Optional)</label>
              <input
                type="text"
                value={formData.middleName}
                onChange={(e) => setFormData({...formData, middleName: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Contact</label>
              <input
                type="tel"
                value={formData.contact}
                onChange={(e) => setFormData({...formData, contact: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Designation</label>
              <input
                type="text"
                value={formData.designation}
                onChange={(e) => setFormData({...formData, designation: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Campus</label>
              <select
                value={formData.campus}
                onChange={(e) => setFormData({...formData, campus: e.target.value})}
                required
              >
                <option value="">Select Campus</option>
                <option value="Lingayen">Lingayen</option>
                <option value="Binmaley">Binmaley</option>
                <option value="Alaminos">Alaminos</option>
                <option value="Asingan">Asingan</option>
                <option value="Bayambang">Bayambang</option>
                <option value="Infanta">Infanta</option>
                <option value="Sta Maria">Sta Maria</option>
                <option value="Urdaneta">Urdaneta</option>
                <option value="San Carlos">San Carlos</option>
              </select>
            </div>
            <div className="form-group">
              <label>Role</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
                required
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="dcc">DCC</option>
                <option value="process-owner">Process Owner</option>
              </select>
            </div>
            {!user && (
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required={!user}
                />
              </div>
            )}
          </div>
          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-button">
              {user ? 'Update User' : 'Create User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;