/**
 * Authentication Controller
 * Handles user signup, login, and authentication
 */

import User from '../models/User.js';
import { generateToken } from '../utils/jwtUtils.js';
import { sendResponse, sendErrorResponse } from '../utils/responseHandler.js';
import { ValidationError, AuthenticationError } from '../utils/errorHandler.js';

/**
 * User Signup
 * POST /api/auth/signup
 */
export const signup = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !password) {
      throw new ValidationError('All fields are required');
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      throw new ValidationError('Email already registered');
    }

    // Create new user
    const user = new User({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password,
      role: role || 'Viewer',
    });

    // Save user (password will be hashed in pre-save hook)
    await user.save();

    // Generate JWT token
    const token = generateToken(user._id);

    // Return response
    return sendResponse(
      res,
      201,
      {
        user: user.toJSON(),
        token,
      },
      'User registered successfully'
    );
  } catch (error) {
    console.error('Signup error:', error);
    next(error);
  }
};

/**
 * User Login
 * POST /api/auth/login
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      throw new ValidationError('Email and password are required');
    }

    // Find user by email and explicitly select password field
    const user = await User.findOne({ email: email.toLowerCase() }).select(
      '+password'
    );

    if (!user) {
      throw new AuthenticationError('Invalid email or password');
    }

    // Verify password
    const passwordMatch = await user.matchPassword(password);
    if (!passwordMatch) {
      throw new AuthenticationError('Invalid email or password');
    }

    // Check if user is active
    if (!user.isActive) {
      throw new AuthenticationError('User account is inactive');
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate JWT token
    const token = generateToken(user._id);

    // Return response
    return sendResponse(
      res,
      200,
      {
        user: user.toJSON(),
        token,
      },
      'Login successful'
    );
  } catch (error) {
    console.error('Login error:', error);
    next(error);
  }
};

/**
 * Get Current User
 * GET /api/auth/me
 */
export const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      throw new AuthenticationError('User not found');
    }

    return sendResponse(res, 200, user.toJSON(), 'User retrieved successfully');
  } catch (error) {
    console.error('Get user error:', error);
    next(error);
  }
};

export default {
  signup,
  login,
  getCurrentUser,
};
