import React, { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ 
  message, 
  type = 'success', 
  duration = 10000,
  onClose 
}) => {
  const [isClosing, setIsClosing] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev - (100 / (duration / 100));
        return newProgress <= 0 ? 0 : newProgress;
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [duration]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-gradient-to-r from-[#4cdd80] to-[#3fc470] text-white';
      case 'error':
        return 'bg-gradient-to-r from-red-500 to-red-600 text-white';
      case 'info':
        return 'bg-gradient-to-r from-blue-500 to-blue-600 text-white';
      case 'warning':
        return 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white';
      default:
        return 'bg-gradient-to-r from-[#4cdd80] to-[#3fc470] text-white';
    }
  };

  const getProgressBarColor = () => {
    switch (type) {
      case 'success':
        return 'bg-white/30';
      case 'error':
        return 'bg-white/30';
      case 'info':
        return 'bg-white/30';
      case 'warning':
        return 'bg-white/30';
      default:
        return 'bg-white/30';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return (
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'error':
        return (
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'info':
        return (
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'warning':
        return (
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`fixed top-4 right-4 z-50 ${isClosing ? 'animate-slide-out-right' : 'animate-slide-in-right'}`}>
      <div className={`${getTypeStyles()} rounded-lg shadow-2xl overflow-hidden min-w-[300px] max-w-md`}>
        {/* Main content */}
        <div className="p-4 flex items-center">
          <div className="flex-shrink-0 animate-pulse">
            {getIcon()}
          </div>
          <p className="flex-1 font-medium text-sm md:text-base">{message}</p>
          <button
            onClick={handleClose}
            className="ml-4 hover:bg-white/20 rounded-full p-1 transition-all duration-200 hover:scale-110"
            aria-label="Close notification"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Progress bar */}
        <div className="h-1 bg-black/10">
          <div 
            className={`h-full ${getProgressBarColor()} transition-all duration-100 ease-linear`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
