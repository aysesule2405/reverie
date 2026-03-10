import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'sky' | 'meadow' | 'sun';
  className?: string;
}

export function LoadingSpinner({ 
  size = 'md',
  variant = 'meadow',
  className = ''
}: LoadingSpinnerProps) {
  const sizeMap = {
    sm: 24,
    md: 40,
    lg: 64
  };

  const colorMap = {
    sky: {
      primary: '#7EC8E3',
      secondary: '#A8D8FF',
      accent: '#8FD694'
    },
    meadow: {
      primary: '#8FD694',
      secondary: '#6DB876',
      accent: '#7EC8E3'
    },
    sun: {
      primary: '#FFE870',
      secondary: '#FFF3A3',
      accent: '#F5D86D'
    }
  };

  const dimensions = sizeMap[size];
  const colors = colorMap[variant];

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {/* Spinning circles - Ghibli-inspired gentle rotation */}
      <svg 
        width={dimensions} 
        height={dimensions} 
        viewBox="0 0 100 100"
        className="rotate-slow"
      >
        {/* Outer circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke={colors.primary}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="70 200"
          opacity="0.6"
        />
        
        {/* Middle circle */}
        <circle
          cx="50"
          cy="50"
          r="35"
          fill="none"
          stroke={colors.secondary}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="50 150"
          opacity="0.5"
          style={{
            animation: 'rotate-reverse 2s linear infinite'
          }}
        />
        
        {/* Inner circle */}
        <circle
          cx="50"
          cy="50"
          r="25"
          fill="none"
          stroke={colors.accent}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="30 100"
          opacity="0.4"
        />

        {/* Center dot - pulsing */}
        <circle
          cx="50"
          cy="50"
          r="8"
          fill={colors.primary}
          opacity="0.5"
          style={{
            animation: 'pulse-gentle 2s ease-in-out infinite'
          }}
        />
      </svg>

      {/* Orbital particles */}
      <div className="absolute inset-0">
        {[0, 120, 240].map((angle, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full"
            style={{
              background: colors.accent,
              opacity: 0.6,
              top: '50%',
              left: '50%',
              transform: `rotate(${angle}deg) translateX(${dimensions / 2}px) translateY(-50%)`,
              animation: `orbit-${i} 3s ease-in-out infinite`,
              boxShadow: `0 0 8px ${colors.accent}`
            }}
          />
        ))}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes orbit-0 {
          0%, 100% {
            transform: rotate(0deg) translateX(${dimensions / 2}px) translateY(-50%) scale(1);
            opacity: 0.6;
          }
          50% {
            transform: rotate(180deg) translateX(${dimensions / 2}px) translateY(-50%) scale(1.3);
            opacity: 0.9;
          }
        }
        
        @keyframes orbit-1 {
          0%, 100% {
            transform: rotate(120deg) translateX(${dimensions / 2}px) translateY(-50%) scale(1);
            opacity: 0.6;
          }
          50% {
            transform: rotate(300deg) translateX(${dimensions / 2}px) translateY(-50%) scale(1.3);
            opacity: 0.9;
          }
        }
        
        @keyframes orbit-2 {
          0%, 100% {
            transform: rotate(240deg) translateX(${dimensions / 2}px) translateY(-50%) scale(1);
            opacity: 0.6;
          }
          50% {
            transform: rotate(420deg) translateX(${dimensions / 2}px) translateY(-50%) scale(1.3);
            opacity: 0.9;
          }
        }
      `}} />
    </div>
  );
}
