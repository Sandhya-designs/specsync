/**
 * Authorization Middleware
 * Checks if user has required role and permissions
 */

import { sendErrorResponse } from '../utils/responseHandler.js';
import { ROLE_PERMISSIONS } from '../config/constants.js';

/**
 * Authorize user based on required role
 * @param {String|Array} requiredRoles - Required role(s)
 * @returns {Function} Middleware function
 */
export const authorize = (requiredRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return sendErrorResponse(res, 401, 'Authentication required');
    }

    // Handle single role or array of roles
    const roles = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];

    // Check if user's role is in required roles
    if (!roles.includes(req.user.role)) {
      return sendErrorResponse(
        res,
        403,
        `Access denied. Required role(s): ${roles.join(', ')}`
      );
    }

    next();
  };
};

/**
 * Authorize user based on required permission
 * @param {String} requiredPermission - Required permission
 * @returns {Function} Middleware function
 */
export const authorizePermission = (requiredPermission) => {
  return (req, res, next) => {
    if (!req.user) {
      return sendErrorResponse(res, 401, 'Authentication required');
    }

    // Get user's permissions based on role
    const userPermissions = ROLE_PERMISSIONS[req.user.role] || [];

    if (!userPermissions.includes(requiredPermission)) {
      return sendErrorResponse(
        res,
        403,
        `Permission denied. Required permission: ${requiredPermission}`
      );
    }

    next();
  };
};

export default {
  authorize,
  authorizePermission,
};
