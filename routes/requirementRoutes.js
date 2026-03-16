/**
 * Requirement Routes
 */

import express from 'express';
import {
  createRequirement,
  getRequirement,
  listRequirements,
  updateRequirement,
  getRequirementVersionHistory,
} from '../controllers/requirementController.js';
import authenticate from '../middleware/authenticate.js';
import { authorize } from '../middleware/authorize.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

/**
 * Requirement routes
 */
// Create requirement - All authenticated users
router.post('/', createRequirement);

// List requirements
router.get('/', listRequirements);

// Get requirement details
router.get('/:requirementId', getRequirement);

// Get requirement version history
router.get('/:requirementId/versions', getRequirementVersionHistory);

// Update requirement (creates new version) - All authenticated users
router.put('/:requirementId', updateRequirement);

export default router;
