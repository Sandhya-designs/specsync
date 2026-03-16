/**
 * Server Initialization
 * Entry point for the SpecSync Backend Application
 */

import dotenv from 'dotenv';
import app from './app.js';
import connectDB from './config/database.js';

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || 'localhost';

/**
 * Graceful Shutdown Handler
 */
const handleGracefulShutdown = (signal) => {
  console.log(`\n${signal} received. Starting graceful shutdown...`);
  server.close(() => {
    console.log('✓ HTTP server closed');
    process.exit(0);
  });

  // Force shutdown after 10 seconds
  setTimeout(() => {
    console.error('✗ Forced shutdown');
    process.exit(1);
  }, 10000);
};

/**
 * Start Server
 */
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Start Express server
    const server = app.listen(PORT, HOST, () => {
      console.log(`
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║              🎯 SpecSync Backend Server                   ║
║     Software Requirement Drift Detection System           ║
║                                                            ║
║  ✓ Server running on: http://${HOST}:${PORT}              ║
║  ✓ Environment: ${process.env.NODE_ENV}                    ║
║  ✓ Database: Connected                                    ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
      `);
    });

    // Handle graceful shutdown
    process.on('SIGTERM', () => handleGracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => handleGracefulShutdown('SIGINT'));

    // Handle unhandled errors
    process.on('uncaughtException', (error) => {
      console.error('Uncaught Exception:', error);
      process.exit(1);
    });

    process.on('unhandledRejection', (reason, promise) => {
      console.error('Unhandled Rejection at:', promise, 'reason:', reason);
      process.exit(1);
    });

    return server;
  } catch (error) {
    console.error('✗ Failed to start server:', error.message);
    process.exit(1);
  }
};

// Start the server
const server = await startServer();

export default server;
