const { pool, testConnection } = require('./config/database');
const TaskModel = require('./models/Task');
require('dotenv').config();

async function initializeDatabase() {
  console.log('Initializing database...');
  
  const connected = await testConnection();
  if (!connected) {
    console.error('Cannot initialize database without connection');
    process.exit(1);
  }

  const tableCreated = await TaskModel.createTasksTable();
  if (!tableCreated) {
    console.error('Failed to create tasks table');
    process.exit(1);
  }

  console.log('? Database initialized successfully');
  process.exit(0);
}

initializeDatabase();
