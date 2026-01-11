import React from 'react';

const LoadingSpinner = ({ size = 'md', color = 'primary' }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const colors = {
    primary: 'border-primary-600',
    white: 'border-white',
    gray: 'border-gray-600',
  };

  return (
    <div
      className={`${sizes[size]} border-2 ${colors[color]} border-t-transparent rounded-full animate-spin`}
    />
  );
};

export const FullPageLoader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    </div>
  );
};

export const ButtonLoader = () => {
  return <LoadingSpinner size="sm" color="white" />;
};

export default LoadingSpinner;
