import React, { useState } from 'react';
import useResumeStore from '../../store/resumeStore';
import useAI from '../../hooks/useAI';
import AISuggestionButton from '../AISuggestionButton';
import AISuggestionsList from '../AISuggestionsList';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

const ExperienceForm = () => {
  const { resume, addExperience, updateExperience, removeExperience } = useResumeStore();
  const { experience } = resume;
  const { isLoading, suggestions, getExperienceSuggestions, clearSuggestions } = useAI();
  const [activeExperienceId, setActiveExperienceId] = useState(null);

  const handleChange = (id, field, value) => {
    updateExperience(id, { [field]: value });
  };

  const handleGetSuggestions = async (exp) => {
    setActiveExperienceId(exp.id);
    await getExperienceSuggestions(exp.jobTitle, exp.company, exp.responsibilities);
  };

  const handleSelectSuggestion = (suggestion) => {
    if (activeExperienceId) {
      const currentExp = experience.find(e => e.id === activeExperienceId);
      const currentResp = currentExp?.responsibilities || '';
      const newResp = currentResp ? `${currentResp}\n• ${suggestion}` : `• ${suggestion}`;
      handleChange(activeExperienceId, 'responsibilities', newResp);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-1">Work Experience</h2>
          <p className="text-gray-600">Add your relevant work experience</p>
        </div>
        <button
          onClick={addExperience}
          className="btn btn-outline inline-flex items-center space-x-2"
        >
          <PlusIcon className="w-5 h-5" />
          <span>Add Experience</span>
        </button>
      </div>

      {experience.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
          <p className="text-gray-500 mb-4">No work experience entries yet</p>
          <button
            onClick={addExperience}
            className="btn btn-primary inline-flex items-center space-x-2"
          >
            <PlusIcon className="w-5 h-5" />
            <span>Add Your First Experience</span>
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {experience.map((exp, index) => (
            <div
              key={exp.id}
              className="p-6 bg-gray-50 rounded-lg border border-gray-200"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-gray-900">Experience #{index + 1}</h3>
                <button
                  onClick={() => removeExperience(exp.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {/* Job Title */}
                <div>
                  <label className="label">Job Title *</label>
                  <input
                    type="text"
                    value={exp.jobTitle || ''}
                    onChange={(e) => handleChange(exp.id, 'jobTitle', e.target.value)}
                    className="input"
                    placeholder="Software Engineer"
                  />
                </div>

                {/* Company */}
                <div>
                  <label className="label">Company *</label>
                  <input
                    type="text"
                    value={exp.company || ''}
                    onChange={(e) => handleChange(exp.id, 'company', e.target.value)}
                    className="input"
                    placeholder="Google"
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="label">Location</label>
                  <input
                    type="text"
                    value={exp.location || ''}
                    onChange={(e) => handleChange(exp.id, 'location', e.target.value)}
                    className="input"
                    placeholder="San Francisco, CA"
                  />
                </div>

                {/* Employment Type */}
                <div className="flex items-center space-x-2 self-end pb-2">
                  <input
                    type="checkbox"
                    id={`current-exp-${exp.id}`}
                    checked={exp.current || false}
                    onChange={(e) => handleChange(exp.id, 'current', e.target.checked)}
                    className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <label htmlFor={`current-exp-${exp.id}`} className="text-sm text-gray-700">
                    I currently work here
                  </label>
                </div>

                {/* Start Date */}
                <div>
                  <label className="label">Start Date</label>
                  <input
                    type="month"
                    value={exp.startDate || ''}
                    onChange={(e) => handleChange(exp.id, 'startDate', e.target.value)}
                    className="input"
                  />
                </div>

                {/* End Date */}
                <div>
                  <label className="label">End Date</label>
                  <input
                    type="month"
                    value={exp.endDate || ''}
                    onChange={(e) => handleChange(exp.id, 'endDate', e.target.value)}
                    className="input"
                    disabled={exp.current}
                  />
                </div>

                {/* Responsibilities */}
                <div className="md:col-span-2">
                  <div className="flex items-center justify-between mb-1">
                    <label className="label mb-0">Responsibilities & Achievements</label>
                    <AISuggestionButton
                      onClick={() => handleGetSuggestions(exp)}
                      isLoading={isLoading && activeExperienceId === exp.id}
                      disabled={!exp.jobTitle}
                      label="AI Suggestions"
                    />
                  </div>
                  <textarea
                    value={exp.responsibilities || ''}
                    onChange={(e) => handleChange(exp.id, 'responsibilities', e.target.value)}
                    className="input min-h-[150px]"
                    placeholder="• Developed and maintained scalable REST APIs&#10;• Improved application performance by 30%&#10;• Collaborated with cross-functional teams"
                    rows={6}
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Use bullet points (•) to list your key responsibilities and achievements
                  </p>
                </div>

                {/* AI Suggestions for this experience */}
                {activeExperienceId === exp.id && (
                  <div className="md:col-span-2">
                    <AISuggestionsList
                      suggestions={suggestions}
                      onSelect={handleSelectSuggestion}
                      isLoading={isLoading}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExperienceForm;
