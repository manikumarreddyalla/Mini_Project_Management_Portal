const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/taskController');

// GET all tasks
router.get('/', TaskController.getAllTasks);

// GET tasks by status
router.get('/status/:status', TaskController.getTasksByStatus);

// POST create new task
router.post('/', TaskController.createTask);

// PUT update task status
router.put('/:id', TaskController.updateTaskStatus);

// DELETE task
router.delete('/:id', TaskController.deleteTask);

module.exports = router;
