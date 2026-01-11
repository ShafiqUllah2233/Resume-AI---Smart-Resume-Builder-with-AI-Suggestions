import api from './api';

const resumeService = {
  // Get all resumes
  getResumes: async () => {
    const response = await api.get('/resumes');
    return response.data;
  },

  // Get single resume by ID
  getResumeById: async (id) => {
    const response = await api.get(`/resumes/${id}`);
    return response.data;
  },

  // Create new resume
  createResume: async (resumeData) => {
    const response = await api.post('/resumes', resumeData);
    return response.data;
  },

  // Update resume
  updateResume: async (id, resumeData) => {
    const response = await api.put(`/resumes/${id}`, resumeData);
    return response.data;
  },

  // Update specific section
  updateSection: async (id, section, data) => {
    const response = await api.patch(`/resumes/${id}/section/${section}`, { data });
    return response.data;
  },

  // Delete resume
  deleteResume: async (id) => {
    const response = await api.delete(`/resumes/${id}`);
    return response.data;
  },

  // Duplicate resume
  duplicateResume: async (id) => {
    const response = await api.post(`/resumes/${id}/duplicate`);
    return response.data;
  },
};

export default resumeService;
