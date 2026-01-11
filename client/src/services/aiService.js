import api from './api';

const aiService = {
  // Get experience bullet point suggestions
  getExperienceSuggestions: async (data) => {
    const response = await api.post('/ai/experience-suggestions', data);
    return response.data;
  },

  // Get skills suggestions
  getSkillsSuggestions: async (data) => {
    const response = await api.post('/ai/skills-suggestions', data);
    return response.data;
  },

  // Get professional summary suggestions
  getSummarySuggestions: async (data) => {
    const response = await api.post('/ai/summary-suggestions', data);
    return response.data;
  },

  // Improve text with AI
  improveText: async (data) => {
    const response = await api.post('/ai/improve-text', data);
    return response.data;
  },

  // Get ATS keywords
  getATSKeywords: async (data) => {
    const response = await api.post('/ai/ats-keywords', data);
    return response.data;
  },
};

export default aiService;
