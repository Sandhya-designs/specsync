/**
 * Requirement Controller
 * Handles requirement creation, versioning, and management
 */

import Requirement from '../models/Requirement.js';
import RequirementVersion from '../models/RequirementVersion.js';
import Project from '../models/Project.js';
import { sendResponse, sendErrorResponse } from '../utils/responseHandler.js';
import {
  ValidationError,
  NotFoundError,
  AuthorizationError,
  ConflictError,
} from '../utils/errorHandler.js';

/**
 * Create Requirement
 * POST /api/requirements
 * Creates initial requirement and version 1
 */
export const createRequirement = async (req, res, next) => {
  try {
    const { projectId, reqId, title, description, priority, acceptanceCriteria } =
      req.body;
    const userId = req.user._id;

    // Validate required fields
    if (!projectId || !reqId || !title || !description) {
      throw new ValidationError(
        'projectId, reqId, title, and description are required'
      );
    }

    // Check if project exists and user has access
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

    // Check if reqId already exists
    const existingReq = await Requirement.findOne({ reqId });
    if (existingReq) {
      throw new ConflictError(`Requirement ID "${reqId}" already exists`);
    }

    // Create version 1 first
    const version = new RequirementVersion({
      requirementId: null, // Will be updated after requirement creation
      projectId,
      versionNumber: 1,
      title,
      description,
      priority: priority || 'Medium',
      status: 'Draft',
      acceptanceCriteria: acceptanceCriteria || [],
      createdBy: userId,
    });

    // Create requirement
    const requirement = new Requirement({
      projectId,
      reqId,
      title,
      description,
      priority: priority || 'Medium',
      status: 'Draft',
      currentVersion: 1,
      acceptanceCriteria: acceptanceCriteria || [],
      createdBy: userId,
    });

    await requirement.save();

    // Update version with requirement ID
    version.requirementId = requirement._id;
    await version.save();

    // Link version to requirement
    requirement.versions = [version._id];
    await requirement.save();

    // Populate references
    await requirement.populate('createdBy');

    return sendResponse(res, 201, requirement, 'Requirement created successfully');
  } catch (error) {
    console.error('Create requirement error:', error);
    next(error);
  }
};

/**
 * Get Requirement Details
 * GET /api/requirements/:requirementId
 */
export const getRequirement = async (req, res, next) => {
  try {
    const { requirementId } = req.params;

    const requirement = await Requirement.findById(requirementId)
      .populate('createdBy')
      .populate({
        path: 'versions',
        options: { sort: { versionNumber: -1 } },
      });

    if (!requirement) {
      throw new NotFoundError('Requirement');
    }

    // Check project access
    const project = await Project.findById(requirement.projectId);
    if (!project) {
      throw new NotFoundError('Project');
    }

    const hasAccess =
      project.owner.equals(req.user._id) ||
      project.team.some((member) => member.userId.equals(req.user._id));
    if (!hasAccess) {
      throw new AuthorizationError('You do not have access to this requirement');
    }

    return sendResponse(res, 200, requirement, 'Requirement retrieved successfully');
  } catch (error) {
    console.error('Get requirement error:', error);
    next(error);
  }
};

/**
 * List Requirements
 * GET /api/requirements?projectId=xxx
 */
export const listRequirements = async (req, res, next) => {
  try {
    const { projectId } = req.query;
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

    const requirements = await Requirement.find({ projectId })
      .populate('createdBy')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Requirement.countDocuments({ projectId });

    return sendResponse(
      res,
      200,
      {
        requirements,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalItems: total,
        },
      },
      'Requirements retrieved successfully'
    );
  } catch (error) {
    console.error('List requirements error:', error);
    next(error);
  }
};

/**
 * Update Requirement (Creates New Version)
 * PUT /api/requirements/:requirementId
 */
export const updateRequirement = async (req, res, next) => {
  try {
    const { requirementId } = req.params;
    const { title, description, priority, acceptanceCriteria, changeLog } = req.body;
    const userId = req.user._id;

    // Find requirement
    const requirement = await Requirement.findById(requirementId);
    if (!requirement) {
      throw new NotFoundError('Requirement');
    }

    // Check project access
    const project = await Project.findById(requirement.projectId);
    const hasAccess =
      project.owner.equals(userId) ||
      project.team.some((member) => member.userId.equals(userId));
    if (!hasAccess) {
      throw new AuthorizationError('You do not have access to this requirement');
    }

    // Create new version
    const newVersionNumber = requirement.currentVersion + 1;

    const newVersion = new RequirementVersion({
      requirementId,
      projectId: requirement.projectId,
      versionNumber: newVersionNumber,
      title: title || requirement.title,
      description: description || requirement.description,
      priority: priority || requirement.priority,
      status: requirement.status,
      acceptanceCriteria: acceptanceCriteria || requirement.acceptanceCriteria,
      changeLog: changeLog || 'Updated',
      createdBy: userId,
    });

    await newVersion.save();

    // Update requirement
    requirement.title = title || requirement.title;
    requirement.description = description || requirement.description;
    requirement.priority = priority || requirement.priority;
    requirement.acceptanceCriteria = acceptanceCriteria || requirement.acceptanceCriteria;
    requirement.currentVersion = newVersionNumber;
    requirement.versions.push(newVersion._id);

    await requirement.save();
    await requirement.populate('createdBy versions');

    return sendResponse(res, 200, requirement, 'Requirement updated successfully');
  } catch (error) {
    console.error('Update requirement error:', error);
    next(error);
  }
};

/**
 * Get Requirement Version History
 * GET /api/requirements/:requirementId/versions
 */
export const getRequirementVersionHistory = async (req, res, next) => {
  try {
    const { requirementId } = req.params;

    const versions = await RequirementVersion.find({
      requirementId,
    })
      .populate('createdBy')
      .sort({ versionNumber: -1 });

    if (versions.length === 0) {
      throw new NotFoundError('Requirement');
    }

    return sendResponse(res, 200, versions, 'Version history retrieved successfully');
  } catch (error) {
    console.error('Get version history error:', error);
    next(error);
  }
};

export default {
  createRequirement,
  getRequirement,
  listRequirements,
  updateRequirement,
  getRequirementVersionHistory,
};
