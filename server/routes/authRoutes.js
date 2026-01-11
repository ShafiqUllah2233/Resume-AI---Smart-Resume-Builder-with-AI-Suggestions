const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const validate = require('../middleware/validateMiddleware');
const { authLimiter } = require('../middleware/rateLimiter');
const { protect } = require('../middleware/authMiddleware');
const {
  registerUser,
  loginUser,
  getMe,
  logoutUser,
} = require('../controllers/authController');

// Validation rules
const registerValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ max: 50 })
    .withMessage('Name cannot exceed 50 characters'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
];

const loginValidation = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
];

// Routes
router.post('/register', authLimiter, registerValidation, validate, registerUser);
router.post('/login', authLimiter, loginValidation, validate, loginUser);
router.get('/me', protect, getMe);
router.post('/logout', protect, logoutUser);

module.exports = router;
