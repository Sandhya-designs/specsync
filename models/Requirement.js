import mongoose from 'mongoose';
import { REQUIREMENT_PRIORITY } from '../config/constants.js';

const requirementSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    reqId: {
      // Unique identifier like REQ-001, REQ-002
      type: String,
      required: [true, 'Requirement ID is required'],
      unique: true,
    },
    title: {
      type: String,
      required: [true, 'Requirement title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Requirement description is required'],
      trim: true,
    },
    priority: {
      type: String,
      enum: Object.values(REQUIREMENT_PRIORITY),
      default: REQUIREMENT_PRIORITY.MEDIUM,
    },
    status: {
      type: String,
      enum: ['Draft', 'In Review', 'Approved', 'Deprecated'],
      default: 'Draft',
    },
    // This points to current version
    currentVersion: {
      type: Number,
      default: 1,
    },
    // Array of all version IDs for audit trail
    versions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RequirementVersion',
      },
    ],
    acceptanceCriteria: [String],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient queries
requirementSchema.index({ projectId: 1 });
requirementSchema.index({ reqId: 1 });
requirementSchema.index({ status: 1 });

export default mongoose.model('Requirement', requirementSchema);
