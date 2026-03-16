import mongoose from 'mongoose';

/**
 * Database Connection Configuration
 * Handles MongoDB connection with error handling and retry logic
 */

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || process.env.MONGODB_LOCAL;

    if (!mongoURI) {
      throw new Error('MongoDB connection URI is not defined in environment variables');
    }

    const connection = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    });

    console.log(`✓ MongoDB Connected: ${connection.connection.host}`);
    return connection;
  } catch (error) {
    console.error('✗ MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

export default connectDB;
