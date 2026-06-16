import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import EncryptionHistory from '../models/EncryptionHistory.js';

// Helper to generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide name, email, and password' });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // Generate a simple default avatar if none provided (using initials or dicebear)
    const initials = encodeURIComponent(name.charAt(0).toUpperCase());
    const avatar = `https://ui-avatars.com/api/?name=${initials}&background=6366F1&color=fff&size=128`;

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      avatar
    });

    if (user) {
      res.status(201).json({
        success: true,
        token: generateToken(user._id),
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          createdAt: user.createdAt
        }
      });
    } else {
      res.status(400).json({ success: false, message: 'Invalid user data' });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    // Check for user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Check password match
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    res.json({
      success: true,
      token: generateToken(user._id),
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user profile and statistics
// @route   GET /api/auth/profile
// @access  Private
export const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Calculate usage statistics
    const totalEncryptions = await EncryptionHistory.countDocuments({
      userId: user._id,
      actionType: 'encrypt'
    });

    const totalDecryptions = await EncryptionHistory.countDocuments({
      userId: user._id,
      actionType: 'decrypt'
    });

    res.json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        createdAt: user.createdAt,
        totalEncryptions,
        totalDecryptions
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user profile & password
// @route   PUT /api/auth/profile
// @access  Private
export const updateUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Update basic fields
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.avatar = req.body.avatar || user.avatar;

    // Check if password change is requested
    if (req.body.password) {
      if (req.body.password.length < 6) {
        return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
      }
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    // Recalculate stats
    const totalEncryptions = await EncryptionHistory.countDocuments({
      userId: updatedUser._id,
      actionType: 'encrypt'
    });

    const totalDecryptions = await EncryptionHistory.countDocuments({
      userId: updatedUser._id,
      actionType: 'decrypt'
    });

    res.json({
      success: true,
      token: generateToken(updatedUser._id),
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        avatar: updatedUser.avatar,
        createdAt: updatedUser.createdAt,
        totalEncryptions,
        totalDecryptions
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete user account and all encryption history
// @route   DELETE /api/auth/profile
// @access  Private
export const deleteUser = async (req, res, next) => {
  try {
    const userId = req.user._id;

    // Delete all encryption history associated with this user
    await EncryptionHistory.deleteMany({ userId });

    // Delete user
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({
      success: true,
      message: 'Account deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

