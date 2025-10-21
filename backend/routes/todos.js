const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// GET all todos
router.get('/', async (req, res) => {
  try {
    const { priority, sortBy } = req.query;
    let query = {};
    
    // Filter by priority if specified
    if (priority && ['low', 'medium', 'high'].includes(priority)) {
      query.priority = priority;
    }
    
    let todos = Todo.find(query);
    
    // Sort by priority or creation date
    if (sortBy === 'priority') {
      // Custom priority order: high > medium > low
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      todos = await todos.exec();
      todos.sort((a, b) => {
        const aPriority = priorityOrder[a.priority] || 2;
        const bPriority = priorityOrder[b.priority] || 2;
        if (aPriority === bPriority) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        }
        return bPriority - aPriority;
      });
    } else {
      todos = await todos.sort({ createdAt: -1 });
    }
    
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single todo
router.get('/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create new todo
router.post('/', async (req, res) => {
  try {
    const { title, description, priority } = req.body;
    
    if (!title || title.trim() === '') {
      return res.status(400).json({ message: 'Title is required' });
    }

    const todo = new Todo({
      title: title.trim(),
      description: description ? description.trim() : '',
      priority: priority && ['low', 'medium', 'high'].includes(priority) ? priority : 'medium'
    });

    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update todo
router.put('/:id', async (req, res) => {
  try {
    const { title, description, completed, priority } = req.body;
    
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    if (title !== undefined) todo.title = title.trim();
    if (description !== undefined) todo.description = description.trim();
    if (completed !== undefined) todo.completed = completed;
    if (priority !== undefined && ['low', 'medium', 'high'].includes(priority)) {
      todo.priority = priority;
    }

    const updatedTodo = await todo.save();
    res.json(updatedTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE todo
router.delete('/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
