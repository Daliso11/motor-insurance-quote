import React from 'react';

export const Logo: React.FC = () => {
  return (
    <div className="flex items-center justify-center mb-8">
      <div className="relative">
        {/* Main logo container with solid background */}
        <div className="relative w-20 h-20 rounded-2xl bg-primary-500 p-4 shadow-lg animate-float">
          {/* Car icon SVG */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            <path
              d="M5 11L7 5H17L19 11M5 11L4 13M5 11H19M19 11L20 13M4 13H3V16H5M4 13H20M20 13H21V16H19M5 16V18H8M5 16H19M19 16V18H16M8 18H16"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="7.5" cy="15.5" r="1.5" fill="white" />
            <circle cx="16.5" cy="15.5" r="1.5" fill="white" />
          </svg>
        </div>
        {/* Decorative elements */}
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent-400 rounded-full opacity-60 animate-pulse-soft"></div>
        <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-secondary-400 rounded-full opacity-60 animate-pulse-soft" style={{ animationDelay: '1s' }}></div>
      </div>
      <div className="ml-4">
        <h1 className="text-3xl font-display font-bold text-gradient">InsureQuick</h1>
        <p className="text-sm text-neutral-600">Your trusted insurance partner</p>
      </div>
    </div>
  );
};
