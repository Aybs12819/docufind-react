import React, { useState } from 'react';

const Templates = () => {
  const [templates, setTemplates] = useState([
    {
      id: 1,
      title: 'Process Manual Template',
      category: 'Process Documentation',
      lastUpdated: '2024-01-10',
      description: 'Standard template for documenting university processes',
      sections: ['Purpose', 'Scope', 'Process Flow', 'Responsibilities']
    },
    {
      id: 2,
      title: 'EOMS Manual Template',
      category: 'Quality Management',
      lastUpdated: '2024-01-05',
      description: 'Template for Educational Organizations Management System documentation',
      sections: ['Introduction', 'Quality Policy', 'Procedures', 'Forms']
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    'all',
    'Process Documentation',
    'Quality Management',
    'Work Instructions',
    'Forms'
  ];

  return (
    <div className="templates-section">
      <div className="section-header">
        <h2>Document Templates</h2>
      </div>

      <div className="template-filters">
        {categories.map(category => (
          <button
            key={category}
            className={`category-button ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category === 'all' ? 'All Templates' : category}
          </button>
        ))}
      </div>

      <div className="templates-grid">
        {templates.map(template => (
          <div key={template.id} className="template-card">
            <div className="template-icon">
              <i className="fas fa-file-alt"></i>
            </div>
            <div className="template-content">
              <h3>{template.title}</h3>
              <span className="template-category">{template.category}</span>
              <p className="template-description">{template.description}</p>
              <div className="template-sections">
                <h4>Includes:</h4>
                <ul>
                  {template.sections.map((section, index) => (
                    <li key={index}>{section}</li>
                  ))}
                </ul>
              </div>
              <p className="template-date">Last updated: {template.lastUpdated}</p>
            </div>
            <div className="template-actions">
              <button className="action-button preview">Preview</button>
              <button className="action-button use">Use Template</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Templates;