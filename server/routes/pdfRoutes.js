const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  generatePDF,
  getPreview,
  generatePreviewPDF,
} = require('../controllers/pdfController');

// PDF routes
router.post('/generate/:id', protect, generatePDF);
router.get('/preview/:id', protect, getPreview);
router.post('/generate-preview', protect, generatePreviewPDF);

module.exports = router;
