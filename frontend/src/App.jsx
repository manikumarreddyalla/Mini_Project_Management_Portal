import { useState, useEffect } from 'react';
import Dashboard from './pages/Dashboard';
import AddTask from './pages/AddTask';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  useEffect(() => {
    // Simple routing based on URL
    const path = window.location.pathname;
    if (path.includes('/add-task')) {
      setCurrentPage('addtask');
    } else {
      setCurrentPage('dashboard');
    }
  }, []);

  // Simple navigation handler
  const navigateTo = (page) => {
    setCurrentPage(page);
    if (page === 'dashboard') {
      window.history.pushState({}, '', '/');
    } else if (page === 'addtask') {
      window.history.pushState({}, '', '/add-task');
    }
  };

  // Re-navigate on URL change
  useEffect(() => {
    window.addEventListener('popstate', () => {
      const path = window.location.pathname;
      setCurrentPage(path.includes('/add-task') ? 'addtask' : 'dashboard');
    });
  }, []);

  return (
    <div className='app'>
      {currentPage === 'dashboard' && <Dashboard onNavigate={navigateTo} />}
      {currentPage === 'addtask' && <AddTask onNavigate={navigateTo} />}
    </div>
  );
}

export default App;
