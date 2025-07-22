import React from 'react';

export const Logo: React.FC = () => {
  return (
    <div className="flex items-center justify-center mb-8">
      <div className="relative">
        {/* Main logo container with solid background */}
        <div className="relative w-20 h-20 rounded-2xl bg-white p-3" style={{ boxShadow: '0 0 20px 8px rgba(59, 130, 246, 0.5)' }}>
          {/* Chitetezo shield logo */}
          <img
            src="/chitetezo.svg"
            alt="Chitetezo Insurance Shield"
            className="w-full h-full object-contain"
          />
        </div>
        {/* Decorative elements */}
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent-400 rounded-full"></div>
        <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-secondary-400 rounded-full"></div>
      </div>
      <div className="ml-4">
        <h1 className="text-3xl font-display font-bold text-gradient">Chitetezo</h1>
        <p className="text-sm text-neutral-600">Insurance. Trusted.</p>
      </div>
    </div>
  );
};
