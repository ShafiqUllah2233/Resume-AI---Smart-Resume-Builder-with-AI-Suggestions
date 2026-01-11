import React, { useState } from 'react';
import useResumeStore from '../../store/resumeStore';
import useAI from '../../hooks/useAI';
import AISuggestionButton from '../AISuggestionButton';
import { PlusIcon, TrashIcon, SparklesIcon } from '@heroicons/react/24/outline';

const SkillsForm = () => {
  const { resume, addSkill, updateSkill, removeSkill } = useResumeStore();
  const { skills, experience } = resume;
  const { isLoading, getSkillsSuggestions } = useAI();
  const [suggestedSkills, setSuggestedSkills] = useState([]);

  const handleChange = (id, field, value) => {
    updateSkill(id, { [field]: value });
  };

  const handleGetSuggestions = async () => {
    const jobTitle = experience?.[0]?.jobTitle || '';
    const currentSkillNames = skills.map(s => s.name);
    const suggestions = await getSkillsSuggestions(jobTitle, currentSkillNames);
    setSuggestedSkills(suggestions);
  };

  const handleAddSuggestedSkill = (skillName) => {
    addSkill();
    const newSkillId = skills[skills.length]?.id;
    // We need to get the latest skill after adding
    setTimeout(() => {
      const latestSkills = useResumeStore.getState().resume.skills;
      const lastSkill = latestSkills[latestSkills.length - 1];
      if (lastSkill) {
        updateSkill(lastSkill.id, { name: skillName });
      }
    }, 0);
    setSuggestedSkills(suggestedSkills.filter(s => s !== skillName));
  };

  const skillLevels = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
    { value: 'expert', label: 'Expert' },
  ];

  const skillCategories = [
    { value: 'technical', label: 'Technical' },
    { value: 'soft', label: 'Soft Skills' },
    { value: 'language', label: 'Languages' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-1">Skills</h2>
          <p className="text-gray-600">Add your technical and soft skills</p>
        </div>
        <div className="flex items-center space-x-2">
          <AISuggestionButton
            onClick={handleGetSuggestions}
            isLoading={isLoading}
            label="Suggest Skills"
          />
          <button
            onClick={addSkill}
            className="btn btn-outline inline-flex items-center space-x-2"
          >
            <PlusIcon className="w-5 h-5" />
            <span>Add Skill</span>
          </button>
        </div>
      </div>

      {/* AI Suggested Skills */}
      {suggestedSkills.length > 0 && (
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-4 border border-purple-200">
          <div className="flex items-center space-x-2 text-purple-700 mb-3">
            <SparklesIcon className="w-5 h-5" />
            <span className="font-medium">Suggested Skills</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {suggestedSkills.map((skill, index) => (
              <button
                key={index}
                onClick={() => handleAddSuggestedSkill(skill)}
                className="inline-flex items-center space-x-1 bg-white text-purple-700 px-3 py-1.5 rounded-full border border-purple-200 hover:bg-purple-100 transition-colors text-sm"
              >
                <PlusIcon className="w-4 h-4" />
                <span>{skill}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {skills.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
          <p className="text-gray-500 mb-4">No skills added yet</p>
          <button
            onClick={addSkill}
            className="btn btn-primary inline-flex items-center space-x-2"
          >
            <PlusIcon className="w-5 h-5" />
            <span>Add Your First Skill</span>
          </button>
        </div>
      ) : (
        <div className="grid gap-4">
          {skills.map((skill, index) => (
            <div
              key={skill.id}
              className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200"
            >
              {/* Skill Name */}
              <div className="flex-1">
                <input
                  type="text"
                  value={skill.name || ''}
                  onChange={(e) => handleChange(skill.id, 'name', e.target.value)}
                  className="input"
                  placeholder="e.g., JavaScript, Project Management"
                />
              </div>

              {/* Level */}
              <div className="w-40">
                <select
                  value={skill.level || 'intermediate'}
                  onChange={(e) => handleChange(skill.id, 'level', e.target.value)}
                  className="input"
                >
                  {skillLevels.map((level) => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Category */}
              <div className="w-36">
                <select
                  value={skill.category || 'technical'}
                  onChange={(e) => handleChange(skill.id, 'category', e.target.value)}
                  className="input"
                >
                  {skillCategories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Delete */}
              <button
                onClick={() => removeSkill(skill.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Skill Preview */}
      {skills.length > 0 && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">Preview:</p>
          <div className="flex flex-wrap gap-2">
            {skills.filter(s => s.name).map((skill) => (
              <span
                key={skill.id}
                className={`px-3 py-1 rounded-full text-sm ${
                  skill.category === 'technical'
                    ? 'bg-blue-100 text-blue-700'
                    : skill.category === 'soft'
                    ? 'bg-green-100 text-green-700'
                    : skill.category === 'language'
                    ? 'bg-purple-100 text-purple-700'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillsForm;
