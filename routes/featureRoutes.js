/**
 * Feature Routes
 */

import express from 'express';
import {
  createFeature,
  getFeature,
  listFeatures,
  updateFeature,
  deleteFeature,
} from '../controllers/featureController.js';
import authenticate from '../middleware/authenticate.js';
import { authorize } from '../middleware/authorize.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

/**
 * Feature routes
 */
// Create feature - All authenticated users
router.post('/', createFeature);

// List features
router.get('/', listFeatures);

// Get feature details
router.get('/:featureId', getFeature);

// Update feature - All authenticated users
router.put('/:featureId', updateFeature);

// Delete feature - All authenticated users
router.delete('/:featureId', deleteFeature);

export default router;
