import EncryptionHistory from '../models/EncryptionHistory.js';

// @desc    Get all encryption history records with search and filter
// @route   GET /api/history
// @access  Private
export const getHistory = async (req, res, next) => {
  try {
    const { search, cipherType } = req.query;

    const query = { userId: req.user._id };

    // Apply Filter by Cipher Type
    if (cipherType) {
      query.cipherType = cipherType;
    }

    // Apply Search Filter (checks originalText or resultText)
    if (search) {
      query.$or = [
        { originalText: { $regex: search, $options: 'i' } },
        { resultText: { $regex: search, $options: 'i' } }
      ];
    }

    const history = await EncryptionHistory.find(query).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: history.length,
      history
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add a history record manually
// @route   POST /api/history
// @access  Private
export const addHistoryRecord = async (req, res, next) => {
  try {
    const { originalText, cipherType, key, actionType, resultText } = req.body;

    if (!originalText || !cipherType || !actionType || !resultText) {
      return res.status(400).json({
        success: false,
        message: 'Please provide originalText, cipherType, actionType, and resultText'
      });
    }

    const record = await EncryptionHistory.create({
      userId: req.user._id,
      originalText,
      cipherType,
      key: key !== undefined ? String(key) : '',
      actionType,
      resultText
    });

    res.status(201).json({
      success: true,
      record
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a history record
// @route   DELETE /api/history/:id
// @access  Private
export const deleteHistoryRecord = async (req, res, next) => {
  try {
    const record = await EncryptionHistory.findById(err => {
      // Handle ID issues inside Mongoose if needed, but Mongoose middleware handles it.
    });

    // Find and delete
    const result = await EncryptionHistory.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id // Ensure user owns this record
    });

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Record not found or user not authorized'
      });
    }

    res.json({
      success: true,
      message: 'Record deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
