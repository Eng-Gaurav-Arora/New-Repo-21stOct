import React from 'react';
import './FilterControls.css';

const FilterControls = ({ filter, onFilterChange, totalCount }) => {
  const handlePriorityChange = (priority) => {
    onFilterChange(prev => ({
      ...prev,
      priority: prev.priority === priority ? '' : priority
    }));
  };

  const handleSortChange = (sortBy) => {
    onFilterChange(prev => ({
      ...prev,
      sortBy
    }));
  };

  const clearFilters = () => {
    onFilterChange({
      priority: '',
      sortBy: 'createdAt'
    });
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filter.priority) count++;
    if (filter.sortBy !== 'createdAt') count++;
    return count;
  };

  const getPriorityStats = () => {
    // This would ideally come from the API, but for now we'll show basic info
    return {
      high: '🔴',
      medium: '🟡', 
      low: '🟢'
    };
  };

  const priorityStats = getPriorityStats();

  return (
    <div className="filter-controls">
      <div className="filter-header">
        <h3>Filter & Sort Tasks</h3>
        <div className="task-count">
          Total: <span className="count-number">{totalCount}</span> tasks
        </div>
      </div>

      <div className="filter-section">
        <div className="filter-group">
          <label>Filter by Priority:</label>
          <div className="priority-filters">
            {Object.entries(priorityStats).map(([priority, emoji]) => (
              <button
                key={priority}
                className={`priority-filter-btn ${filter.priority === priority ? 'active' : ''}`}
                onClick={() => handlePriorityChange(priority)}
                title={`Filter by ${priority} priority`}
              >
                {emoji} {priority.charAt(0).toUpperCase() + priority.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <label>Sort by:</label>
          <div className="sort-controls">
            <button
              className={`sort-btn ${filter.sortBy === 'createdAt' ? 'active' : ''}`}
              onClick={() => handleSortChange('createdAt')}
            >
              📅 Date Created
            </button>
            <button
              className={`sort-btn ${filter.sortBy === 'priority' ? 'active' : ''}`}
              onClick={() => handleSortChange('priority')}
            >
              ⚡ Priority Level
            </button>
          </div>
        </div>

        {getActiveFiltersCount() > 0 && (
          <div className="filter-actions">
            <button className="clear-filters-btn" onClick={clearFilters}>
              Clear All Filters ({getActiveFiltersCount()})
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterControls;
