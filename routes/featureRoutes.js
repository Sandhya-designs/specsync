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
// Create feature - Admin, BusinessAnalyst only
router.post('/', authorize(['Admin', 'BusinessAnalyst']), createFeature);

// List features - All authenticated users
router.get('/', listFeatures);

// Get feature details - All authenticated users
router.get('/:featureId', getFeature);

// Update feature - Admin, BusinessAnalyst, Developer
router.put('/:featureId', authorize(['Admin', 'BusinessAnalyst', 'Developer']), updateFeature);

// Delete feature - Admin, BusinessAnalyst only
router.delete('/:featureId', authorize(['Admin', 'BusinessAnalyst']), deleteFeature);

export default router;
