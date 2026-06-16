import express from 'express';
import {
  handleEncryptCaesar,
  handleDecryptCaesar,
  handleEncryptROT13,
  handleDecryptROT13,
  handleEncryptReverse,
  handleDecryptReverse
} from '../controllers/encryptionController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/encrypt/caesar', protect, handleEncryptCaesar);
router.post('/decrypt/caesar', protect, handleDecryptCaesar);

router.post('/encrypt/rot13', protect, handleEncryptROT13);
router.post('/decrypt/rot13', protect, handleDecryptROT13);

router.post('/encrypt/reverse', protect, handleEncryptReverse);
router.post('/decrypt/reverse', protect, handleDecryptReverse);

export default router;
