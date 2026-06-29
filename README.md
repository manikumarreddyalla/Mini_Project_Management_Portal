# Project Management Portal

A full-stack web application for managing project tasks through a clean, responsive interface with a scalable backend architecture. The application enables users to create, organize, update, filter, and manage project tasks efficiently using RESTful APIs and a MySQL database.

---

## Overview

Project Management Portal is designed to simplify project task management by providing an intuitive dashboard where users can manage tasks throughout their lifecycle.

The application follows a layered architecture with a React frontend, Express.js REST APIs, and MySQL for persistent storage. It demonstrates modern full-stack development practices including reusable components, API-driven communication, database design, validation, and clean project organization.

---

## Features

### Task Management

- Create new tasks
- View all tasks
- Update task status
- Delete tasks
- Filter tasks by status

### User Experience

- Responsive user interface
- Loading indicators
- Empty state handling
- Error handling
- Confirmation dialogs
- Character counters
- Modern dashboard layout

### Backend Features

- RESTful API architecture
- CRUD operations
- Input validation
- Centralized error handling
- MySQL database integration
- Modular MVC folder structure

---

# Tech Stack

## Frontend

- React.js
- Vite
- Axios
- JavaScript (ES6+)
- CSS3

## Backend

- Node.js
- Express.js
- REST APIs

## Database

- MySQL
- mysql2

## Development Tools

- Git
- GitHub
- npm

---

# System Architecture

```
            React Frontend
                  │
             Axios Requests
                  │
          Express REST APIs
                  │
         Business Logic Layer
                  │
          MySQL Database
```

---

# Project Structure

```text
project-management-portal/

├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
├── README.md
└── .gitignore
```

---

# Installation

## Prerequisites

- Node.js (v14 or above)
- npm
- MySQL
- Git

---

## Clone Repository

```bash
git clone https://github.com/manikumarreddyalla/project-management-portal.git

cd project-management-portal
```

---

## Backend Setup

```bash
cd backend

npm install
```

Create a `.env` file

```env
PORT=5000

MYSQL_HOST=localhost

MYSQL_USER=root

MYSQL_PASSWORD=your_password

MYSQL_DATABASE=task_management

NODE_ENV=development
```

Initialize Database

```bash
node init-db.js
```

Start Server

```bash
node server.js
```

Backend

```
http://localhost:5000
```

---

## Frontend Setup

```bash
cd frontend

npm install
```

Create `.env`

```env
VITE_API_URL=http://localhost:5000/api
```

Run

```bash
npm run dev
```

Frontend

```
http://localhost:3000
```

---

# API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /tasks | Retrieve all tasks |
| GET | /tasks/status/:status | Retrieve tasks by status |
| POST | /tasks | Create a task |
| PUT | /tasks/:id | Update task status |
| DELETE | /tasks/:id | Delete a task |

---

# Database Schema

## Tasks Table

| Column | Type |
|---------|------|
| id | INT |
| title | VARCHAR(255) |
| description | TEXT |
| status | ENUM |
| created_at | TIMESTAMP |
| updated_at | TIMESTAMP |

Indexes

- status
- created_at

---

# Design Decisions

- RESTful API architecture
- MVC project structure
- Modular React components
- Client-side and server-side validation
- Axios for API communication
- Indexed MySQL queries
- Clean separation of frontend and backend

---

# Validation

## Frontend

- Required field validation
- Character count validation
- Form validation

## Backend

- Request validation
- Input sanitization
- Error responses
- Status validation

---

# Error Handling

The application includes robust error handling for

- Invalid requests
- Database failures
- Network errors
- Validation failures
- Resource not found

---

# Testing

The project includes

- API testing script
- Integration testing
- Manual testing checklist

Run API tests

```bash
cd backend

node test-api.js
```

---

# Performance Highlights

- Optimized MySQL indexing
- Modular React components
- Reusable API service layer
- Asynchronous database operations
- Responsive UI rendering

---

# Future Improvements

- JWT Authentication
- User Roles
- Search Functionality
- Task Priority
- Due Dates
- File Attachments
- Notifications
- Activity Logs
- Pagination
- Dashboard Analytics

---

# Screenshots

> Add screenshots of

- Dashboard

- Create Task

- Filter Tasks

- Mobile View

---

# License

This project is intended for educational and portfolio purposes.

---

# Author

**Mani Kumar Reddy Alla**

GitHub:
https://github.com/manikumarreddyalla

LinkedIn:
(Add LinkedIn URL)

Email:
(Add Email)
