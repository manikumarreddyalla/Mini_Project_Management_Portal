const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { testConnection } = require('./config/database');
const taskRoutes = require('./routes/taskRoutes');
const { requestLogger, errorHandler } = require('./middleware');

const app = express();

// CORS Configuration
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' ? 'https://yourdomain.com' : '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));

// Body parser middleware
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ limit: '10kb', extended: true }));

// Request logging
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
    database: dbConnected ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString()
  });
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    database: dbConnected,
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/tasks', taskRoutes);

// 404 handler - must come before error handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
    path: req.path,
    method: req.method
  });
});

// Error handling middleware - must come last
app.use(errorHandler);

// Server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, async () => {
  await checkDatabase();
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 API Base URL: http://localhost:${PORT}/api`);
  if (!dbConnected) {
    console.log('⚠️  To initialize database, run: node init-db.js');
  }
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

module.exports = app;
