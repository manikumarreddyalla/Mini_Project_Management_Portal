const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { testConnection } = require('./config/database');
const TaskModel = require('./models/Task');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test database connection on startup
let dbConnected = false;

async function checkDatabase() {
  dbConnected = await testConnection();
  if (!dbConnected) {
    console.warn('? Warning: Database not connected. Run: node init-db.js');
  }
}

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'Mini Project Management Portal API - Server is running!',
    database: dbConnected ? 'connected' : 'disconnected'
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', database: dbConnected });
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  await checkDatabase();
  console.log(\Server running on port \$\{PORT}\);
  console.log('To initialize database, run: node init-db.js');
});

module.exports = app;
