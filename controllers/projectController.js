/**
 * Project Controller
 * Handles project creation, listing, and management
 */

import Project from '../models/Project.js';
import { sendResponse, sendErrorResponse } from '../utils/responseHandler.js';
import {
  ValidationError,
  NotFoundError,
  AuthorizationError,
} from '../utils/errorHandler.js';

/**
 * Create Project
 * POST /api/projects
 */
export const createProject = async (req, res, next) => {
  try {
    const { projectName, description, status } = req.body;
    const userId = req.user._id;

    // Validate required fields
    if (!projectName) {
      throw new ValidationError('Project name is required');
    }

    // Create new project
    const project = new Project({
      projectName,
      description: description || '',
      status: status || 'Active',
      owner: userId,
      team: [{ userId, role: 'Project Manager' }],
      createdBy: userId,
    });

    await project.save();

    // Populate references
    await project.populate('owner createdBy team.userId');

    return sendResponse(res, 201, project, 'Project created successfully');
  } catch (error) {
    console.error('Create project error:', error);
    next(error);
  }
};

/**
 * List Projects (for current user)
 * GET /api/projects
 */
export const listProjects = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // Find projects where user is owner or team member
    const projects = await Project.find({
      $or: [{ owner: userId }, { 'team.userId': userId }],
    })
      .populate('owner createdBy team.userId')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    // Get total count for pagination
    const total = await Project.countDocuments({
      $or: [{ owner: userId }, { 'team.userId': userId }],
    });

    return sendResponse(
      res,
      200,
      {
        projects,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalItems: total,
          itemsPerPage: limit,
        },
      },
      'Projects retrieved successfully'
    );
  } catch (error) {
    console.error('List projects error:', error);
    next(error);
  }
};

/**
 * Get Project Details
 * GET /api/projects/:projectId
 */
export const getProjectDetails = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const userId = req.user._id;

    // Find project
    const project = await Project.findById(projectId).populate(
      'owner createdBy team.userId'
    );

    if (!project) {
      throw new NotFoundError('Project');
    }

    // Check if user has access to project
    const isAccessible =
      project.owner._id.equals(userId) ||
      project.team.some((member) => member.userId._id.equals(userId));

    if (!isAccessible) {
      throw new AuthorizationError('You do not have access to this project');
    }

    return sendResponse(
      res,
      200,
      project,
      'Project details retrieved successfully'
    );
  } catch (error) {
    console.error('Get project error:', error);
    next(error);
  }
};

/**
 * Update Project
 * PUT /api/projects/:projectId
 */
export const updateProject = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const { projectName, description, status } = req.body;
    const userId = req.user._id;

    // Find project
    const project = await Project.findById(projectId);

    if (!project) {
      throw new NotFoundError('Project');
    }

    // Check if user is owner
    if (!project.owner.equals(userId)) {
      throw new AuthorizationError('Only project owner can update project');
    }

    // Update fields
    if (projectName) project.projectName = projectName;
    if (description) project.description = description;
    if (status) project.status = status;

    await project.save();
    await project.populate('owner createdBy team.userId');

    return sendResponse(res, 200, project, 'Project updated successfully');
  } catch (error) {
    console.error('Update project error:', error);
    next(error);
  }
};

/**
 * Delete Project
 * DELETE /api/projects/:projectId
 */
export const deleteProject = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const userId = req.user._id;

    // Find project
    const project = await Project.findById(projectId);

    if (!project) {
      throw new NotFoundError('Project');
    }

    // Check if user is owner
    if (!project.owner.equals(userId)) {
      throw new AuthorizationError('Only project owner can delete project');
    }

    await Project.findByIdAndDelete(projectId);

    return sendResponse(res, 200, null, 'Project deleted successfully');
  } catch (error) {
    console.error('Delete project error:', error);
    next(error);
  }
};

export default {
  createProject,
  listProjects,
  getProjectDetails,
  updateProject,
  deleteProject,
};
