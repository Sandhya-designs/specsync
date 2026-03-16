import mongoose from 'mongoose';

const testCaseSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    testCaseId: {
      // Unique identifier like TC-001, TC-002
      type: String,
      required: [true, 'Test case ID is required'],
      unique: true,
    },
    title: {
      type: String,
      required: [true, 'Test case title is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    // Link to feature
    featureId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Feature',
      required: true,
    },
    // Link to requirement (for traceability)
    requirementId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Requirement',
      required: true,
    },
    steps: [
      {
        step: Number,
        description: String,
        expectedResult: String,
      },
    ],
    status: {
      type: String,
      enum: ['Ready', 'In Progress', 'Passed', 'Failed', 'Blocked'],
      default: 'Ready',
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Critical'],
      default: 'Medium',
    },
    lastExecuted: Date,
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
testCaseSchema.index({ projectId: 1 });
testCaseSchema.index({ featureId: 1 });
testCaseSchema.index({ requirementId: 1 });

export default mongoose.model('TestCase', testCaseSchema);
