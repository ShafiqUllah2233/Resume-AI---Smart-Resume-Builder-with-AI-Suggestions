const mongoose = require('mongoose');

const aiLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  resumeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resume',
  },
  promptType: {
    type: String,
    enum: ['experience', 'skills', 'summary', 'project', 'general'],
    required: true,
  },
  inputData: {
    type: String,
    required: true,
  },
  outputData: {
    type: String,
    required: true,
  },
  tokensUsed: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Index for analytics queries
aiLogSchema.index({ userId: 1, createdAt: -1 });
aiLogSchema.index({ promptType: 1 });

module.exports = mongoose.model('AILog', aiLogSchema);
