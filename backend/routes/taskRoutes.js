const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/taskController');
const { validateTaskInput, validateStatusUpdate, validateTaskId } = require('../middleware/validation');

// GET all tasks
router.get('/', TaskController.getAllTasks);

// GET tasks by status
router.get('/status/:status', TaskController.getTasksByStatus);

// POST create new task (with validation)
router.post('/', validateTaskInput, TaskController.createTask);

// PUT update task status (with validation)
router.put('/:id', validateStatusUpdate, TaskController.updateTaskStatus);

// DELETE task (with ID validation)
router.delete('/:id', validateTaskId, TaskController.deleteTask);

module.exports = router;
