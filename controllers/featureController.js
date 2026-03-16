/**
 * Feature Controller
 * Handles feature creation and management
 */

import Feature from '../models/Feature.js';
import Requirement from '../models/Requirement.js';
import Project from '../models/Project.js';
import { sendResponse, sendErrorResponse } from '../utils/responseHandler.js';
import {
  ValidationError,
  NotFoundError,
  AuthorizationError,
} from '../utils/errorHandler.js';

/**
 * Create Feature
 * POST /api/features
 */
export const createFeature = async (req, res, next) => {
  try {
    const { projectId, featureName, description, requirementId, implementedVersion, status } =
      req.body;
    const userId = req.user._id;

    // Validate required fields
    if (!projectId || !featureName) {
      throw new ValidationError('projectId and featureName are required');
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

    // If requirementId provided, verify it exists
    let requirement = null;
    if (requirementId) {
      requirement = await Requirement.findById(requirementId);
      if (!requirement) {
        throw new NotFoundError('Requirement');
      }
      if (!requirement.projectId.equals(projectId)) {
        throw new ValidationError(
          'Requirement does not belong to this project'
        );
      }
    }

    // Create feature
    const feature = new Feature({
      projectId,
      featureName,
      description: description || '',
      requirementId: requirementId || null,
      implementedVersion: implementedVersion || null,
      status: status || 'Planning',
      createdBy: userId,
    });

    await feature.save();
    await feature.populate('requirementId createdBy');

    return sendResponse(res, 201, feature, 'Feature created successfully');
  } catch (error) {
    console.error('Create feature error:', error);
    next(error);
  }
};

/**
 * Get Feature Details
 * GET /api/features/:featureId
 */
export const getFeature = async (req, res, next) => {
  try {
    const { featureId } = req.params;

    const feature = await Feature.findById(featureId).populate(
      'projectId requirementId createdBy'
    );

    if (!feature) {
      throw new NotFoundError('Feature');
    }

    // Check project access
    const project = await Project.findById(feature.projectId);
    const hasAccess =
      project.owner.equals(req.user._id) ||
      project.team.some((member) => member.userId.equals(req.user._id));
    if (!hasAccess) {
      throw new AuthorizationError('You do not have access to this feature');
    }

    return sendResponse(res, 200, feature, 'Feature retrieved successfully');
  } catch (error) {
    console.error('Get feature error:', error);
    next(error);
  }
};

/**
 * List Features
 * GET /api/features?projectId=xxx
 */
export const listFeatures = async (req, res, next) => {
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

    const features = await Feature.find({ projectId })
      .populate('requirementId createdBy')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Feature.countDocuments({ projectId });

    return sendResponse(
      res,
      200,
      {
        features,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalItems: total,
        },
      },
      'Features retrieved successfully'
    );
  } catch (error) {
    console.error('List features error:', error);
    next(error);
  }
};

/**
 * Update Feature
 * PUT /api/features/:featureId
 */
export const updateFeature = async (req, res, next) => {
  try {
    const { featureId } = req.params;
    const { featureName, description, requirementId, implementedVersion, status } = req.body;
    const userId = req.user._id;

    // Find feature
    const feature = await Feature.findById(featureId);
    if (!feature) {
      throw new NotFoundError('Feature');
    }

    // Check project access
    const project = await Project.findById(feature.projectId);
    const hasAccess =
      project.owner.equals(userId) ||
      project.team.some((member) => member.userId.equals(userId));
    if (!hasAccess) {
      throw new AuthorizationError('You do not have access to this feature');
    }

    // If requirementId provided, verify it exists
    if (requirementId) {
      const requirement = await Requirement.findById(requirementId);
      if (!requirement) {
        throw new NotFoundError('Requirement');
      }
      if (!requirement.projectId.equals(feature.projectId)) {
        throw new ValidationError(
          'Requirement does not belong to this project'
        );
      }
    }

    // Update fields
    if (featureName) feature.featureName = featureName;
    if (description !== undefined) feature.description = description;
    if (requirementId !== undefined) feature.requirementId = requirementId || null;
    if (implementedVersion !== undefined) feature.implementedVersion = implementedVersion;
    if (status) feature.status = status;

    await feature.save();
    await feature.populate('requirementId createdBy');

    return sendResponse(res, 200, feature, 'Feature updated successfully');
  } catch (error) {
    console.error('Update feature error:', error);
    next(error);
  }
};

/**
 * Delete Feature
 * DELETE /api/features/:featureId
 */
export const deleteFeature = async (req, res, next) => {
  try {
    const { featureId } = req.params;
    const userId = req.user._id;

    // Find feature
    const feature = await Feature.findById(featureId);
    if (!feature) {
      throw new NotFoundError('Feature');
    }

    // Check project access
    const project = await Project.findById(feature.projectId);
    const hasAccess =
      project.owner.equals(userId) ||
      project.team.some((member) => member.userId.equals(userId));
    if (!hasAccess) {
      throw new AuthorizationError('You do not have access to this feature');
    }

    await Feature.findByIdAndDelete(featureId);

    return sendResponse(res, 200, null, 'Feature deleted successfully');
  } catch (error) {
    console.error('Delete feature error:', error);
    next(error);
  }
};

export default {
  createFeature,
  getFeature,
  listFeatures,
  updateFeature,
  deleteFeature,
};
