import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import FilterControls from './components/FilterControls';
import './App.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState({ priority: '', sortBy: 'createdAt' });

  // Fetch todos from API
  const fetchTodos = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      
      if (filter.priority) {
        queryParams.append('priority', filter.priority);
      }
      if (filter.sortBy) {
        queryParams.append('sortBy', filter.sortBy);
      }
      
      const response = await axios.get(`${API_BASE_URL}/todos?${queryParams}`);
      setTodos(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch todos. Please check if the server is running.');
      console.error('Error fetching todos:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [filter]);

  // Add new todo
  const addTodo = async (todoData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/todos`, todoData);
      await fetchTodos(); // Refresh the list to maintain sorting
      return response.data;
    } catch (err) {
      setError('Failed to add todo');
      console.error('Error adding todo:', err);
      throw err;
    }
  };

  // Update todo
  const updateTodo = async (id, updates) => {
    try {
      await axios.put(`${API_BASE_URL}/todos/${id}`, updates);
      await fetchTodos(); // Refresh the list to maintain sorting
    } catch (err) {
      setError('Failed to update todo');
      console.error('Error updating todo:', err);
    }
  };

  // Delete todo
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/todos/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (err) {
      setError('Failed to delete todo');
      console.error('Error deleting todo:', err);
    }
  };

  // Toggle todo completion
  const toggleTodo = async (id, completed) => {
    await updateTodo(id, { completed });
  };

  return (
    <div className="app">
      <div className="container">
        <header className="app-header">
          <h1>Priority Todo List</h1>
          <p>Organize your tasks by priority and stay focused on what matters most</p>
        </header>

        <div className="app-content">
          <div className="todo-form-section">
            <TodoForm onSubmit={addTodo} />
          </div>

          <div className="todo-list-section">
            <FilterControls 
              filter={filter} 
              onFilterChange={setFilter}
              totalCount={todos.length}
            />
            
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            {loading ? (
              <div className="loading">Loading todos...</div>
            ) : (
              <TodoList 
                todos={todos}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onUpdate={updateTodo}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
