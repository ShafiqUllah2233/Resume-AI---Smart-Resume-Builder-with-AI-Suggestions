import React, { useState } from 'react';
import useResumeStore from '../../store/resumeStore';
import useAI from '../../hooks/useAI';
import AISuggestionButton from '../AISuggestionButton';
import AISuggestionsList from '../AISuggestionsList';

const PersonalInfoForm = () => {
  const { resume, updatePersonalInfo } = useResumeStore();
  const { personalInfo } = resume;
  const { isLoading, suggestions, getSummarySuggestions, clearSuggestions } = useAI();
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleChange = (field, value) => {
    updatePersonalInfo({ [field]: value });
  };

  const handleGetSummary = async () => {
    setShowSuggestions(true);
    const jobTitle = resume.experience?.[0]?.jobTitle || '';
    await getSummarySuggestions(jobTitle);
  };

  const handleSelectSuggestion = (suggestion) => {
    handleChange('summary', suggestion);
    setShowSuggestions(false);
    clearSuggestions();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-1">Personal Information</h2>
        <p className="text-gray-600">Enter your basic contact details</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* First Name */}
        <div>
          <label className="label">First Name *</label>
          <input
            type="text"
            value={personalInfo.firstName || ''}
            onChange={(e) => handleChange('firstName', e.target.value)}
            className="input"
            placeholder="John"
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="label">Last Name *</label>
          <input
            type="text"
            value={personalInfo.lastName || ''}
            onChange={(e) => handleChange('lastName', e.target.value)}
            className="input"
            placeholder="Doe"
          />
        </div>

        {/* Email */}
        <div>
          <label className="label">Email *</label>
          <input
            type="email"
            value={personalInfo.email || ''}
            onChange={(e) => handleChange('email', e.target.value)}
            className="input"
            placeholder="john.doe@example.com"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="label">Phone</label>
          <input
            type="tel"
            value={personalInfo.phone || ''}
            onChange={(e) => handleChange('phone', e.target.value)}
            className="input"
            placeholder="+1 (555) 123-4567"
          />
        </div>

        {/* City */}
        <div>
          <label className="label">City</label>
          <input
            type="text"
            value={personalInfo.city || ''}
            onChange={(e) => handleChange('city', e.target.value)}
            className="input"
            placeholder="New York"
          />
        </div>

        {/* State */}
        <div>
          <label className="label">State/Province</label>
          <input
            type="text"
            value={personalInfo.state || ''}
            onChange={(e) => handleChange('state', e.target.value)}
            className="input"
            placeholder="NY"
          />
        </div>

        {/* LinkedIn */}
        <div>
          <label className="label">LinkedIn URL</label>
          <input
            type="url"
            value={personalInfo.linkedin || ''}
            onChange={(e) => handleChange('linkedin', e.target.value)}
            className="input"
            placeholder="https://linkedin.com/in/johndoe"
          />
        </div>

        {/* GitHub */}
        <div>
          <label className="label">GitHub URL</label>
          <input
            type="url"
            value={personalInfo.github || ''}
            onChange={(e) => handleChange('github', e.target.value)}
            className="input"
            placeholder="https://github.com/johndoe"
          />
        </div>

        {/* Portfolio */}
        <div className="md:col-span-2">
          <label className="label">Portfolio/Website URL</label>
          <input
            type="url"
            value={personalInfo.portfolio || ''}
            onChange={(e) => handleChange('portfolio', e.target.value)}
            className="input"
            placeholder="https://johndoe.com"
          />
        </div>
      </div>

      {/* Professional Summary */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="label mb-0">Professional Summary</label>
          <AISuggestionButton
            onClick={handleGetSummary}
            isLoading={isLoading}
            label="Generate Summary"
          />
        </div>
        <textarea
          value={personalInfo.summary || ''}
          onChange={(e) => handleChange('summary', e.target.value)}
          className="input min-h-[120px]"
          placeholder="Write a brief professional summary highlighting your experience and skills..."
          rows={4}
        />
        <p className="text-sm text-gray-500 mt-1">
          A compelling summary helps recruiters quickly understand your value
        </p>
      </div>

      {/* AI Suggestions */}
      {showSuggestions && (
        <AISuggestionsList
          suggestions={suggestions}
          onSelect={handleSelectSuggestion}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default PersonalInfoForm;
