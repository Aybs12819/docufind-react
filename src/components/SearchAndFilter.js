import React, { useState } from 'react';

const SearchAndFilter = ({ onSearch, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    type: 'all',
    status: 'all',
    date: 'all'
  });

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleFilterChange = (type, value) => {
    const newFilters = { ...filters, [type]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  return (
    <div className="search-filter-container">
      <div className="search-box">
        <i className="fas fa-search search-icon"></i>
        <input
          type="text"
          placeholder="Search documents..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className="filter-controls">
        <div className="filter-group">
          <label>Document Type</label>
          <select
            value={filters.type}
            onChange={(e) => handleFilterChange('type', e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="process">Process Manual</option>
            <option value="eoms">EOMS Manual</option>
            <option value="work">Work Instruction</option>
            <option value="form">Form</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Status</label>
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="draft">Draft</option>
            <option value="review">Under Review</option>
            <option value="published">Published</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Date</label>
          <select
            value={filters.date}
            onChange={(e) => handleFilterChange('date', e.target.value)}
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilter;