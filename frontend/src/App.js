import React, { useState } from 'react';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import AddTask from './pages/AddTask';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handleAddTaskClick = () => {
    setCurrentPage('addTask');
  };

  const handleTaskAdded = () => {
    setCurrentPage('dashboard');
  };

  const handleCancel = () => {
    setCurrentPage('dashboard');
  };

  return (
    <div className="app">
      <Header />
      {currentPage === 'dashboard' ? (
        <Dashboard onAddTaskClick={handleAddTaskClick} />
      ) : (
        <AddTask onTaskAdded={handleTaskAdded} onCancel={handleCancel} />
      )}
    </div>
  );
}

export default App;
