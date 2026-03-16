import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    projectName: {
      type: String,
      required: [true, 'Project name is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['Active', 'Archived', 'On Hold'],
      default: 'Active',
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    team: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        role: String,
      },
    ],
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
projectSchema.index({ owner: 1 });
projectSchema.index({ status: 1 });

export default mongoose.model('Project', projectSchema);
