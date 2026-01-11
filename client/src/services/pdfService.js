import api from './api';

const pdfService = {
  // Generate and download PDF
  generatePDF: async (resumeId) => {
    const response = await api.post(`/pdf/generate/${resumeId}`, {}, {
      responseType: 'blob',
    });
    return response.data;
  },

  // Get HTML preview
  getPreview: async (resumeId) => {
    const response = await api.get(`/pdf/preview/${resumeId}`);
    return response.data;
  },

  // Generate preview PDF from data
  generatePreviewPDF: async (resumeData, template) => {
    const response = await api.post('/pdf/generate-preview', {
      resumeData,
      template,
    }, {
      responseType: 'blob',
    });
    return response.data;
  },

  // Download PDF helper
  downloadPDF: (blob, filename) => {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename || 'resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  },
};

export default pdfService;
