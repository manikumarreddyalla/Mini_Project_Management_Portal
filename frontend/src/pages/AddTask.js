import React, { useState } from 'react';
import taskService from '../services/taskService';
import ErrorAlert from '../components/ErrorAlert';
import './AddTask.css';

export default function AddTask({ onTaskAdded, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Pending'
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (formData.description.length < 20) {
      newErrors.description = 'Description must be at least 20 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      await taskService.createTask(formData);
      setSuccess(true);
      setTimeout(() => {
        onTaskAdded();
      }, 1000);
    } catch (err) {
      setErrors({ submit: err.response?.data?.message || 'Failed to create task' });
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="add-task-page">
        <div className="form-container">
          <div className="success-message">
            <div className="success-icon">✓</div>
            <h2>Task Created Successfully!</h2>
            <p>Redirecting to dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="add-task-page">
      <div className="form-container">
        <div className="form-header">
          <h2>Create New Task</h2>
        </div>

        {errors.submit && (
          <ErrorAlert message={errors.submit} onClose={() => setErrors(prev => ({ ...prev, submit: '' }))} />
        )}

        <form onSubmit={handleSubmit} className="task-form">
          <div className="form-group">
            <label htmlFor="title">Task Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter task title"
              className={errors.title ? 'input-error' : ''}
            />
            {errors.title && <span className="error-text">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter task description (at least 20 characters)"
              rows="5"
              className={errors.description ? 'input-error' : ''}
            />
            <span className="char-count">
              {formData.description.length}/20 characters
            </span>
            {errors.description && <span className="error-text">{errors.description}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create Task'}
            </button>
            <button type="button" className="btn-cancel" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
