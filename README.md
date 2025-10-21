# Priority Todo List

A full-stack MERN (MongoDB, Express, React, Node.js) todo application with priority management features.

## Features

### 🎯 Priority Management
- **Three Priority Levels**: High (🔴), Medium (🟡), Low (🟢)
- **Visual Priority Indicators**: Color-coded badges and left borders
- **Priority-based Sorting**: Sort tasks by priority level (High → Medium → Low)
- **Priority Filtering**: Filter tasks by specific priority levels

### ✅ Task Management
- **CRUD Operations**: Create, Read, Update, Delete todos
- **Task Completion**: Mark tasks as completed with visual feedback
- **Rich Task Details**: Title, description, priority, and timestamps
- **Inline Editing**: Edit tasks directly in the list view

### 📊 Organization & Filtering
- **Smart Sorting**: Sort by creation date or priority level
- **Priority Filters**: View tasks by specific priority levels
- **Task Statistics**: Track pending vs completed tasks
- **Clear Filters**: Reset all filters with one click

### 🎨 User Experience
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modern UI**: Clean, intuitive interface with smooth animations
- **Visual Feedback**: Loading states, hover effects, and transitions
- **Accessibility**: Proper labels, keyboard navigation, and screen reader support

## Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB

### Frontend
- **React** - UI library
- **Axios** - HTTP client
- **CSS3** - Styling with modern features

## API Endpoints

### Todo Routes (`/api/todos`)

#### GET `/`
Get all todos with optional filtering and sorting
- Query parameters:
  - `priority`: Filter by priority (`low`, `medium`, `high`)
  - `sortBy`: Sort method (`createdAt` or `priority`)

**Example**: `/api/todos?priority=high&sortBy=priority`

#### GET `/:id`
Get a specific todo by ID

#### POST `/`
Create a new todo
```json
{
  "title": "Task title (required)",
  "description": "Task description (optional)",
  "priority": "high|medium|low (optional, defaults to medium)"
}
```

#### PUT `/:id`
Update a todo
```json
{
  "title": "Updated title (optional)",
  "description": "Updated description (optional)", 
  "completed": true|false,
  "priority": "high|medium|low (optional)"
}
```

#### DELETE `/:id`
Delete a todo

## Database Schema

### Todo Model
```javascript
{
  title: String (required),
  description: String (optional),
  completed: Boolean (default: false),
  priority: String (enum: ['low', 'medium', 'high'], default: 'medium'),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-updated)
}
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file:
   ```env
   MONGODB_URI=mongodb://localhost:27017/todolist
   PORT=5000
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The application will be available at `http://localhost:3000`

## Usage Examples

### Creating a High Priority Task
1. Fill in the task title: "Complete project proposal"
2. Add description: "Finalize the Q4 project proposal for client review"
3. Select "🔴 High Priority"
4. Click "Add Todo"

### Filtering by Priority
1. In the filter section, click on "🔴 High" to see only high-priority tasks
2. Use "🟡 Medium" or "🟢 Low" for other priorities
3. Click "Clear All Filters" to reset

### Sorting by Priority
1. In the sort section, click "⚡ Priority Level"
2. Tasks will be ordered: High → Medium → Low
3. Click "📅 Date Created" to sort by creation date

### Editing Tasks
1. Click the ✏️ edit button on any task
2. Modify the title, description, or priority
3. Click "💾 Save" to confirm or "❌ Cancel" to discard changes

## Component Structure

```
src/
├── components/
│   ├── TodoForm.js          # Add new todos
│   ├── TodoForm.css
│   ├── TodoList.js          # List container
│   ├── TodoList.css
│   ├── TodoItem.js          # Individual todo item
│   ├── TodoItem.css
│   ├── FilterControls.js    # Filter and sort controls
│   └── FilterControls.css
├── utils/
│   └── todoUtils.js         # Utility functions
├── App.js                   # Main application component
├── App.css
└── index.js                 # Entry point
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes and commit: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Future Enhancements

- [ ] Due dates and reminders
- [ ] Categories and tags
- [ ] User authentication
- [ ] Task sharing and collaboration
- [ ] Dark mode theme
- [ ] Drag and drop reordering
- [ ] Bulk operations
- [ ] Search functionality
- [ ] Export/import features
- [ ] Task templates
