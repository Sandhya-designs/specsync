/**
 * Express Application Setup
 * Configures middleware, routes, and error handlers
 */

import express from 'express';
import cors from 'cors';

// Import routes
import authRoutes from './routes/authRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import requirementRoutes from './routes/requirementRoutes.js';
import featureRoutes from './routes/featureRoutes.js';
import testCaseRoutes from './routes/testCaseRoutes.js';
import driftRoutes from './routes/driftRoutes.js';
import userRoutes from './routes/userRoutes.js';

// Import middleware
import { errorHandler, notFoundHandler } from './middleware/errorMiddleware.js';

const app = express();

/**
 * CORS Configuration
 * Allow requests from specified origins
 */
const corsOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',')
  : ['http://localhost:3000', 'http://localhost:3001'];

app.use(
  cors({
    origin: corsOrigins,
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

/**
 * Body Parser Middleware
 */
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

/**
 * Request Logging Middleware (simple)
 */
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
  next();
});

/**
 * Health Check Endpoint
 */
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'SpecSync API is running',
    timestamp: new Date().toISOString(),
  });
});

/**
 * API Routes
 * Prefixed with /api
 */
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/requirements', requirementRoutes);
app.use('/api/features', featureRoutes);
app.use('/api/testcases', testCaseRoutes);
app.use('/api/drift', driftRoutes);
app.use('/api/analytics', driftRoutes); // Analytics uses same routes
app.use('/api/users', userRoutes);

/**
 * 404 Handler
 */
app.use(notFoundHandler);

/**
 * Global Error Handler
 * Must be last middleware
 */
app.use(errorHandler);

export default app;
