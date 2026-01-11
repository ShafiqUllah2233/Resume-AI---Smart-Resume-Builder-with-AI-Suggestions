const Resume = require('../models/Resume');
const { v4: uuidv4 } = require('uuid');

// Helper to generate unique IDs
const generateId = () => Math.random().toString(36).substring(2, 15);

// @desc    Get all resumes for current user
// @route   GET /api/resumes
// @access  Private
const getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user._id })
      .sort({ updatedAt: -1 })
      .select('title template createdAt updatedAt isDefault');

    res.json({
      success: true,
      count: resumes.length,
      data: resumes,
    });
  } catch (error) {
    console.error('Get resumes error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Get single resume by ID
// @route   GET /api/resumes/:id
// @access  Private
const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found',
      });
    }

    res.json({
      success: true,
      data: resume,
    });
  } catch (error) {
    console.error('Get resume by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Create new resume
// @route   POST /api/resumes
// @access  Private
const createResume = async (req, res) => {
  try {
    console.log('CREATE RESUME - User:', req.user?._id, 'Body:', req.body);
    const { title, template } = req.body;

    // Check resume count limit (optional)
    const resumeCount = await Resume.countDocuments({ userId: req.user._id });
    console.log('Current resume count:', resumeCount);
    
    if (resumeCount >= 100) {
      console.log('Resume limit reached');
      return res.status(400).json({
        success: false,
        message: 'Maximum resume limit (100) reached. Please delete some resumes.',
      });
    }

    const resume = await Resume.create({
      userId: req.user._id,
      title: title || 'Untitled Resume',
      template: template || 'modern',
      personalInfo: {
        firstName: '',
        lastName: '',
        email: req.user.email,
        phone: '',
        linkedin: '',
        github: '',
      },
      education: [],
      experience: [],
      skills: [],
      projects: [],
      certifications: [],
    });

    console.log('Resume created successfully:', resume._id);
    res.status(201).json({
      success: true,
      data: resume,
    });
  } catch (error) {
    console.error('Create resume error:', error.message, error.stack);
    res.status(500).json({
      success: false,
      message: 'Server error: ' + error.message,
    });
  }
};

// @desc    Update resume
// @route   PUT /api/resumes/:id
// @access  Private
const updateResume = async (req, res) => {
  try {
    let resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found',
      });
    }

    // Update fields
    const updateFields = [
      'title',
      'template',
      'personalInfo',
      'education',
      'experience',
      'skills',
      'projects',
      'certifications',
      'customSections',
    ];

    updateFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        resume[field] = req.body[field];
      }
    });

    // Increment version
    resume.version = (resume.version || 1) + 1;

    await resume.save();

    res.json({
      success: true,
      data: resume,
    });
  } catch (error) {
    console.error('Update resume error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Update specific section of resume
// @route   PATCH /api/resumes/:id/section/:section
// @access  Private
const updateResumeSection = async (req, res) => {
  try {
    const { id, section } = req.params;
    const validSections = [
      'personalInfo',
      'education',
      'experience',
      'skills',
      'projects',
      'certifications',
    ];

    if (!validSections.includes(section)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid section name',
      });
    }

    const resume = await Resume.findOne({
      _id: id,
      userId: req.user._id,
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found',
      });
    }

    resume[section] = req.body.data;
    await resume.save();

    res.json({
      success: true,
      data: resume,
    });
  } catch (error) {
    console.error('Update section error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Delete resume
// @route   DELETE /api/resumes/:id
// @access  Private
const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found',
      });
    }

    res.json({
      success: true,
      message: 'Resume deleted successfully',
    });
  } catch (error) {
    console.error('Delete resume error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Duplicate resume
// @route   POST /api/resumes/:id/duplicate
// @access  Private
const duplicateResume = async (req, res) => {
  try {
    const originalResume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!originalResume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found',
      });
    }

    // Check resume count limit
    const resumeCount = await Resume.countDocuments({ userId: req.user._id });
    if (resumeCount >= 100) {
      return res.status(400).json({
        success: false,
        message: 'Maximum resume limit (100) reached',
      });
    }

    // Create duplicate
    const duplicateData = originalResume.toObject();
    delete duplicateData._id;
    delete duplicateData.createdAt;
    delete duplicateData.updatedAt;
    duplicateData.title = `${originalResume.title} (Copy)`;
    duplicateData.isDefault = false;
    duplicateData.version = 1;

    // Generate new IDs for array items
    if (duplicateData.education) {
      duplicateData.education = duplicateData.education.map((item) => ({
        ...item,
        id: generateId(),
      }));
    }
    if (duplicateData.experience) {
      duplicateData.experience = duplicateData.experience.map((item) => ({
        ...item,
        id: generateId(),
      }));
    }
    if (duplicateData.skills) {
      duplicateData.skills = duplicateData.skills.map((item) => ({
        ...item,
        id: generateId(),
      }));
    }
    if (duplicateData.projects) {
      duplicateData.projects = duplicateData.projects.map((item) => ({
        ...item,
        id: generateId(),
      }));
    }
    if (duplicateData.certifications) {
      duplicateData.certifications = duplicateData.certifications.map((item) => ({
        ...item,
        id: generateId(),
      }));
    }

    const newResume = await Resume.create(duplicateData);

    res.status(201).json({
      success: true,
      data: newResume,
    });
  } catch (error) {
    console.error('Duplicate resume error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

module.exports = {
  getResumes,
  getResumeById,
  createResume,
  updateResume,
  updateResumeSection,
  deleteResume,
  duplicateResume,
};
