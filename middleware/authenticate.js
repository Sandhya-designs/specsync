/**
 * Authentication Middleware
 * Verifies JWT token and attaches user info to request
 */

import { verifyToken } from '../utils/jwtUtils.js';
import { sendErrorResponse } from '../utils/responseHandler.js';
import User from '../models/User.js';

export const authenticate = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return sendErrorResponse(res, 401, 'No token provided. Please login first.');
    }

    // Verify token
    const decoded = verifyToken(token);

    // Get user from database
    const user = await User.findById(decoded.id);

    if (!user) {
      return sendErrorResponse(res, 401, 'User not found');
    }

    if (!user.isActive) {
      return sendErrorResponse(res, 401, 'User account is inactive');
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication error:', error.message);
    return sendErrorResponse(res, 401, 'Invalid or expired token');
  }
};

export default authenticate;
