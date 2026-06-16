import express from 'express';
import { analyzeFrequency } from '../controllers/analysisController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/analysis/frequency', protect, analyzeFrequency);

export default router;
