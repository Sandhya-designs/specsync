/**
 * Global Error Handling Middleware
 * Catches and processes all errors in the application
 */

import { sendErrorResponse } from '../utils/responseHandler.js';
import { AppError } from '../utils/errorHandler.js';

/**
 * Error handler middleware
 * Must be the last middleware registered
 */
export const errorHandler = (err, req, res, next) => {
  // Log error details for debugging
  console.error('Error:', {
    message: err.message,
    stack: err.stack,
    statusCode: err.statusCode,
  });

  // Default error response
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';
  let errors = null;

  // Handle specific error types
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    statusCode = 400;
    message = 'Invalid JSON format';
  }

  // Handle validation errors
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation failed';
    errors = Object.values(err.errors).map((e) => e.message);
  }

  // Handle MongoDB duplicate key error
  if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue)[0];
    message = `${field} already exists`;
  }

  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token';
  }

  if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token has expired';
  }

  return sendErrorResponse(res, statusCode, message, errors);
};

/**
 * 404 Not Found handler
 */
export const notFoundHandler = (req, res) => {
  return sendErrorResponse(
    res,
    404,
    `Route ${req.originalUrl} not found`
  );
};

export default {
  errorHandler,
  notFoundHandler,
};
