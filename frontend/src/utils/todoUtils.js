// Priority colors and utilities
export const PRIORITY_COLORS = {
  high: '#ff4757',
  medium: '#ffa502', 
  low: '#2ed573'
};

export const PRIORITY_ICONS = {
  high: '🔴',
  medium: '🟡',
  low: '🟢'
};

export const PRIORITY_ORDER = {
  high: 3,
  medium: 2,
  low: 1
};

// Utility functions
export const getPriorityColor = (priority) => {
  return PRIORITY_COLORS[priority] || PRIORITY_COLORS.medium;
};

export const getPriorityIcon = (priority) => {
  return PRIORITY_ICONS[priority] || PRIORITY_ICONS.medium;
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const sortTodosByPriority = (todos) => {
  return [...todos].sort((a, b) => {
    const aPriority = PRIORITY_ORDER[a.priority] || 2;
    const bPriority = PRIORITY_ORDER[b.priority] || 2;
    if (aPriority === bPriority) {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    return bPriority - aPriority;
  });
};
