import React from 'react';
import useResumeStore from '../../store/resumeStore';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

const EducationForm = () => {
  const { resume, addEducation, updateEducation, removeEducation } = useResumeStore();
  const { education } = resume;

  const handleChange = (id, field, value) => {
    updateEducation(id, { [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-1">Education</h2>
          <p className="text-gray-600">Add your educational background</p>
        </div>
        <button
          onClick={addEducation}
          className="btn btn-outline inline-flex items-center space-x-2"
        >
          <PlusIcon className="w-5 h-5" />
          <span>Add Education</span>
        </button>
      </div>

      {education.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
          <p className="text-gray-500 mb-4">No education entries yet</p>
          <button
            onClick={addEducation}
            className="btn btn-primary inline-flex items-center space-x-2"
          >
            <PlusIcon className="w-5 h-5" />
            <span>Add Your First Education</span>
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {education.map((edu, index) => (
            <div
              key={edu.id}
              className="p-6 bg-gray-50 rounded-lg border border-gray-200"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-gray-900">Education #{index + 1}</h3>
                <button
                  onClick={() => removeEducation(edu.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {/* Institution */}
                <div className="md:col-span-2">
                  <label className="label">Institution *</label>
                  <input
                    type="text"
                    value={edu.institution || ''}
                    onChange={(e) => handleChange(edu.id, 'institution', e.target.value)}
                    className="input"
                    placeholder="Harvard University"
                  />
                </div>

                {/* Degree */}
                <div>
                  <label className="label">Degree *</label>
                  <input
                    type="text"
                    value={edu.degree || ''}
                    onChange={(e) => handleChange(edu.id, 'degree', e.target.value)}
                    className="input"
                    placeholder="Bachelor of Science"
                  />
                </div>

                {/* Field of Study */}
                <div>
                  <label className="label">Field of Study</label>
                  <input
                    type="text"
                    value={edu.fieldOfStudy || ''}
                    onChange={(e) => handleChange(edu.id, 'fieldOfStudy', e.target.value)}
                    className="input"
                    placeholder="Computer Science"
                  />
                </div>

                {/* Start Date */}
                <div>
                  <label className="label">Start Date</label>
                  <input
                    type="month"
                    value={edu.startDate || ''}
                    onChange={(e) => handleChange(edu.id, 'startDate', e.target.value)}
                    className="input"
                  />
                </div>

                {/* End Date */}
                <div>
                  <label className="label">End Date</label>
                  <input
                    type="month"
                    value={edu.endDate || ''}
                    onChange={(e) => handleChange(edu.id, 'endDate', e.target.value)}
                    className="input"
                    disabled={edu.current}
                  />
                </div>

                {/* Current */}
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`current-${edu.id}`}
                    checked={edu.current || false}
                    onChange={(e) => handleChange(edu.id, 'current', e.target.checked)}
                    className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <label htmlFor={`current-${edu.id}`} className="text-sm text-gray-700">
                    Currently studying here
                  </label>
                </div>

                {/* GPA */}
                <div>
                  <label className="label">GPA (Optional)</label>
                  <input
                    type="text"
                    value={edu.gpa || ''}
                    onChange={(e) => handleChange(edu.id, 'gpa', e.target.value)}
                    className="input"
                    placeholder="3.8/4.0"
                  />
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="label">Description (Optional)</label>
                  <textarea
                    value={edu.description || ''}
                    onChange={(e) => handleChange(edu.id, 'description', e.target.value)}
                    className="input min-h-[80px]"
                    placeholder="Relevant coursework, honors, activities..."
                    rows={3}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EducationForm;
