const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const validate = require('../middleware/validateMiddleware');
const { protect } = require('../middleware/authMiddleware');
const {
  getResumes,
  getResumeById,
  createResume,
  updateResume,
  updateResumeSection,
  deleteResume,
  duplicateResume,
} = require('../controllers/resumeController');

// Validation rules
const createResumeValidation = [
  body('title')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Title cannot exceed 100 characters'),
  body('template')
    .optional()
    .isIn(['modern', 'classic', 'minimal', 'professional', 'creative'])
    .withMessage('Invalid template'),
];

// Routes
router.route('/')
  .get(protect, getResumes)
  .post(protect, createResumeValidation, validate, createResume);

router.route('/:id')
  .get(protect, getResumeById)
  .put(protect, updateResume)
  .delete(protect, deleteResume);

router.patch('/:id/section/:section', protect, updateResumeSection);
router.post('/:id/duplicate', protect, duplicateResume);

module.exports = router;
