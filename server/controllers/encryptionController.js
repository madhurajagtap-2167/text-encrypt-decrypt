import {
  encryptCaesar,
  decryptCaesar,
  encryptROT13,
  decryptROT13,
  encryptReverse,
  decryptReverse
} from '../utils/ciphers.js';
import EncryptionHistory from '../models/EncryptionHistory.js';

// Helper to save history
const saveHistory = async (userId, originalText, cipherType, key, actionType, resultText) => {
  try {
    await EncryptionHistory.create({
      userId,
      originalText,
      cipherType,
      key: key !== undefined && key !== null ? String(key) : '',
      actionType,
      resultText
    });
  } catch (error) {
    console.error('Error saving encryption history:', error.message);
  }
};

// @desc    Encrypt Caesar Cipher
// @route   POST /api/encrypt/caesar
// @access  Private
export const handleEncryptCaesar = async (req, res, next) => {
  try {
    const { text, shift } = req.body;

    if (text === undefined || shift === undefined) {
      return res.status(400).json({ success: false, message: 'Please provide text and shift key' });
    }

    const result = encryptCaesar(text, shift);

    // Save to history
    await saveHistory(req.user._id, text, 'Caesar Cipher', shift, 'encrypt', result);

    res.json({ success: true, result });
  } catch (error) {
    next(error);
  }
};

// @desc    Decrypt Caesar Cipher
// @route   POST /api/decrypt/caesar
// @access  Private
export const handleDecryptCaesar = async (req, res, next) => {
  try {
    const { text, shift } = req.body;

    if (text === undefined || shift === undefined) {
      return res.status(400).json({ success: false, message: 'Please provide text and shift key' });
    }

    const result = decryptCaesar(text, shift);

    // Save to history
    await saveHistory(req.user._id, text, 'Caesar Cipher', shift, 'decrypt', result);

    res.json({ success: true, result });
  } catch (error) {
    next(error);
  }
};

// @desc    Encrypt ROT13 Cipher
// @route   POST /api/encrypt/rot13
// @access  Private
export const handleEncryptROT13 = async (req, res, next) => {
  try {
    const { text } = req.body;

    if (text === undefined) {
      return res.status(400).json({ success: false, message: 'Please provide text' });
    }

    const result = encryptROT13(text);

    // Save to history
    await saveHistory(req.user._id, text, 'ROT13', '', 'encrypt', result);

    res.json({ success: true, result });
  } catch (error) {
    next(error);
  }
};

// @desc    Decrypt ROT13 Cipher
// @route   POST /api/decrypt/rot13
// @access  Private
export const handleDecryptROT13 = async (req, res, next) => {
  try {
    const { text } = req.body;

    if (text === undefined) {
      return res.status(400).json({ success: false, message: 'Please provide text' });
    }

    const result = decryptROT13(text);

    // Save to history
    await saveHistory(req.user._id, text, 'ROT13', '', 'decrypt', result);

    res.json({ success: true, result });
  } catch (error) {
    next(error);
  }
};

// @desc    Encrypt Reverse Cipher
// @route   POST /api/encrypt/reverse
// @access  Private
export const handleEncryptReverse = async (req, res, next) => {
  try {
    const { text } = req.body;

    if (text === undefined) {
      return res.status(400).json({ success: false, message: 'Please provide text' });
    }

    const result = encryptReverse(text);

    // Save to history
    await saveHistory(req.user._id, text, 'Reverse Cipher', '', 'encrypt', result);

    res.json({ success: true, result });
  } catch (error) {
    next(error);
  }
};

// @desc    Decrypt Reverse Cipher
// @route   POST /api/decrypt/reverse
// @access  Private
export const handleDecryptReverse = async (req, res, next) => {
  try {
    const { text } = req.body;

    if (text === undefined) {
      return res.status(400).json({ success: false, message: 'Please provide text' });
    }

    const result = decryptReverse(text);

    // Save to history
    await saveHistory(req.user._id, text, 'Reverse Cipher', '', 'decrypt', result);

    res.json({ success: true, result });
  } catch (error) {
    next(error);
  }
};
