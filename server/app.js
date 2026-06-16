import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './routes/authRoutes.js';
import encryptionRoutes from './routes/encryptionRoutes.js';
import analysisRoutes from './routes/analysisRoutes.js';
import historyRoutes from './routes/historyRoutes.js';
import errorHandler from './middleware/error.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Base route for health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'CipherVault Backend API is active' });
});

// Routes integration
app.use('/api/auth', authRoutes);
app.use('/api', encryptionRoutes);
app.use('/api', analysisRoutes);
app.use('/api', historyRoutes);

// Error Handler Middleware
app.use(errorHandler);

export default app;
