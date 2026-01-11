const mongoose = require('mongoose');

const personalInfoSchema = new mongoose.Schema({
  firstName: { type: String, default: '' },
  lastName: { type: String, default: '' },
  email: { type: String, default: '' },
  phone: { type: String, default: '' },
  address: { type: String, default: '' },
  city: { type: String, default: '' },
  state: { type: String, default: '' },
  zipCode: { type: String, default: '' },
  country: { type: String, default: '' },
  linkedin: { type: String, default: '' },
  github: { type: String, default: '' },
  portfolio: { type: String, default: '' },
  summary: { type: String, default: '' },
});

const educationSchema = new mongoose.Schema({
  id: { type: String, required: true },
  institution: { type: String, default: '' },
  degree: { type: String, default: '' },
  fieldOfStudy: { type: String, default: '' },
  startDate: { type: String, default: '' },
  endDate: { type: String, default: '' },
  current: { type: Boolean, default: false },
  gpa: { type: String, default: '' },
  description: { type: String, default: '' },
});

const experienceSchema = new mongoose.Schema({
  id: { type: String, required: true },
  company: { type: String, default: '' },
  jobTitle: { type: String, default: '' },
  location: { type: String, default: '' },
  startDate: { type: String, default: '' },
  endDate: { type: String, default: '' },
  current: { type: Boolean, default: false },
  responsibilities: { type: String, default: '' },
  aiSuggestions: [{ type: String }],
});

const skillSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, default: '' },
  level: { 
    type: String, 
    enum: ['beginner', 'intermediate', 'advanced', 'expert'],
    default: 'intermediate'
  },
  category: {
    type: String,
    enum: ['technical', 'soft', 'language', 'other'],
    default: 'technical'
  },
});

const projectSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, default: '' },
  description: { type: String, default: '' },
  technologies: { type: String, default: '' },
  link: { type: String, default: '' },
  github: { type: String, default: '' },
  startDate: { type: String, default: '' },
  endDate: { type: String, default: '' },
});

const certificationSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, default: '' },
  issuer: { type: String, default: '' },
  issueDate: { type: String, default: '' },
  expiryDate: { type: String, default: '' },
  credentialId: { type: String, default: '' },
  credentialUrl: { type: String, default: '' },
});

const resumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: [true, 'Please provide a resume title'],
    default: 'Untitled Resume',
  },
  template: {
    type: String,
    enum: ['modern', 'classic', 'minimal', 'professional', 'creative'],
    default: 'modern',
  },
  personalInfo: {
    type: personalInfoSchema,
    default: () => ({}),
  },
  education: [educationSchema],
  experience: [experienceSchema],
  skills: [skillSchema],
  projects: [projectSchema],
  certifications: [certificationSchema],
  customSections: [{
    id: { type: String },
    title: { type: String },
    content: { type: String },
  }],
  aiGeneratedContent: {
    suggestions: [{ type: String }],
    keywords: [{ type: String }],
    lastGenerated: { type: Date },
  },
  isDefault: {
    type: Boolean,
    default: false,
  },
  isPublic: {
    type: Boolean,
    default: false,
  },
  version: {
    type: Number,
    default: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update timestamp on save
resumeSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Index for faster queries
resumeSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('Resume', resumeSchema);
