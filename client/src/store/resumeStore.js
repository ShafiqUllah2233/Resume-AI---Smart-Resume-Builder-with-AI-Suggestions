import { create } from 'zustand';

// Generate unique ID
const generateId = () => Math.random().toString(36).substring(2, 15);

// Initial resume state
const initialResumeState = {
  title: 'Untitled Resume',
  template: 'modern',
  personalInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    linkedin: '',
    github: '',
    portfolio: '',
    summary: '',
  },
  education: [],
  experience: [],
  skills: [],
  projects: [],
  certifications: [],
};

const useResumeStore = create((set, get) => ({
  resume: { ...initialResumeState },
  currentStep: 0,
  isSaving: false,
  isDirty: false,

  // Set entire resume
  setResume: (resume) => set({ resume, isDirty: false }),

  // Reset resume
  resetResume: () => set({ resume: { ...initialResumeState }, currentStep: 0, isDirty: false }),

  // Update title
  setTitle: (title) => set((state) => ({
    resume: { ...state.resume, title },
    isDirty: true,
  })),

  // Update template
  setTemplate: (template) => set((state) => ({
    resume: { ...state.resume, template },
    isDirty: true,
  })),

  // Update personal info
  updatePersonalInfo: (data) => set((state) => ({
    resume: {
      ...state.resume,
      personalInfo: { ...state.resume.personalInfo, ...data },
    },
    isDirty: true,
  })),

  // Education CRUD
  addEducation: () => set((state) => ({
    resume: {
      ...state.resume,
      education: [
        ...state.resume.education,
        {
          id: generateId(),
          institution: '',
          degree: '',
          fieldOfStudy: '',
          startDate: '',
          endDate: '',
          current: false,
          gpa: '',
          description: '',
        },
      ],
    },
    isDirty: true,
  })),

  updateEducation: (id, data) => set((state) => ({
    resume: {
      ...state.resume,
      education: state.resume.education.map((edu) =>
        edu.id === id ? { ...edu, ...data } : edu
      ),
    },
    isDirty: true,
  })),

  removeEducation: (id) => set((state) => ({
    resume: {
      ...state.resume,
      education: state.resume.education.filter((edu) => edu.id !== id),
    },
    isDirty: true,
  })),

  // Experience CRUD
  addExperience: () => set((state) => ({
    resume: {
      ...state.resume,
      experience: [
        ...state.resume.experience,
        {
          id: generateId(),
          company: '',
          jobTitle: '',
          location: '',
          startDate: '',
          endDate: '',
          current: false,
          responsibilities: '',
          aiSuggestions: [],
        },
      ],
    },
    isDirty: true,
  })),

  updateExperience: (id, data) => set((state) => ({
    resume: {
      ...state.resume,
      experience: state.resume.experience.map((exp) =>
        exp.id === id ? { ...exp, ...data } : exp
      ),
    },
    isDirty: true,
  })),

  removeExperience: (id) => set((state) => ({
    resume: {
      ...state.resume,
      experience: state.resume.experience.filter((exp) => exp.id !== id),
    },
    isDirty: true,
  })),

  // Skills CRUD
  addSkill: () => set((state) => ({
    resume: {
      ...state.resume,
      skills: [
        ...state.resume.skills,
        {
          id: generateId(),
          name: '',
          level: 'intermediate',
          category: 'technical',
        },
      ],
    },
    isDirty: true,
  })),

  updateSkill: (id, data) => set((state) => ({
    resume: {
      ...state.resume,
      skills: state.resume.skills.map((skill) =>
        skill.id === id ? { ...skill, ...data } : skill
      ),
    },
    isDirty: true,
  })),

  removeSkill: (id) => set((state) => ({
    resume: {
      ...state.resume,
      skills: state.resume.skills.filter((skill) => skill.id !== id),
    },
    isDirty: true,
  })),

  // Projects CRUD
  addProject: () => set((state) => ({
    resume: {
      ...state.resume,
      projects: [
        ...state.resume.projects,
        {
          id: generateId(),
          name: '',
          description: '',
          technologies: '',
          link: '',
          github: '',
          startDate: '',
          endDate: '',
        },
      ],
    },
    isDirty: true,
  })),

  updateProject: (id, data) => set((state) => ({
    resume: {
      ...state.resume,
      projects: state.resume.projects.map((project) =>
        project.id === id ? { ...project, ...data } : project
      ),
    },
    isDirty: true,
  })),

  removeProject: (id) => set((state) => ({
    resume: {
      ...state.resume,
      projects: state.resume.projects.filter((project) => project.id !== id),
    },
    isDirty: true,
  })),

  // Certifications CRUD
  addCertification: () => set((state) => ({
    resume: {
      ...state.resume,
      certifications: [
        ...state.resume.certifications,
        {
          id: generateId(),
          name: '',
          issuer: '',
          issueDate: '',
          expiryDate: '',
          credentialId: '',
          credentialUrl: '',
        },
      ],
    },
    isDirty: true,
  })),

  updateCertification: (id, data) => set((state) => ({
    resume: {
      ...state.resume,
      certifications: state.resume.certifications.map((cert) =>
        cert.id === id ? { ...cert, ...data } : cert
      ),
    },
    isDirty: true,
  })),

  removeCertification: (id) => set((state) => ({
    resume: {
      ...state.resume,
      certifications: state.resume.certifications.filter((cert) => cert.id !== id),
    },
    isDirty: true,
  })),

  // Step navigation
  setCurrentStep: (step) => set({ currentStep: step }),
  nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  prevStep: () => set((state) => ({ currentStep: Math.max(0, state.currentStep - 1) })),

  // Saving state
  setSaving: (isSaving) => set({ isSaving }),
  setDirty: (isDirty) => set({ isDirty }),
}));

export default useResumeStore;
