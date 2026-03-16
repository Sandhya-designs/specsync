/**
 * Test Case Controller
 * Handles test case creation and management
 */

import TestCase from '../models/TestCase.js';
import Feature from '../models/Feature.js';
import Requirement from '../models/Requirement.js';
import Project from '../models/Project.js';
import { sendResponse, sendErrorResponse } from '../utils/responseHandler.js';
import {
  ValidationError,
  NotFoundError,
  AuthorizationError,
  ConflictError,
} from '../utils/errorHandler.js';

/**
 * Create Test Case
 * POST /api/testcases
 */
export const createTestCase = async (req, res, next) => {
  try {
    const {
      projectId,
      testCaseId,
      title,
      description,
      featureId,
      requirementId,
      steps,
      priority,
      status,
    } = req.body;
    const userId = req.user._id;

    // Validate required fields
    if (!projectId || !testCaseId || !title || !featureId || !requirementId) {
      throw new ValidationError(
        'projectId, testCaseId, title, featureId, and requirementId are required'
      );
    }

    // Check project access
    const project = await Project.findById(projectId);
    if (!project) {
      throw new NotFoundError('Project');
    }

    const hasAccess =
      project.owner.equals(userId) ||
      project.team.some((member) => member.userId.equals(userId));
    if (!hasAccess) {
      throw new AuthorizationError('You do not have access to this project');
    }

    // Verify feature exists and belongs to project
    const feature = await Feature.findById(featureId);
    if (!feature || !feature.projectId.equals(projectId)) {
      throw new NotFoundError('Feature');
    }

    // Verify requirement exists and belongs to project
    const requirement = await Requirement.findById(requirementId);
    if (!requirement || !requirement.projectId.equals(projectId)) {
      throw new NotFoundError('Requirement');
    }

    // Check if testCaseId already exists
    const existingTestCase = await TestCase.findOne({ testCaseId });
    if (existingTestCase) {
      throw new ConflictError(`Test Case ID "${testCaseId}" already exists`);
    }

    // Create test case
    const testCase = new TestCase({
      projectId,
      testCaseId,
      title,
      description: description || '',
      featureId,
      requirementId,
      steps: steps || [],
      priority: priority || 'Medium',
      status: status || 'Ready',
      createdBy: userId,
    });

    await testCase.save();
    await testCase.populate('featureId requirementId createdBy');

    return sendResponse(res, 201, testCase, 'Test case created successfully');
  } catch (error) {
    console.error('Create test case error:', error);
    next(error);
  }
};

/**
 * Get Test Case Details
 * GET /api/testcases/:testCaseId
 */
export const getTestCase = async (req, res, next) => {
  try {
    const { testCaseId } = req.params;

    const testCase = await TestCase.findById(testCaseId).populate(
      'projectId featureId requirementId createdBy'
    );

    if (!testCase) {
      throw new NotFoundError('Test Case');
    }

    // Check project access
    const project = await Project.findById(testCase.projectId);
    const hasAccess =
      project.owner.equals(req.user._id) ||
      project.team.some((member) => member.userId.equals(req.user._id));
    if (!hasAccess) {
      throw new AuthorizationError('You do not have access to this test case');
    }

    return sendResponse(res, 200, testCase, 'Test case retrieved successfully');
  } catch (error) {
    console.error('Get test case error:', error);
    next(error);
  }
};

/**
 * List Test Cases
 * GET /api/testcases?projectId=xxx&featureId=xxx&requirementId=xxx
 */
export const listTestCases = async (req, res, next) => {
  try {
    const { projectId, featureId, requirementId } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    if (!projectId) {
      throw new ValidationError('projectId is required');
    }

    // Check project access
    const project = await Project.findById(projectId);
    if (!project) {
      throw new NotFoundError('Project');
    }

    const hasAccess =
      project.owner.equals(req.user._id) ||
      project.team.some((member) => member.userId.equals(req.user._id));
    if (!hasAccess) {
      throw new AuthorizationError('You do not have access to this project');
    }

    // Build query
    const query = { projectId };
    if (featureId) query.featureId = featureId;
    if (requirementId) query.requirementId = requirementId;

    const testCases = await TestCase.find(query)
      .populate('featureId requirementId createdBy')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await TestCase.countDocuments(query);

    return sendResponse(
      res,
      200,
      {
        testCases,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalItems: total,
        },
      },
      'Test cases retrieved successfully'
    );
  } catch (error) {
    console.error('List test cases error:', error);
    next(error);
  }
};

/**
 * Update Test Case
 * PUT /api/testcases/:testCaseId
 */
export const updateTestCase = async (req, res, next) => {
  try {
    const { testCaseId } = req.params;
    const { title, description, steps, status, priority, lastExecuted } = req.body;
    const userId = req.user._id;

    // Find test case
    const testCase = await TestCase.findById(testCaseId);
    if (!testCase) {
      throw new NotFoundError('Test Case');
    }

    // Check project access
    const project = await Project.findById(testCase.projectId);
    const hasAccess =
      project.owner.equals(userId) ||
      project.team.some((member) => member.userId.equals(userId));
    if (!hasAccess) {
      throw new AuthorizationError('You do not have access to this test case');
    }

    // Update fields
    if (title) testCase.title = title;
    if (description !== undefined) testCase.description = description;
    if (steps) testCase.steps = steps;
    if (status) testCase.status = status;
    if (priority) testCase.priority = priority;
    if (lastExecuted) testCase.lastExecuted = lastExecuted;

    await testCase.save();
    await testCase.populate('featureId requirementId createdBy');

    return sendResponse(res, 200, testCase, 'Test case updated successfully');
  } catch (error) {
    console.error('Update test case error:', error);
    next(error);
  }
};

/**
 * Delete Test Case
 * DELETE /api/testcases/:testCaseId
 */
export const deleteTestCase = async (req, res, next) => {
  try {
    const { testCaseId } = req.params;
    const userId = req.user._id;

    // Find test case
    const testCase = await TestCase.findById(testCaseId);
    if (!testCase) {
      throw new NotFoundError('Test Case');
    }

    // Check project access
    const project = await Project.findById(testCase.projectId);
    const hasAccess =
      project.owner.equals(userId) ||
      project.team.some((member) => member.userId.equals(userId));
    if (!hasAccess) {
      throw new AuthorizationError('You do not have access to this test case');
    }

    await TestCase.findByIdAndDelete(testCaseId);

    return sendResponse(res, 200, null, 'Test case deleted successfully');
  } catch (error) {
    console.error('Delete test case error:', error);
    next(error);
  }
};

export default {
  createTestCase,
  getTestCase,
  listTestCases,
  updateTestCase,
  deleteTestCase,
};
