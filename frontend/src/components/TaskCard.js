import React from 'react';
import './TaskCard.css';

export default function TaskCard({ task, onComplete, onDelete }) {
  const getStatusColor = (status) => {
    switch(status) {
      case 'Pending': return 'status-pending';
      case 'In Progress': return 'status-progress';
      case 'Completed': return 'status-completed';
      default: return '';
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="task-card">
      <div className="task-header">
        <h3>{task.title}</h3>
        <span className={`status-badge ${getStatusColor(task.status)}`}>
          {task.status}
        </span>
      </div>
      <p className="task-description">{task.description}</p>
      <div className="task-footer">
        <small className="task-date">📅 {formatDate(task.created_at)}</small>
        <div className="task-actions">
          {task.status !== 'Completed' && (
            <button 
              className="btn btn-complete" 
              onClick={() => onComplete(task.id)}
              title="Mark as completed"
            >
              ✅ Complete
            </button>
          )}
          <button 
            className="btn btn-delete" 
            onClick={() => onDelete(task.id)}
            title="Delete task"
          >
            🗑️ Delete
          </button>
        </div>
      </div>
    </div>
  );
}
