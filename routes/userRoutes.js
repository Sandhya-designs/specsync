/**
 * User Routes
 */

import express from 'express';
import {
  listUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserStats,
} from '../controllers/userController.js';
import authenticate from '../middleware/authenticate.js';
import { authorize } from '../middleware/authorize.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

/**
 * User routes - Admin only
 */

// List all users - Admin only
router.get('/', authorize('Admin'), listUsers);

// Get user statistics - Admin only
router.get('/stats/overview', authorize('Admin'), getUserStats);

// Get user by ID - Admin only
router.get('/:userId', authorize('Admin'), getUserById);

// Create new user - Admin only
router.post('/', authorize('Admin'), createUser);

// Update user - Admin only
router.put('/:userId', authorize('Admin'), updateUser);

// Delete user - Admin only
router.delete('/:userId', authorize('Admin'), deleteUser);

export default router;
