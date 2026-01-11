const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/authMiddleware');
const { aiLimiter } = require('../middleware/rateLimiter');
const {
  getExperienceSuggestions,
  getSkillsSuggestions,
  getSummarySuggestions,
  improveText,
  getATSKeywords,
  getAIStats,
} = require('../controllers/aiController');

// Apply AI rate limiter to all routes
router.use(aiLimiter);

// AI suggestion routes
router.post('/experience-suggestions', protect, getExperienceSuggestions);
router.post('/skills-suggestions', protect, getSkillsSuggestions);
router.post('/summary-suggestions', protect, getSummarySuggestions);
router.post('/improve-text', protect, improveText);
router.post('/ats-keywords', protect, getATSKeywords);

// Admin routes
router.get('/stats', protect, adminOnly, getAIStats);

module.exports = router;
