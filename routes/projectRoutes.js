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
// Create project - All authenticated users
router.post('/', createProject);

// List projects
router.get('/', listProjects);

// Get project details
router.get('/:projectId', getProjectDetails);

// Update project - All authenticated users
router.put('/:projectId', updateProject);

// Delete project - All authenticated users
router.delete('/:projectId', deleteProject);

export default router;
