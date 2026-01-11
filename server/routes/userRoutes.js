const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const validate = require('../middleware/validateMiddleware');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const {
  getUserProfile,
  updateUserProfile,
  updatePassword,
  setDefaultResume,
  deleteAccount,
  getAllUsers,
} = require('../controllers/userController');

// Validation rules
const updateProfileValidation = [
  body('name')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Name cannot exceed 50 characters'),
  body('email')
    .optional()
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email'),
];

const updatePasswordValidation = [
  body('currentPassword')
    .notEmpty()
    .withMessage('Current password is required'),
  body('newPassword')
    .notEmpty()
    .withMessage('New password is required')
    .isLength({ min: 6 })
    .withMessage('New password must be at least 6 characters'),
];

// Routes
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateProfileValidation, validate, updateUserProfile);
router.put('/password', protect, updatePasswordValidation, validate, updatePassword);
router.put('/default-resume/:resumeId', protect, setDefaultResume);
router.delete('/account', protect, deleteAccount);

// Admin routes
router.get('/', protect, adminOnly, getAllUsers);

module.exports = router;
