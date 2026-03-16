/**
 * Centralized Response Handler
 * Provides consistent response format across the application
 */

class ApiResponse {
  constructor(statusCode, data, message) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}

/**
 * Send success response
 */
export const sendResponse = (res, statusCode, data, message = 'Success') => {
  const response = new ApiResponse(statusCode, data, message);
  return res.status(statusCode).json(response);
};

/**
 * Send error response
 */
export const sendErrorResponse = (res, statusCode, message, errors = null) => {
  const response = {
    statusCode,
    message,
    success: false,
    errors,
  };
  return res.status(statusCode).json(response);
};

export default ApiResponse;
