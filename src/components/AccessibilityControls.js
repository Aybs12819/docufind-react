import React, { useState } from 'react';

const AccessibilityControls = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleHighContrast = () => {
    document.body.classList.toggle('high-contrast');
  };

  return (
    <div>
      <button
        className="accessibility-trigger"
        aria-expanded={isOpen}
        aria-label="Toggle high contrast mode"
        onClick={toggleHighContrast}
      >
        <i className="fas fa-universal-access" aria-hidden="true" />
      </button>
    </div>
  );
};

export default AccessibilityControls;