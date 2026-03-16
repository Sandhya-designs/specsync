import mongoose from 'mongoose';

const featureSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    featureName: {
      type: String,
      required: [true, 'Feature name is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    // Link to requirement - can be null (orphan feature)
    requirementId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Requirement',
      default: null,
    },
    // The version of requirement this feature implements
    // If null or less than current version, it's a drift
    implementedVersion: {
      type: Number,
      default: null,
    },
    status: {
      type: String,
      enum: ['Planning', 'In Development', 'Complete', 'Testing', 'Released'],
      default: 'Planning',
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

// Index for efficient queries
featureSchema.index({ projectId: 1 });
featureSchema.index({ requirementId: 1 });

export default mongoose.model('Feature', featureSchema);
