import React from 'react';
import TodoItem from './TodoItem';
import './TodoList.css';

const TodoList = ({ todos, onToggle, onDelete, onUpdate }) => {
  if (!todos || todos.length === 0) {
    return (
      <div className="todo-list-empty">
        <div className="empty-state">
          <div className="empty-icon">📝</div>
          <h3>No todos found</h3>
          <p>Add your first task above to get started!</p>
        </div>
      </div>
    );
  }

  const completedCount = todos.filter(todo => todo.completed).length;
  const pendingCount = todos.length - completedCount;

  return (
    <div className="todo-list-container">
      <div className="todo-list-header">
        <div className="todo-stats">
          <span className="stat">
            <span className="stat-number">{pendingCount}</span>
            <span className="stat-label">Pending</span>
          </span>
          <span className="stat">
            <span className="stat-number">{completedCount}</span>
            <span className="stat-label">Completed</span>
          </span>
        </div>
      </div>
      
      <div className="todo-list">
        {todos.map((todo) => (
          <TodoItem
            key={todo._id}
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
