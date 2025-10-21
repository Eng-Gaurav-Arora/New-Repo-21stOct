import React, { useState } from 'react';
import './TodoItem.css';

const TodoItem = ({ todo, onToggle, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: todo.title,
    description: todo.description || '',
    priority: todo.priority
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#ff4757';
      case 'medium': return '#ffa502';
      case 'low': return '#2ed573';
      default: return '#ffa502';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '🟡';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({
      title: todo.title,
      description: todo.description || '',
      priority: todo.priority
    });
  };

  const handleSave = async () => {
    if (editData.title.trim()) {
      await onUpdate(todo._id, editData);
      setIsEditing(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleToggle = () => {
    onToggle(todo._id, !todo.completed);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      onDelete(todo._id);
    }
  };

  if (isEditing) {
    return (
      <div className="todo-item editing">
        <div className="edit-form">
          <div className="edit-row">
            <input
              type="text"
              name="title"
              value={editData.title}
              onChange={handleChange}
              className="edit-title"
              placeholder="Task title"
              autoFocus
            />
            <select
              name="priority"
              value={editData.priority}
              onChange={handleChange}
              className="edit-priority"
              style={{ borderColor: getPriorityColor(editData.priority) }}
            >
              <option value="low">🟢 Low</option>
              <option value="medium">🟡 Medium</option>
              <option value="high">🔴 High</option>
            </select>
          </div>
          <textarea
            name="description"
            value={editData.description}
            onChange={handleChange}
            className="edit-description"
            placeholder="Description (optional)"
            rows="2"
          />
          <div className="edit-actions">
            <button onClick={handleSave} className="save-btn">
              💾 Save
            </button>
            <button onClick={handleCancel} className="cancel-btn">
              ❌ Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''} priority-${todo.priority}`}>
      <div className="todo-content">
        <div className="todo-main">
          <div className="todo-checkbox-section">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={handleToggle}
              className="todo-checkbox"
              id={`todo-${todo._id}`}
            />
            <label htmlFor={`todo-${todo._id}`} className="checkbox-label"></label>
          </div>
          
          <div className="todo-details">
            <div className="todo-header">
              <h4 className="todo-title">{todo.title}</h4>
              <div className="priority-badge" style={{ backgroundColor: getPriorityColor(todo.priority) }}>
                {getPriorityIcon(todo.priority)} {todo.priority}
              </div>
            </div>
            
            {todo.description && (
              <p className="todo-description">{todo.description}</p>
            )}
            
            <div className="todo-meta">
              <span className="todo-date">Created {formatDate(todo.createdAt)}</span>
              {todo.updatedAt !== todo.createdAt && (
                <span className="todo-date">• Updated {formatDate(todo.updatedAt)}</span>
              )}
            </div>
          </div>
        </div>
        
        <div className="todo-actions">
          <button
            onClick={handleEdit}
            className="action-btn edit-btn"
            title="Edit todo"
            disabled={todo.completed}
          >
            ✏️
          </button>
          <button
            onClick={handleDelete}
            className="action-btn delete-btn"
            title="Delete todo"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
