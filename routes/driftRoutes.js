/**
 * Drift Detection Routes
 */

import express from 'express';
import {
  detectDrift,
  getAnalytics,
  getDriftByType,
} from '../controllers/driftController.js';
import authenticate from '../middleware/authenticate.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

/**
 * Drift detection routes
 */
// Get analytics for project (MUST be before generic :projectId routes)
router.get('/analytics/:projectId', getAnalytics);

// Get drift issues by type
router.get('/:projectId/:driftType', getDriftByType);

// Get drift analysis for project
router.get('/:projectId', detectDrift);

export default router;
