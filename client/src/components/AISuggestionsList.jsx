import React from 'react';
import { CheckIcon, SparklesIcon } from '@heroicons/react/24/outline';

const AISuggestionsList = ({ suggestions, onSelect, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-4 border border-purple-200">
        <div className="flex items-center space-x-2 text-purple-700">
          <div className="w-5 h-5 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
          <span className="font-medium">Generating AI suggestions...</span>
        </div>
      </div>
    );
  }

  if (!suggestions || suggestions.length === 0) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-4 border border-purple-200">
      <div className="flex items-center space-x-2 text-purple-700 mb-3">
        <SparklesIcon className="w-5 h-5" />
        <span className="font-medium">AI Suggestions</span>
      </div>
      <ul className="space-y-2">
        {suggestions.map((suggestion, index) => (
          <li key={index}>
            <button
              type="button"
              onClick={() => onSelect(suggestion)}
              className="w-full text-left p-3 bg-white rounded-lg border border-purple-200 hover:border-purple-400 hover:bg-purple-50 transition-colors group"
            >
              <div className="flex items-start justify-between">
                <p className="text-sm text-gray-700 flex-1">{suggestion}</p>
                <CheckIcon className="w-5 h-5 text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity ml-2 flex-shrink-0" />
              </div>
            </button>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-purple-600">
        Click on a suggestion to add it to your resume
      </p>
    </div>
  );
};

export default AISuggestionsList;
