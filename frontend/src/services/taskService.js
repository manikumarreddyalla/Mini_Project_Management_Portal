import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const taskService = {
  getAllTasks: () => api.get('/tasks'),
  createTask: (taskData) => api.post('/tasks', taskData),
  updateTaskStatus: (id, status) => api.put(/tasks/+id, { status }),
  deleteTask: (id) => api.delete(/tasks/+id),
  getTasksByStatus: (status) => api.get(/tasks/status/+status),
};

export default api;
