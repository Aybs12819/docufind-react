import React, { useState } from 'react';

const DocumentTemplates = () => {
  const [templates, setTemplates] = useState([
    {
      id: 1,
      title: 'EOMS Manual Template',
      category: 'Educational Organizations Management System',
      lastModified: '2024-01-15',
      format: 'docx',
      status: 'active'
    },
    {
      id: 2,
      title: 'Process Manual Template',
      category: 'Process Manual',
      lastModified: '2024-01-10',
      format: 'docx',
      status: 'active'
    },
    {
      id: 3,
      title: 'Job Description Form',
      category: 'Forms',
      lastModified: '2024-01-05',
      format: 'docx',
      status: 'active'
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    'all',
    'Educational Organizations Management System',
    'Reference Manual',
    'Process Manual',
    'Job Description',
    'Forms'
  ];

  const filteredTemplates = activeCategory === 'all' 
    ? templates 
    : templates.filter(template => template.category === activeCategory);

  return (
    <div className="document-templates">
      <div className="section-header">
        <h2>Document Templates</h2>
        <button className="add-button" onClick={() => setShowForm(true)}>
          Add Template
        </button>
      </div>

      <div className="template-categories">
        {categories.map(category => (
          <button
            key={category}
            className={`category-button ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      <div className="templates-grid">
        {filteredTemplates.map(template => (
          <div key={template.id} className="template-card">
            <div className="template-icon">
              <i className="fas fa-file-word"></i>
            </div>
            <div className="template-info">
              <h3>{template.title}</h3>
              <p className="template-category">{template.category}</p>
              <p className="template-date">Last modified: {template.lastModified}</p>
            </div>
            <div className="template-actions">
              <button className="action-button edit" onClick={() => {
                setSelectedTemplate(template);
                setShowForm(true);
              }}>
                Edit
              </button>
              <button className="action-button view">
                Preview
              </button>
              <button className="action-button download">
                Download
              </button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{selectedTemplate ? 'Edit Template' : 'Add New Template'}</h2>
              <button className="close-button" onClick={() => {
                setShowForm(false);
                setSelectedTemplate(null);
              }}>&times;</button>
            </div>
            <form className="template-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>Template Title</label>
                  <input 
                    type="text" 
                    defaultValue={selectedTemplate?.title || ''}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select defaultValue={selectedTemplate?.category || ''}>
                    {categories.filter(cat => cat !== 'all').map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group full-width">
                  <label>Description</label>
                  <textarea 
                    defaultValue={selectedTemplate?.description || ''}
                    rows="4"
                  />
                </div>
                <div className="form-group">
                  <label>Upload Template File</label>
                  <input type="file" accept=".doc,.docx,.pdf" />
                </div>
              </div>
              <div className="form-actions">
                <button type="button" className="cancel-button" onClick={() => {
                  setShowForm(false);
                  setSelectedTemplate(null);
                }}>
                  Cancel
                </button>
                <button type="submit" className="submit-button">
                  {selectedTemplate ? 'Update Template' : 'Add Template'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentTemplates;