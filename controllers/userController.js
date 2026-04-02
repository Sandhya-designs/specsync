/**
 * User Controller
 * Manages user CRUD operations
 */

import User from '../models/User.js';
import { sendResponse, sendErrorResponse } from '../utils/responseHandler.js';

/**
 * List all users
 * @route GET /api/users
 * @access Private - Admin only
 */
export const listUsers = async (req, res) => {
  try {
    const { role, isActive, search } = req.query;
    let filter = {};

    // Filter by role
    if (role) {
      filter.role = role;
    }

    // Filter by status
    if (isActive !== undefined) {
      filter.isActive = isActive === 'true';
    }

    // Search by name or email
    if (search) {
      filter.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    const users = await User.find(filter).select('-password').sort({ createdAt: -1 });

    return sendResponse(res, 200, { users }, 'Users retrieved successfully');
  } catch (error) {
    console.error('List users error:', error);
    return sendErrorResponse(res, 500, 'Failed to retrieve users');
  }
};

/**
 * Get user by ID
 * @route GET /api/users/:userId
 * @access Private - Admin only
 */
export const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).select('-password');

    if (!user) {
      return sendErrorResponse(res, 404, 'User not found');
    }

    return sendResponse(res, 200, { user }, 'User retrieved successfully');
  } catch (error) {
    console.error('Get user error:', error);
    return sendErrorResponse(res, 500, 'Failed to retrieve user');
  }
};

/**
 * Create new user
 * @route POST /api/users
 * @access Private - Admin only
 */
export const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role, isActive } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !password || !role) {
      return sendErrorResponse(res, 400, 'Missing required fields');
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return sendErrorResponse(res, 400, 'User with this email already exists');
    }

    // Create new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      role,
      isActive: isActive !== undefined ? isActive : true,
    });

    await newUser.save();

    const userResponse = {
      _id: newUser._id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      role: newUser.role,
      isActive: newUser.isActive,
      createdAt: newUser.createdAt,
    };

    return sendResponse(res, 201, { user: userResponse }, 'User created successfully');
  } catch (error) {
    console.error('Create user error:', error);
    return sendErrorResponse(res, 500, 'Failed to create user');
  }
};

/**
 * Update user
 * @route PUT /api/users/:userId
 * @access Private - Admin only
 */
export const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { firstName, lastName, role, isActive } = req.body;

    // Find user
    const user = await User.findById(userId);
    if (!user) {
      return sendErrorResponse(res, 404, 'User not found');
    }

    // Update fields
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (role) user.role = role;
    if (isActive !== undefined) user.isActive = isActive;

    await user.save();

    const userResponse = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      updatedAt: user.updatedAt,
    };

    return sendResponse(res, 200, { user: userResponse }, 'User updated successfully');
  } catch (error) {
    console.error('Update user error:', error);
    return sendErrorResponse(res, 500, 'Failed to update user');
  }
};

/**
 * Delete user
 * @route DELETE /api/users/:userId
 * @access Private - Admin only
 */
export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return sendErrorResponse(res, 404, 'User not found');
    }

    // Don't allow deleting the last admin
    if (user.role === 'Admin') {
      const adminCount = await User.countDocuments({ role: 'Admin' });
      if (adminCount === 1) {
        return sendErrorResponse(res, 400, 'Cannot delete the last admin user');
      }
    }

    await User.findByIdAndDelete(userId);

    return sendResponse(res, 200, {}, 'User deleted successfully');
  } catch (error) {
    console.error('Delete user error:', error);
    return sendErrorResponse(res, 500, 'Failed to delete user');
  }
};

/**
 * Get user statistics
 * @route GET /api/users/stats/overview
 * @access Private - Admin only
 */
export const getUserStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ isActive: true });
    const usersByRole = await User.aggregate([
      { $group: { _id: '$role', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    const stats = {
      totalUsers,
      activeUsers,
      inactiveUsers: totalUsers - activeUsers,
      usersByRole,
    };

    return sendResponse(res, 200, stats, 'User statistics retrieved successfully');
  } catch (error) {
    console.error('Get stats error:', error);
    return sendErrorResponse(res, 500, 'Failed to retrieve statistics');
  }
};
