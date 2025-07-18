import React, { useState, useEffect } from 'react';

interface BackgroundPatternProps {
  opacity?: number;
  size?: number;
}

export const BackgroundPattern: React.FC<BackgroundPatternProps> = ({ opacity = 0.06, size = 120 }) => {
  const [imageUrl, setImageUrl] = useState('/lusaka-city-skyline.png');
  
  useEffect(() => {
    // Test image loading
    const img = new Image();
    img.onload = () => {
      console.log('City skyline background loaded successfully from:', imageUrl);
    };
    img.onerror = () => {
      console.log('Failed to load city skyline background from:', imageUrl);
    };
    img.src = imageUrl;
  }, [imageUrl]);
    
  return (
    <div 
      className="absolute inset-0 pointer-events-none flex items-end justify-center"
      style={{
        opacity: opacity,
        zIndex: 0,
        backgroundColor: 'transparent'
      }}
    >
      <img 
        src={imageUrl}
        alt="City Skyline Background"
        className="w-full max-w-7xl h-auto object-contain"
        style={{
          maxHeight: '40vh'
        }}
      />
    </div>
  );
};
