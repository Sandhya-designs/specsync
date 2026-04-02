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
// Create requirement - Admin, BusinessAnalyst only
router.post('/', authorize(['Admin', 'BusinessAnalyst']), createRequirement);

// List requirements - All authenticated users
router.get('/', listRequirements);

// Get requirement details - All authenticated users
router.get('/:requirementId', getRequirement);

// Get requirement version history - All authenticated users
router.get('/:requirementId/versions', getRequirementVersionHistory);

// Update requirement (creates new version) - Admin, BusinessAnalyst only
router.put('/:requirementId', authorize(['Admin', 'BusinessAnalyst']), updateRequirement);

export default router;
