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
// Create test case - Admin, QA only
router.post('/', authorize(['Admin', 'QA']), createTestCase);

// List test cases - All authenticated users
router.get('/', listTestCases);

// Get test case details - All authenticated users
router.get('/:testCaseId', getTestCase);

// Update test case - Admin, QA only
router.put('/:testCaseId', authorize(['Admin', 'QA']), updateTestCase);

// Delete test case - Admin, QA only
router.delete('/:testCaseId', authorize(['Admin', 'QA']), deleteTestCase);

export default router;
