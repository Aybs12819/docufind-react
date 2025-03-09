// src/components/Container.js
import React from 'react';
import PropTypes from 'prop-types';

const Container = ({ children, className }) => {
  return (
    <div className={`container ${className}`}>
      {children}
    </div>
  );
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Container.defaultProps = {
  className: '',
};

export default Container;
