function requestLogger(req, res, next) {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`[${timestamp}] ${req.method} ${req.path} - ${req.ip}`);
  next();
}

function errorHandler(err, req, res, next) {
  console.error('Error:', err);
  
  // Determine status code
  const statusCode = err.statusCode || 500;
  
  // Generic error response for production
  const errorResponse = {
    success: false,
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  };

  res.status(statusCode).json(errorResponse);
}

module.exports = { requestLogger, errorHandler };
