import express from 'express';
import {
  getHistory,
  addHistoryRecord,
  deleteHistoryRecord
} from '../controllers/historyController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/history')
  .get(protect, getHistory)
  .post(protect, addHistoryRecord);

router.route('/history/:id')
  .delete(protect, deleteHistoryRecord);

export default router;
