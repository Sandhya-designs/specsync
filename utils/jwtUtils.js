/**
 * JWT Token Utility
 * Handles token generation and verification
 */

import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';
const JWT_EXPIRE = process.env.JWT_EXPIRE || '7d';

/**
 * Generate JWT token
 * @param {String} userId - User ID to encode in token
 * @returns {String} JWT token
 */
export const generateToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, {
    expiresIn: JWT_EXPIRE,
  });
};

/**
 * Verify JWT token
 * @param {String} token - Token to verify
 * @returns {Object} Decoded token payload
 */
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

/**
 * Decode token without verification
 * @param {String} token - Token to decode
 * @returns {Object} Decoded token payload
 */
export const decodeToken = (token) => {
  return jwt.decode(token);
};

export default {
  generateToken,
  verifyToken,
  decodeToken,
};
