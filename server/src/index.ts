import express, { Express } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import contentRoutes from './routes/contentRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import { errorHandler, authMiddleware } from './middleware/auth.js';
import { sendSuccess } from './utils/responseHandler.js';

const app: Express = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ai-media-hub';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('✓ Connected to MongoDB');
  })
  .catch((error) => {
    console.error('✗ MongoDB connection error:', error);
    process.exit(1);
  });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/analytics', analyticsRoutes);

// Health check
app.get('/api/health', (req, res) => {
  sendSuccess(res, {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Stats endpoint
app.get('/api/status', (req, res) => {
  sendSuccess(res, {
    message: 'API is running',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Error handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 Server running at http://localhost:${PORT}`);
  console.log(`\n📚 API Documentation:`);
  console.log(`\n   Authentication:`);
  console.log(`   - POST /api/auth/signup - Sign up`);
  console.log(`   - POST /api/auth/signin - Sign in`);
  console.log(`   - GET  /api/auth/profile - Get profile\n`);
  console.log(`   Content:`);
  console.log(`   - GET  /api/content/trending - Get trending content`);
  console.log(`   - GET  /api/content/search - Search content`);
  console.log(`   - GET  /api/content/:id - Get content details`);
  console.log(`   - POST /api/content - Create content`);
  console.log(`   - PUT  /api/content/:id - Update content\n`);
  console.log(`   Analytics:`);
  console.log(`   - GET  /api/analytics/stats - Platform statistics`);
  console.log(`   - GET  /api/analytics/content-stats - Content statistics\n`);
  console.log(`   System:`);
  console.log(`   - GET  /api/health - Health check`);
  console.log(`   - GET  /api/status - API status\n`);
});

export default app;
