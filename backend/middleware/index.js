function requestLogger(req, res, next) {
  console.log(\\ - \ \\);
  next();
}

function errorHandler(err, req, res, next) {
  console.error('Error:', err.message);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
}

module.exports = { requestLogger, errorHandler };
