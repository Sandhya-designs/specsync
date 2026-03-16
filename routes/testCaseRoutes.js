/**
 * Test Case Routes
 */

import express from 'express';
import {
  createTestCase,
  getTestCase,
  listTestCases,
  updateTestCase,
  deleteTestCase,
} from '../controllers/testCaseController.js';
import authenticate from '../middleware/authenticate.js';
import { authorize } from '../middleware/authorize.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

/**
 * Test Case routes
 */
// Create test case - All authenticated users
router.post('/', createTestCase);

// List test cases
router.get('/', listTestCases);

// Get test case details
router.get('/:testCaseId', getTestCase);

// Update test case - All authenticated users
router.put('/:testCaseId', updateTestCase);

// Delete test case - All authenticated users
router.delete('/:testCaseId', deleteTestCase);

export default router;
