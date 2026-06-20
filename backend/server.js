const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { testConnection } = require('./config/database');
const taskRoutes = require('./routes/taskRoutes');
const { requestLogger, errorHandler } = require('./middleware');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(requestLogger);

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

// API Routes
app.use('/api/tasks', taskRoutes);

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  await checkDatabase();
  console.log(\Server running on port \$\{PORT}\);
  console.log('API Base URL: http://localhost:\$\{PORT}\/api');
  console.log('To initialize database, run: node init-db.js');
});

module.exports = app;
