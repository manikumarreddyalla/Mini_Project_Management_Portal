import { useState } from 'react';
import Header from '../components/Header';
import ErrorAlert from '../components/ErrorAlert';
import { taskService } from '../services/taskService';
import './AddTask.css';

export default function AddTask({ onNavigate }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Pending'
  });
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = [];
    
    if (!formData.title.trim()) {
      newErrors.push('Title is required');
    } else if (formData.title.length > 255) {
      newErrors.push('Title cannot exceed 255 characters');
    }

    if (!formData.description.trim()) {
      newErrors.push('Description is required');
    } else if (formData.description.length < 20) {
      newErrors.push('Description must be at least 20 characters');
    } else if (formData.description.length > 5000) {
      newErrors.push('Description cannot exceed 5000 characters');
    }

    const validStatuses = ['Pending', 'In Progress', 'Completed'];
    if (!validStatuses.includes(formData.status)) {
      newErrors.push('Invalid status selected');
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      setLoading(true);
      await taskService.createTask(formData);
      // Navigate back to dashboard
      if (onNavigate) {
        onNavigate('dashboard');
      } else {
        window.history.pushState({}, '', '/');
        window.location.reload();
      }
    } catch (err) {
      setErrors([err.response?.data?.message || 'Failed to create task']);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-task">
      <Header />
      
      <div className="container">
        <div className="form-card">
          <h2>✨ Create New Task</h2>
          
          {errors.length > 0 && (
            <ErrorAlert 
              message={errors.join(', ')} 
              onClose={() => setErrors([])} 
            />
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Task Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter task title"
                maxLength={255}
              />
              <small>{formData.title.length}/255</small>
            </div>

            <div className="form-group">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter task description (minimum 20 characters)"
                rows={5}
                maxLength={5000}
              />
              <small>{formData.description.length}/5000 (minimum 20)</small>
            </div>

            <div className="form-group">
              <label htmlFor="status">Initial Status *</label>
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
                {loading ? 'Creating...' : '✨ Create Task'}
              </button>
              <button 
                type="button" 
                className="btn-cancel" 
                onClick={() => onNavigate && onNavigate('dashboard')}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
