import mongoose from 'mongoose';

const encryptionHistorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    originalText: {
      type: String,
      required: true
    },
    cipherType: {
      type: String,
      required: true,
      enum: ['Caesar Cipher', 'ROT13', 'Reverse Cipher']
    },
    key: {
      type: String,
      default: ''
    },
    actionType: {
      type: String,
      required: true,
      enum: ['encrypt', 'decrypt']
    },
    resultText: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const EncryptionHistory = mongoose.model('EncryptionHistory', encryptionHistorySchema);

export default EncryptionHistory;
