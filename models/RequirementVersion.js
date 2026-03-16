import mongoose from 'mongoose';
import { REQUIREMENT_PRIORITY } from '../config/constants.js';

const requirementVersionSchema = new mongoose.Schema(
  {
    requirementId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Requirement',
      required: true,
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    versionNumber: {
      type: Number,
      required: true,
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
    acceptanceCriteria: [String],
    changeLog: {
      type: String,
      description: 'What changed in this version',
    },
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

// Index for faster queries
requirementVersionSchema.index({ requirementId: 1, versionNumber: 1 });
requirementVersionSchema.index({ projectId: 1 });

export default mongoose.model('RequirementVersion', requirementVersionSchema);
