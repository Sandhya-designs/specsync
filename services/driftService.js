/**
 * Drift Detection Service
 * Core business logic for detecting requirement drift
 * Implements 5 algorithms to detect different types of drift
 */

import Requirement from '../models/Requirement.js';
import Feature from '../models/Feature.js';
import TestCase from '../models/TestCase.js';
import {
  DRIFT_TYPES,
  DRIFT_SEVERITY,
  DRIFT_WEIGHTS,
  RISK_THRESHOLDS,
  RISK_LEVELS,
  REQUIREMENT_PRIORITY,
} from '../config/constants.js';

class DriftService {
  /**
   * Algorithm 1: Version Mismatch Drift
   * Detects when feature implementedVersion < requirement currentVersion
   */
  async detectVersionMismatchDrift(projectId) {
    const driftIssues = [];

    try {
      const features = await Feature.find({ projectId }).populate(
        'requirementId'
      );

      for (const feature of features) {
        if (!feature.requirementId) continue; // Skip orphan features (handled separately)

        const requirement = feature.requirementId;

        // Check if implemented version is less than current version
        if (
          feature.implementedVersion &&
          feature.implementedVersion < requirement.currentVersion
        ) {
          driftIssues.push({
            type: DRIFT_TYPES.VERSION_MISMATCH,
            severity: DRIFT_SEVERITY.VERSION_MISMATCH,
            featureId: feature._id,
            featureName: feature.featureName,
            requirementId: requirement._id,
            requirementTitle: requirement.title,
            currentVersion: requirement.currentVersion,
            implementedVersion: feature.implementedVersion,
            description: `Feature "${feature.featureName}" implements requirement version ${feature.implementedVersion} but requirement is at version ${requirement.currentVersion}`,
          });
        }
      }
    } catch (error) {
      console.error('Error in detectVersionMismatchDrift:', error);
    }

    return driftIssues;
  }

  /**
   * Algorithm 2: Orphan Feature Drift
   * Detects when feature has no requirementId
   */
  async detectOrphanFeatureDrift(projectId) {
    const driftIssues = [];

    try {
      const orphanFeatures = await Feature.find({
        projectId,
        requirementId: null,
      });

      for (const feature of orphanFeatures) {
        driftIssues.push({
          type: DRIFT_TYPES.ORPHAN_FEATURE,
          severity: DRIFT_SEVERITY.ORPHAN_FEATURE,
          featureId: feature._id,
          featureName: feature.featureName,
          requirementId: null,
          description: `Feature "${feature.featureName}" is not linked to any requirement (orphan feature)`,
        });
      }
    } catch (error) {
      console.error('Error in detectOrphanFeatureDrift:', error);
    }

    return driftIssues;
  }

  /**
   * Algorithm 3: Implementation Gap Drift
   * Detects when requirement exists but no feature linked to it
   */
  async detectImplementationGapDrift(projectId) {
    const driftIssues = [];

    try {
      const requirements = await Requirement.find({ projectId });

      for (const requirement of requirements) {
        // Check if any feature links to this requirement
        const linkedFeature = await Feature.findOne({
          projectId,
          requirementId: requirement._id,
        });

        // Only flag active requirements without features
        if (!linkedFeature && requirement.status !== 'Deprecated') {
          driftIssues.push({
            type: DRIFT_TYPES.IMPLEMENTATION_GAP,
            severity: DRIFT_SEVERITY.IMPLEMENTATION_GAP,
            requirementId: requirement._id,
            requirementTitle: requirement.title,
            reqId: requirement.reqId,
            featureId: null,
            description: `Requirement "${requirement.title}" (${requirement.reqId}) has no linked feature`,
          });
        }
      }
    } catch (error) {
      console.error('Error in detectImplementationGapDrift:', error);
    }

    return driftIssues;
  }

  /**
   * Algorithm 4: Testing Gap Drift
   * Detects when feature exists but no test case linked to it
   */
  async detectTestingGapDrift(projectId) {
    const driftIssues = [];

    try {
      const features = await Feature.find({
        projectId,
        status: { $in: ['In Development', 'Complete', 'Testing', 'Released'] },
      });

      for (const feature of features) {
        // Check if any test case links to this feature
        const linkedTestCase = await TestCase.findOne({
          projectId,
          featureId: feature._id,
        });

        if (!linkedTestCase) {
          driftIssues.push({
            type: DRIFT_TYPES.TESTING_GAP,
            severity: DRIFT_SEVERITY.TESTING_GAP,
            featureId: feature._id,
            featureName: feature.featureName,
            description: `Feature "${feature.featureName}" has no test cases (testing gap)`,
          });
        }
      }
    } catch (error) {
      console.error('Error in detectTestingGapDrift:', error);
    }

    return driftIssues;
  }

  /**
   * Algorithm 5: Critical Risk Drift
   * Detects when requirement priority is High/Critical and no feature linked
   */
  async detectCriticalRiskDrift(projectId) {
    const driftIssues = [];

    try {
      const criticalRequirements = await Requirement.find({
        projectId,
        priority: { $in: [REQUIREMENT_PRIORITY.HIGH, REQUIREMENT_PRIORITY.CRITICAL] },
        status: { $ne: 'Deprecated' },
      });

      for (const requirement of criticalRequirements) {
        const linkedFeature = await Feature.findOne({
          projectId,
          requirementId: requirement._id,
        });

        if (!linkedFeature) {
          driftIssues.push({
            type: DRIFT_TYPES.CRITICAL_RISK,
            severity: DRIFT_SEVERITY.CRITICAL_RISK,
            requirementId: requirement._id,
            requirementTitle: requirement.title,
            reqId: requirement.reqId,
            priority: requirement.priority,
            description: `Critical/High priority requirement "${requirement.title}" (${requirement.reqId}) has no implementation`,
          });
        }
      }
    } catch (error) {
      console.error('Error in detectCriticalRiskDrift:', error);
    }

    return driftIssues;
  }

  /**
   * Calculate Drift Score based on collected issues
   * Formula: (Critical × 5) + (High × 3) + (Medium × 2) + (Low × 1)
   */
  calculateDriftScore(driftIssues) {
    let score = 0;

    for (const issue of driftIssues) {
      // Map severity to weight
      const severityWeight = {
        'Critical': DRIFT_WEIGHTS.CRITICAL,
        'High': DRIFT_WEIGHTS.HIGH,
        'Medium': DRIFT_WEIGHTS.MEDIUM,
        'Low': DRIFT_WEIGHTS.LOW,
      };

      const weight = severityWeight[issue.severity] || 0;
      score += weight;
    }

    return score;
  }

  /**
   * Determine risk level based on drift score
   */
  calculateRiskLevel(driftScore) {
    if (driftScore < RISK_THRESHOLDS.STABLE) {
      return RISK_LEVELS.STABLE;
    } else if (driftScore < RISK_THRESHOLDS.MODERATE) {
      return RISK_LEVELS.MODERATE;
    } else {
      return RISK_LEVELS.HIGH_RISK;
    }
  }

  /**
   * Complete drift detection analysis
   * Runs all 5 algorithms and creates comprehensive drift report
   */
  async analyzeDrift(projectId) {
    try {
      // Run all 5 algorithm detections in parallel
      const [
        versionMismatch,
        orphanFeatures,
        implementationGaps,
        testingGaps,
        criticalRisks,
      ] = await Promise.all([
        this.detectVersionMismatchDrift(projectId),
        this.detectOrphanFeatureDrift(projectId),
        this.detectImplementationGapDrift(projectId),
        this.detectTestingGapDrift(projectId),
        this.detectCriticalRiskDrift(projectId),
      ]);

      // Combine all drift issues
      const allDriftIssues = [
        ...versionMismatch,
        ...orphanFeatures,
        ...implementationGaps,
        ...testingGaps,
        ...criticalRisks,
      ];

      // Calculate metrics
      const driftScore = this.calculateDriftScore(allDriftIssues);
      const riskLevel = this.calculateRiskLevel(driftScore);

      // Count issues by severity
      const issueCounts = {
        critical: allDriftIssues.filter((i) => i.severity === 'Critical').length,
        high: allDriftIssues.filter((i) => i.severity === 'High').length,
        medium: allDriftIssues.filter((i) => i.severity === 'Medium').length,
        low: allDriftIssues.filter((i) => i.severity === 'Low').length,
      };

      return {
        driftIssues: allDriftIssues,
        driftScore,
        riskLevel,
        totalIssues: allDriftIssues.length,
        issueCounts,
        breakdown: {
          versionMismatch: versionMismatch.length,
          orphanFeatures: orphanFeatures.length,
          implementationGaps: implementationGaps.length,
          testingGaps: testingGaps.length,
          criticalRisks: criticalRisks.length,
        },
      };
    } catch (error) {
      console.error('Error in analyzeDrift:', error);
      throw error;
    }
  }
}

export default new DriftService();
