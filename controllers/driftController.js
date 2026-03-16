/**
 * Drift Detection Controller
 * Exposes drift detection and analytics endpoints
 */

import driftService from '../services/driftService.js';
import Requirement from '../models/Requirement.js';
import Feature from '../models/Feature.js';
import TestCase from '../models/TestCase.js';
import Project from '../models/Project.js';
import { sendResponse, sendErrorResponse } from '../utils/responseHandler.js';
import { NotFoundError, AuthorizationError, ValidationError } from '../utils/errorHandler.js';

/**
 * Detect Drift Issues
 * GET /api/drift/:projectId
 */
export const detectDrift = async (req, res, next) => {
  try {
    const { projectId } = req.params;

    // Check project exists and user has access
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

    // Run drift analysis
    const driftReport = await driftService.analyzeDrift(projectId);

    return sendResponse(
      res,
      200,
      driftReport,
      'Drift analysis completed successfully'
    );
  } catch (error) {
    console.error('Detect drift error:', error);
    next(error);
  }
};

/**
 * Get Analytics
 * GET /api/analytics/:projectId
 * Returns requirement volatility, feature completion ratio, and drift metrics
 */
export const getAnalytics = async (req, res, next) => {
  try {
    const { projectId } = req.params;

    // Check project exists and user has access
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

    // Get all project data
    const [requirements, features, testCases, driftReport] = await Promise.all([
      Requirement.find({ projectId }),
      Feature.find({ projectId }).populate('requirementId'),
      TestCase.find({ projectId }).populate('featureId requirementId'),
      driftService.analyzeDrift(projectId),
    ]);

    // Calculate metrics
    const totalRequirements = requirements.length;
    const totalVersions = requirements.reduce((sum, req) => sum + req.currentVersion, 0);

    // Requirement volatility rate (average versions per requirement)
    const volatilityRate = totalRequirements > 0 
      ? (totalVersions / totalRequirements).toFixed(2) 
      : 0;

    // Feature completion ratio
    const completedFeatures = features.filter((f) =>
      ['Complete', 'Released'].includes(f.status)
    ).length;
    const completionRatio = features.length > 0
      ? ((completedFeatures / features.length) * 100).toFixed(2)
      : 0;

    // Test coverage
    const featuresWithTests = new Set(testCases.map((tc) => tc.featureId._id));
    const testCoverage = features.length > 0
      ? ((featuresWithTests.size / features.length) * 100).toFixed(2)
      : 0;

    // Find most modified requirements (by version count)
    const mostModifiedRequirements = requirements
      .sort((a, b) => b.currentVersion - a.currentVersion)
      .slice(0, 5)
      .map((req) => ({
        id: req._id,
        reqId: req.reqId,
        title: req.title,
        currentVersion: req.currentVersion,
        priority: req.priority,
      }));

    // Requirement status distribution
    const statusDistribution = requirements.reduce((acc, req) => {
      acc[req.status] = (acc[req.status] || 0) + 1;
      return acc;
    }, {});

    // Feature status distribution
    const featureStatusDistribution = features.reduce((acc, feat) => {
      acc[feat.status] = (acc[feat.status] || 0) + 1;
      return acc;
    }, {});

    // Priority distribution
    const priorityDistribution = requirements.reduce((acc, req) => {
      acc[req.priority] = (acc[req.priority] || 0) + 1;
      return acc;
    }, {});

    // Drift breakdown by type
    const driftByType = {};
    driftReport.driftIssues.forEach((issue) => {
      driftByType[issue.type] = (driftByType[issue.type] || 0) + 1;
    });

    const analytics = {
      requirementMetrics: {
        total: totalRequirements,
        volatilityRate: parseFloat(volatilityRate),
        statusDistribution,
        priorityDistribution,
        mostModifiedRequirements,
      },
      featureMetrics: {
        total: features.length,
        completionRatio: parseFloat(completionRatio),
        completedCount: completedFeatures,
        statusDistribution: featureStatusDistribution,
      },
      testingMetrics: {
        totalTestCases: testCases.length,
        testCoverage: parseFloat(testCoverage),
        featuresWithTestCount: featuresWithTests.size,
      },
      driftMetrics: {
        totalDriftIssues: driftReport.totalIssues,
        driftScore: driftReport.driftScore,
        riskLevel: driftReport.riskLevel,
        issueCounts: driftReport.issueCounts,
        driftBreakdown: driftReport.breakdown,
        driftByType,
      },
    };

    return sendResponse(res, 200, analytics, 'Analytics retrieved successfully');
  } catch (error) {
    console.error('Get analytics error:', error);
    next(error);
  }
};

/**
 * Get Drift Details for a Specific Type
 * GET /api/drift/:projectId/:driftType
 */
export const getDriftByType = async (req, res, next) => {
  try {
    const { projectId, driftType } = req.params;

    // Check project exists and user has access
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

    // Run drift analysis
    const driftReport = await driftService.analyzeDrift(projectId);

    // Filter by drift type
    const filteredIssues = driftReport.driftIssues.filter(
      (issue) => issue.type === driftType
    );

    if (filteredIssues.length === 0) {
      return sendResponse(res, 200, [], `No ${driftType} issues found`);
    }

    return sendResponse(
      res,
      200,
      filteredIssues,
      `${driftType} issues retrieved successfully`
    );
  } catch (error) {
    console.error('Get drift by type error:', error);
    next(error);
  }
};

export default {
  detectDrift,
  getAnalytics,
  getDriftByType,
};
