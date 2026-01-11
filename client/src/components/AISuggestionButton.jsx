import React from 'react';
import { SparklesIcon } from '@heroicons/react/24/outline';

const AISuggestionButton = ({ onClick, isLoading, disabled, label = 'Get AI Suggestions' }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`inline-flex items-center space-x-2 px-3 py-1.5 text-sm font-medium rounded-lg transition-all ${
        disabled || isLoading
          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
          : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 shadow-sm hover:shadow-md'
      }`}
    >
      {isLoading ? (
        <>
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          <span>Generating...</span>
        </>
      ) : (
        <>
          <SparklesIcon className="w-4 h-4" />
          <span>{label}</span>
        </>
      )}
    </button>
  );
};

export default AISuggestionButton;
