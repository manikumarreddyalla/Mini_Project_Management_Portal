const TaskModel = require('../models/Task');

class TaskController {
  static async getAllTasks(req, res) {
    try {
      const tasks = await TaskModel.getAllTasks();
      res.status(200).json({
        success: true,
        data: tasks,
        count: tasks.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch tasks',
        error: error.message
      });
    }
  }

  static async getTasksByStatus(req, res) {
    try {
      const { status } = req.params;
      
      // Validate status
      const validStatuses = ['Pending', 'In Progress', 'Completed'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid status. Must be: Pending, In Progress, or Completed'
        });
      }

      const tasks = await TaskModel.getTasksByStatus(status);
      res.status(200).json({
        success: true,
        data: tasks,
        count: tasks.length,
        status: status
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch tasks by status',
        error: error.message
      });
    }
  }

  static async createTask(req, res) {
    try {
      const { title, description, status } = req.body;

      // Validation
      if (!title || title.trim() === '') {
        return res.status(400).json({
          success: false,
          message: 'Title is required'
        });
      }

      if (!description || description.length < 20) {
        return res.status(400).json({
          success: false,
          message: 'Description must be at least 20 characters'
        });
      }

      const taskStatus = status || 'Pending';
      const validStatuses = ['Pending', 'In Progress', 'Completed'];
      if (!validStatuses.includes(taskStatus)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid status. Must be: Pending, In Progress, or Completed'
        });
      }

      const task = await TaskModel.createTask(title, description, taskStatus);
      res.status(201).json({
        success: true,
        message: 'Task created successfully',
        data: task
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to create task',
        error: error.message
      });
    }
  }

  static async updateTaskStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!status) {
        return res.status(400).json({
          success: false,
          message: 'Status is required'
        });
      }

      const validStatuses = ['Pending', 'In Progress', 'Completed'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid status. Must be: Pending, In Progress, or Completed'
        });
      }

      const result = await TaskModel.updateTaskStatus(id, status);
      
      if (!result) {
        return res.status(404).json({
          success: false,
          message: 'Task not found'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Task status updated successfully',
        data: result
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to update task',
        error: error.message
      });
    }
  }

  static async deleteTask(req, res) {
    try {
      const { id } = req.params;

      const result = await TaskModel.deleteTask(id);
      
      if (!result) {
        return res.status(404).json({
          success: false,
          message: 'Task not found'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Task deleted successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to delete task',
        error: error.message
      });
    }
  }
}

module.exports = TaskController;
