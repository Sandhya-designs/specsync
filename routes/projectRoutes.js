/**
 * Project Routes
 */

import express from 'express';
import {
  createProject,
  listProjects,
  getProjectDetails,
  updateProject,
  deleteProject,
} from '../controllers/projectController.js';
import authenticate from '../middleware/authenticate.js';
import { authorize } from '../middleware/authorize.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

/**
 * Project routes
 */
// Create project - Admin, BusinessAnalyst only
router.post('/', authorize(['Admin', 'BusinessAnalyst']), createProject);

// List projects - All authenticated users
router.get('/', listProjects);

// Get project details - All authenticated users
router.get('/:projectId', getProjectDetails);

// Update project - Admin, BusinessAnalyst only
router.put('/:projectId', authorize(['Admin', 'BusinessAnalyst']), updateProject);

// Delete project - Admin only
router.delete('/:projectId', authorize('Admin'), deleteProject);

export default router;
