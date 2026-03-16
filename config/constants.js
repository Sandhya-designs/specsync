/**
 * Application Constants
 * Centralized configuration for roles, permissions, and business logic
 */

export const USER_ROLES = {
  ADMIN: 'Admin',
  BUSINESS_ANALYST: 'BusinessAnalyst',
  DEVELOPER: 'Developer',
  QA: 'QA',
  VIEWER: 'Viewer',
};

export const ROLE_PERMISSIONS = {
  [USER_ROLES.ADMIN]: ['create', 'read', 'update', 'delete', 'manage_users'],
  [USER_ROLES.BUSINESS_ANALYST]: ['create', 'read', 'update', 'delete'],
  [USER_ROLES.DEVELOPER]: ['read', 'update'],
  [USER_ROLES.QA]: ['read', 'update'],
  [USER_ROLES.VIEWER]: ['read'],
};

export const DRIFT_TYPES = {
  VERSION_MISMATCH: 'Version Mismatch',
  ORPHAN_FEATURE: 'Orphan Feature',
  IMPLEMENTATION_GAP: 'Implementation Gap',
  TESTING_GAP: 'Testing Gap',
  CRITICAL_RISK: 'Critical Risk',
};

export const DRIFT_SEVERITY = {
  VERSION_MISMATCH: 'Medium',
  ORPHAN_FEATURE: 'High',
  IMPLEMENTATION_GAP: 'High',
  TESTING_GAP: 'Medium',
  CRITICAL_RISK: 'Critical',
};

export const REQUIREMENT_PRIORITY = {
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High',
  CRITICAL: 'Critical',
};

export const RISK_LEVELS = {
  STABLE: 'Stable',
  MODERATE: 'Moderate',
  HIGH_RISK: 'High Risk',
};

// Drift score weights
export const DRIFT_WEIGHTS = {
  CRITICAL: 5,
  HIGH: 3,
  MEDIUM: 2,
  LOW: 1,
};

// Risk level thresholds
export const RISK_THRESHOLDS = {
  STABLE: 10,
  MODERATE: 25,
  HIGH_RISK: 100,
};

export const HTTP_RESPONSES = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  SERVER_ERROR: 500,
};
