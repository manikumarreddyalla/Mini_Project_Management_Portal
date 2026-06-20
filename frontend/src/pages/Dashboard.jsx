import { useState, useEffect } from 'react';
import Header from '../components/Header';
import TaskCard from '../components/TaskCard';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';
import ErrorAlert from '../components/ErrorAlert';
import { taskService } from '../services/taskService';
import './Dashboard.css';

export default function Dashboard({ onNavigate }) {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await taskService.getAllTasks();
      setTasks(response.data.data);
      applyFilter('All', response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const applyFilter = (status, taskList) => {
    setStatusFilter(status);
    if (status === 'All') {
      setFilteredTasks(taskList);
    } else {
      setFilteredTasks(taskList.filter(task => task.status === status));
    }
  };

  const handleComplete = async (taskId) => {
    try {
      await taskService.updateTaskStatus(taskId, 'Completed');
      const updatedTasks = tasks.map(task =>
        task.id === taskId ? { ...task, status: 'Completed' } : task
      );
      setTasks(updatedTasks);
      applyFilter(statusFilter, updatedTasks);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update task');
    }
  };

  const handleDelete = async (taskId) => {
    if (!confirm('Are you sure you want to delete this task?')) return;

    try {
      await taskService.deleteTask(taskId);
      const updatedTasks = tasks.filter(task => task.id !== taskId);
      setTasks(updatedTasks);
      applyFilter(statusFilter, updatedTasks);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete task');
    }
  };

  return (
    <div className="dashboard">
      <Header />
      
      <div className="container">
        <div className="dashboard-header">
          <h2>📋 All Tasks</h2>
          <button className="btn-add-task" onClick={() => onNavigate && onNavigate('addtask')}>
            + Add New Task
          </button>
        </div>

        {error && <ErrorAlert message={error} onClose={() => setError(null)} />}

        <div className="filter-buttons">
          {['All', 'Pending', 'In Progress', 'Completed'].map(status => (
            <button
              key={status}
              className={`filter-btn ${statusFilter === status ? 'active' : ''}`}
              onClick={() => applyFilter(status, tasks)}
            >
              {status}
            </button>
          ))}
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : filteredTasks.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="tasks-grid">
            <div className="tasks-info">
              Showing {filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''}
            </div>
            {filteredTasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onComplete={handleComplete}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
