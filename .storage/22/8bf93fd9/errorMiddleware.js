const logger = require('../utils/logger');

// Middleware for handling 404 errors (Not Found)
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// Error handler middleware
const errorHandler = (err, req, res, next) => {
  // Set status code
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  // Log error
  logger.error(`${err.message}`);
  
  // Handle different error types
  let message = err.message;
  let errorDetails = {};
  
  if (err.name === 'ValidationError') {
    // Mongoose validation error
    message = 'Validation Error';
    Object.keys(err.errors).forEach(key => {
      errorDetails[key] = err.errors[key].message;
    });
  } else if (err.name === 'CastError') {
    // Mongoose cast error (invalid ObjectId)
    message = `Resource not found. Invalid: ${err.path}`;
  } else if (err.code === 11000) {
    // Mongoose duplicate key error
    message = 'Duplicate field value entered';
    errorDetails = err.keyValue;
  }

  // Send response
  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' ? { stack: err.stack, details: errorDetails } : {}),
  });
};

module.exports = { notFound, errorHandler };