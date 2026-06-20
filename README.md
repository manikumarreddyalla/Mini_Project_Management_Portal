# Mini Project Management Portal

A full-stack web application for managing project tasks with a modern, responsive user interface.

**Author:** Mani Kumar Reddy Alla  
**University:** Vel Tech (Deemed to be University), 4th Year CSE  
**Project Type:** Full-Stack Development Assessment

---

## ?? Project Overview

This is a task management application built as a 4th-year CSE project. The application allows users to manage their project tasks efficiently with a clean, intuitive interface and robust backend.

### Problem Statement
Build a web application where users can manage project tasks:
- ? View all tasks
- ? Create a new task
- ? Mark a task as completed
- ? Delete a task
- ? Filter tasks by status

---

## ??? Technologies Used

### Frontend
- **React.js** - Component-based UI library
- **Vite** - Modern frontend build tool (faster than Create React App)
- **Axios** - HTTP client for API calls
- **CSS3** - Responsive styling
- **JavaScript ES6+** - Modern JavaScript

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework for REST APIs
- **MySQL** - Relational database
- **mysql2/promise** - MySQL driver with async/await support

### Development Tools
- **Git** - Version control
- **npm** - Package manager
- **Git Bash/PowerShell** - Command line

---

## ?? Project Structure

\\\
mini-project-management-portal/
¦
+-- frontend/                          # React application
¦   +-- src/
¦   ¦   +-- components/               # Reusable UI components
¦   ¦   ¦   +-- Header.jsx           # Header component
¦   ¦   ¦   +-- TaskCard.jsx         # Individual task display
¦   ¦   ¦   +-- TaskForm.jsx         # Task form (future)
¦   ¦   ¦   +-- LoadingSpinner.jsx   # Loading indicator
¦   ¦   ¦   +-- EmptyState.jsx       # Empty state message
¦   ¦   ¦   +-- ErrorAlert.jsx       # Error messages
¦   ¦   ¦   +-- Button.jsx           # Reusable button
¦   ¦   +-- pages/                    # Page components
¦   ¦   ¦   +-- Dashboard.jsx        # Main task list page
¦   ¦   ¦   +-- AddTask.jsx          # Create task page
¦   ¦   +-- services/
¦   ¦   ¦   +-- taskService.js       # API calls
¦   ¦   +-- App.jsx                  # Main app component
¦   ¦   +-- App.css                  # Global styles
¦   ¦   +-- main.jsx                 # Entry point
¦   +-- index.html                   # HTML template
¦   +-- vite.config.js              # Vite configuration
¦   +-- package.json                # Dependencies
¦   +-- .env.example                # Environment template
¦
+-- backend/                           # Node.js/Express server
¦   +-- config/
¦   ¦   +-- database.js             # MySQL connection
¦   +-- controllers/
¦   ¦   +-- taskController.js       # Request handlers
¦   +-- models/
¦   ¦   +-- Task.js                 # Task data model
¦   +-- routes/
¦   ¦   +-- taskRoutes.js           # API route definitions
¦   +-- middleware/
¦   ¦   +-- index.js                # Logger & error handler
¦   ¦   +-- validation.js           # Input validation
¦   +-- server.js                   # Express app
¦   +-- init-db.js                  # Database initialization
¦   +-- test-api.js                 # API testing script
¦   +-- package.json                # Dependencies
¦   +-- .env                        # Environment variables
¦   +-- .env.example                # Environment template
¦
+-- README.md                         # This file
+-- .gitignore                        # Git ignore rules
+-- INTEGRATION_TESTING_REPORT.md    # Test results
+-- TESTING_CHECKLIST.md             # Testing guide

\\\

---

## ?? Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- MySQL (v5.7 or higher)
- Git

### Setup Steps

#### 1. Clone the Repository
\\\ash
git clone https://github.com/manikumarreddyalla/Mini_Project_Management_Portal.git
cd Mini_Project_Management_Portal
\\\

#### 2. Switch to Development Branch
\\\ash
git checkout manikumarreddyalla-mini-project-management-portal
\\\

#### 3. Setup Backend

\\\ash
cd backend
npm install
\\\

Create a \.env\ file in the backend directory:
\\\
PORT=5000
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=task_management
NODE_ENV=development
\\\

Initialize the database:
\\\ash
node init-db.js
\\\

Start the backend server:
\\\ash
node server.js
\\\

The backend will run on: **http://localhost:5000**

#### 4. Setup Frontend

In a new terminal:
\\\ash
cd frontend
npm install
\\\

Create a \.env\ file in the frontend directory:
\\\
VITE_API_URL=http://localhost:5000/api
\\\

Start the frontend development server:
\\\ash
npm run dev
\\\

The frontend will run on: **http://localhost:3000**

---

## ?? API Documentation

### Base URL
\http://localhost:5000/api\

### Authentication
No authentication required for this version.

### Endpoints

#### 1. Get All Tasks
- **Method:** \GET\
- **Endpoint:** \/tasks\
- **Response:**
\\\json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Build Login Page",
      "description": "Create a responsive login page",
      "status": "Pending",
      "created_at": "2024-06-20T10:30:00Z",
      "updated_at": "2024-06-20T10:30:00Z"
    }
  ],
  "count": 1
}
\\\

#### 2. Get Tasks by Status
- **Method:** \GET\
- **Endpoint:** \/tasks/status/:status\
- **Parameters:** \status\ - "Pending", "In Progress", or "Completed"
- **Example:** \/tasks/status/Completed\

#### 3. Create Task
- **Method:** \POST\
- **Endpoint:** \/tasks\
- **Request Body:**
\\\json
{
  "title": "Build Login Page",
  "description": "Create a responsive login page with validation",
  "status": "Pending"
}
\\\
- **Validation:**
  - \	itle\ is required, max 255 characters
  - \description\ is required, min 20 characters, max 5000 characters
  - \status\ is optional (defaults to "Pending")

#### 4. Update Task Status
- **Method:** \PUT\
- **Endpoint:** \/tasks/:id\
- **Request Body:**
\\\json
{
  "status": "Completed"
}
\\\
- **Valid Status Values:** "Pending", "In Progress", "Completed"

#### 5. Delete Task
- **Method:** \DELETE\
- **Endpoint:** \/tasks/:id\
- **Response:**
\\\json
{
  "success": true,
  "message": "Task deleted successfully"
}
\\\

### Error Responses
\\\json
{
  "success": false,
  "message": "Error message",
  "errors": ["Specific error 1", "Specific error 2"]
}
\\\

---

## ??? Database Schema

### Tasks Table
\\\sql
CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  status ENUM('Pending', 'In Progress', 'Completed') DEFAULT 'Pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_status (status),
  INDEX idx_created_at (created_at)
);
\\\

---

## ? Features Implemented

### Core Features (Problem Statement)
- ? **View All Tasks** - Display all tasks in a responsive grid
- ? **Create New Task** - Form with validation
- ? **Mark as Completed** - Update task status
- ? **Delete Task** - Remove tasks with confirmation
- ? **Filter by Status** - All/Pending/In Progress/Completed

### Additional Features
- ? **Responsive Design** - Mobile, tablet, and desktop views
- ? **Form Validation** - Frontend and backend validation
- ? **Error Handling** - User-friendly error messages
- ? **Loading States** - Spinner during data fetch
- ? **Empty State** - Message when no tasks exist
- ? **Professional UI** - Modern design with color-coded statuses
- ? **Character Counters** - Real-time character feedback
- ? **Confirmation Dialogs** - Prevent accidental deletes
- ? **API Testing** - Automated test script included

---

## ?? Design Highlights

### Color Scheme
- **Primary:** Purple (#667eea) - Buttons, highlights
- **Success:** Green (#4caf50) - Completed tasks, complete button
- **Warning:** Yellow/Orange (#f57c00) - In Progress tasks
- **Danger:** Red (#d32f2f) - Delete button, pending tasks
- **Background:** Light gray (#f5f5f5) - Main background

### Responsive Breakpoints
- **Mobile:** < 768px (single column, stacked buttons)
- **Tablet:** 768px - 1024px (flexible layout)
- **Desktop:** > 1024px (optimized spacing)

---

## ?? Testing

### How to Test
1. Start backend: \
ode backend/server.js\
2. Initialize DB: \
ode backend/init-db.js\
3. Start frontend: \
pm run dev\ (in frontend folder)
4. Open browser: \http://localhost:3000\

### Running API Tests
\\\ash
cd backend
node test-api.js
\\\

### Manual Testing Checklist
See \TESTING_CHECKLIST.md\ for comprehensive testing guide.

---

## ?? Code Quality

- **Frontend:** React best practices, component reusability
- **Backend:** Clean architecture, separation of concerns
- **Validation:** Input validation on both frontend and backend
- **Error Handling:** Try-catch blocks, proper error responses
- **Documentation:** Comments in complex logic
- **Git Practices:** Meaningful commit messages, clean history

---

## ?? Assumptions Made

1. **Single User:** No multi-user system or authentication (JWT can be added later)
2. **No Priority Levels:** Tasks only have status, not priority
3. **Simple Relationships:** Tasks are independent, no subtasks
4. **MySQL Locally:** Assumes MySQL is installed and running locally
5. **No Real-time Updates:** Page refresh may be needed in multi-user scenarios
6. **Development Environment:** Uses .env for configuration
7. **HTTP Only:** No HTTPS in development (add in production)
8. **CORS Enabled:** API accessible from any origin (secure in production)

---

## ?? Future Enhancements

### Could be Added
- User authentication with JWT
- Search functionality
- Task pagination
- Sorting by date or priority
- Task categories/tags
- Due dates and reminders
- File attachments
- Comments/notes on tasks
- User profiles
- Admin dashboard

---

## ?? Commit History

This project was built in 8 phases with clear git commits:

1. **Initial project setup** - Frontend and Backend scaffolding
2. **Implemented database design** - MySQL schema and models
3. **Implemented task APIs** - GET, POST, PUT, DELETE endpoints
4. **Added validation and error handling** - Input validation
5. **Added React components** - Header, TaskCard, utilities
6. **Added Dashboard and Add Task pages** - Core UI
7. **Integrated frontend with backend** - Full integration test
8. **Final documentation** - README and polish

Each commit represents a complete, working feature.

---

## ?? Troubleshooting

### Backend Won't Start
- Check if port 5000 is already in use
- Verify Node.js is installed: \
ode --version\
- Reinstall dependencies: \m -rf node_modules && npm install\

### Database Connection Error
- Verify MySQL is running
- Check .env credentials are correct
- Run: \
ode init-db.js\ to initialize database
- Check MySQL user permissions

### Frontend Won't Load
- Check if frontend server is running on port 3000
- Verify \VITE_API_URL\ in .env matches backend URL
- Clear browser cache and refresh

### API Calls Failing
- Check backend server is running
- Verify API endpoint URLs match
- Check browser console for CORS errors
- Verify request/response format matches documentation

---

## ?? Contact & Support

**Author:** Mani Kumar Reddy Alla  
**Email:** manikumarreddyalla@email.com  
**GitHub:** https://github.com/manikumarreddyalla  
**Repository:** https://github.com/manikumarreddyalla/Mini_Project_Management_Portal

---

## ?? License

This project is created for educational purposes as part of the 4th-year CSE curriculum at Vel Tech University.

---

## ?? Acknowledgments

- **Vel Tech University** - For the opportunity to work on this project
- **Express.js Documentation** - Framework reference
- **React Documentation** - Component patterns
- **MySQL Documentation** - Database design

---

**Project Status:** ? Complete and Ready for Submission

Last Updated: June 20, 2024
