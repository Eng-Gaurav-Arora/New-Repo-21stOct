import React, { useState } from 'react';
import './TodoForm.css';

const TodoForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      setFormData({
        title: '',
        description: '',
        priority: 'medium'
      });
    } catch (error) {
      console.error('Error submitting todo:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#ff4757';
      case 'medium': return '#ffa502';
      case 'low': return '#2ed573';
      default: return '#ffa502';
    }
  };

  return (
    <div className="todo-form-container">
      <h2>Add New Todo</h2>
      <form onSubmit={handleSubmit} className="todo-form">
        <div className="form-group">
          <label htmlFor="title">Task Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="What needs to be done?"
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Additional details (optional)"
            rows="3"
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="priority">Priority Level</label>
          <div className="priority-selector">
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              disabled={isSubmitting}
              style={{
                borderColor: getPriorityColor(formData.priority),
                color: getPriorityColor(formData.priority)
              }}
            >
              <option value="low">🟢 Low Priority</option>
              <option value="medium">🟡 Medium Priority</option>
              <option value="high">🔴 High Priority</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="submit-btn"
          disabled={!formData.title.trim() || isSubmitting}
        >
          {isSubmitting ? 'Adding...' : 'Add Todo'}
        </button>
      </form>
    </div>
  );
};

export default TodoForm;
