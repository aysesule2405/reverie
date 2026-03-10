import React from 'react';

interface SunlightGlowProps {
  position?: 'top-left' | 'top-right' | 'center' | 'bottom-left' | 'bottom-right';
  intensity?: 'soft' | 'medium' | 'bright';
  color?: 'warm' | 'cool' | 'golden';
  size?: 'sm' | 'md' | 'lg';
}

export function SunlightGlow({ 
  position = 'top-right',
  intensity = 'soft',
  color = 'warm',
  size = 'lg'
}: SunlightGlowProps) {
  
  const getPositionStyles = () => {
    const positions = {
      'top-left': 'top-0 left-0 -translate-x-1/3 -translate-y-1/3',
      'top-right': 'top-0 right-0 translate-x-1/3 -translate-y-1/3',
      'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
      'bottom-left': 'bottom-0 left-0 -translate-x-1/3 translate-y-1/3',
      'bottom-right': 'bottom-0 right-0 translate-x-1/3 translate-y-1/3',
    };
    return positions[position];
  };

  const getSizeStyles = () => {
    const sizes = {
      'sm': 'w-48 h-48',
      'md': 'w-96 h-96',
      'lg': 'w-[600px] h-[600px]',
    };
    return sizes[size];
  };

  const getColorGradient = () => {
    const colors = {
      'warm': 'radial-gradient(circle, rgba(255, 232, 154, 0.4) 0%, rgba(255, 243, 200, 0.25) 30%, rgba(255, 249, 229, 0.1) 50%, transparent 70%)',
      'cool': 'radial-gradient(circle, rgba(196, 227, 245, 0.35) 0%, rgba(168, 216, 255, 0.2) 30%, rgba(200, 230, 201, 0.1) 50%, transparent 70%)',
      'golden': 'radial-gradient(circle, rgba(255, 214, 112, 0.45) 0%, rgba(255, 232, 154, 0.3) 30%, rgba(255, 243, 200, 0.15) 50%, transparent 70%)',
    };
    return colors[color];
  };

  const getIntensityOpacity = () => {
    const intensities = {
      'soft': 0.6,
      'medium': 0.8,
      'bright': 1.0,
    };
    return intensities[intensity];
  };

  return (
    <div 
      className={`absolute ${getPositionStyles()} ${getSizeStyles()} pointer-events-none`}
      style={{
        background: getColorGradient(),
        opacity: getIntensityOpacity(),
        filter: 'blur(60px)',
        animation: 'gentlePulse 8s ease-in-out infinite',
        zIndex: 0,
      }}
    >
      <style>{`
        @keyframes gentlePulse {
          0%, 100% {
            opacity: ${getIntensityOpacity() * 0.8};
            transform: scale(1);
          }
          50% {
            opacity: ${getIntensityOpacity()};
            transform: scale(1.05);
          }
        }
      `}</style>
    </div>
  );
}
