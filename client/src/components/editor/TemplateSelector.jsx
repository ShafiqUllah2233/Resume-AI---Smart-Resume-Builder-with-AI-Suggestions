import React from 'react';
import useResumeStore from '../../store/resumeStore';
import { CheckIcon } from '@heroicons/react/24/outline';

const templates = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean and contemporary design with accent colors',
    preview: 'bg-gradient-to-br from-blue-500 to-blue-600',
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional and professional layout',
    preview: 'bg-gradient-to-br from-gray-600 to-gray-700',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Simple and elegant with focus on content',
    preview: 'bg-gradient-to-br from-gray-400 to-gray-500',
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Corporate-style design for business roles',
    preview: 'bg-gradient-to-br from-slate-600 to-slate-700',
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Stand out with a unique design',
    preview: 'bg-gradient-to-br from-purple-500 to-pink-500',
  },
];

const TemplateSelector = () => {
  const { resume, setTemplate } = useResumeStore();
  const selectedTemplate = resume.template;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-1">Choose a Template</h2>
        <p className="text-gray-600">Select a template that best suits your style</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => setTemplate(template.id)}
            className={`relative p-4 rounded-xl border-2 transition-all text-left ${
              selectedTemplate === template.id
                ? 'border-primary-500 bg-primary-50 shadow-lg'
                : 'border-gray-200 hover:border-gray-300 hover:shadow'
            }`}
          >
            {/* Selected indicator */}
            {selectedTemplate === template.id && (
              <div className="absolute top-3 right-3 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                <CheckIcon className="w-4 h-4 text-white" />
              </div>
            )}

            {/* Template Preview */}
            <div className={`aspect-[8.5/11] ${template.preview} rounded-lg mb-4 p-4 text-white`}>
              <div className="space-y-2">
                <div className="h-3 bg-white/30 rounded w-3/4" />
                <div className="h-2 bg-white/20 rounded w-1/2" />
                <div className="mt-4 space-y-1">
                  <div className="h-2 bg-white/20 rounded w-full" />
                  <div className="h-2 bg-white/20 rounded w-5/6" />
                  <div className="h-2 bg-white/20 rounded w-4/6" />
                </div>
                <div className="mt-4 space-y-1">
                  <div className="h-2 bg-white/30 rounded w-1/3" />
                  <div className="h-2 bg-white/20 rounded w-full" />
                  <div className="h-2 bg-white/20 rounded w-5/6" />
                </div>
              </div>
            </div>

            {/* Template Info */}
            <h3 className="font-semibold text-gray-900">{template.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{template.description}</p>
          </button>
        ))}
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h4 className="font-medium text-blue-900 mb-2">Template Tips</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• <strong>Modern:</strong> Great for tech and startup roles</li>
          <li>• <strong>Classic:</strong> Perfect for traditional industries</li>
          <li>• <strong>Minimal:</strong> Ideal when content should stand out</li>
          <li>• <strong>Professional:</strong> Best for corporate positions</li>
          <li>• <strong>Creative:</strong> Suitable for design and creative roles</li>
        </ul>
      </div>
    </div>
  );
};

export default TemplateSelector;
