import React from 'react';

interface PixelIconProps {
  type: 'heart' | 'star' | 'cloud' | 'moon' | 'sun' | 'sparkle' | 'music' | 'book';
  size?: number;
  color?: string;
  className?: string;
}

export function PixelIcon({ 
  type, 
  size = 24, 
  color = '#A9B8FF',
  className = '' 
}: PixelIconProps) {
  // Pixel art patterns (simplified for demonstration)
  const patterns = {
    heart: (
      <svg viewBox="0 0 16 16" width={size} height={size} className={className}>
        <path
          d="M8 14L2 8C0 6 0 3 2 2C3 1 5 1 6 2L8 4L10 2C11 1 13 1 14 2C16 3 16 6 14 8L8 14Z"
          fill={color}
          style={{ imageRendering: 'pixelated' }}
        />
      </svg>
    ),
    star: (
      <svg viewBox="0 0 16 16" width={size} height={size} className={className}>
        <path
          d="M8 2L10 6L14 7L11 10L12 14L8 12L4 14L5 10L2 7L6 6L8 2Z"
          fill={color}
          style={{ imageRendering: 'pixelated' }}
        />
      </svg>
    ),
    cloud: (
      <svg viewBox="0 0 16 16" width={size} height={size} className={className}>
        <path
          d="M4 8C2 8 1 9 1 10C1 11 2 12 4 12H12C13.5 12 15 10.5 15 9C15 7.5 13.5 6 12 6C12 4 10 2 8 2C6 2 4 4 4 6V8Z"
          fill={color}
          style={{ imageRendering: 'pixelated' }}
        />
      </svg>
    ),
    moon: (
      <svg viewBox="0 0 16 16" width={size} height={size} className={className}>
        <path
          d="M10 2C6 2 3 5 3 9C3 13 6 16 10 16C11 16 12 15.5 13 15C9 14 7 11 7 8C7 5 9 2 13 1C12 1.5 11 2 10 2Z"
          fill={color}
          style={{ imageRendering: 'pixelated' }}
        />
      </svg>
    ),
    sun: (
      <svg viewBox="0 0 16 16" width={size} height={size} className={className}>
        <circle cx="8" cy="8" r="3" fill={color} style={{ imageRendering: 'pixelated' }} />
        <rect x="7.5" y="1" width="1" height="2" fill={color} />
        <rect x="7.5" y="13" width="1" height="2" fill={color} />
        <rect x="1" y="7.5" width="2" height="1" fill={color} />
        <rect x="13" y="7.5" width="2" height="1" fill={color} />
        <rect x="3" y="3" width="1" height="1" fill={color} />
        <rect x="12" y="3" width="1" height="1" fill={color} />
        <rect x="3" y="12" width="1" height="1" fill={color} />
        <rect x="12" y="12" width="1" height="1" fill={color} />
      </svg>
    ),
    sparkle: (
      <svg viewBox="0 0 16 16" width={size} height={size} className={className}>
        <path
          d="M8 1L9 5L8 9L7 5L8 1Z M1 8L5 9L9 8L5 7L1 8Z M11 5L13 7L11 9L9 7L11 5Z"
          fill={color}
          style={{ imageRendering: 'pixelated' }}
        />
      </svg>
    ),
    music: (
      <svg viewBox="0 0 16 16" width={size} height={size} className={className}>
        <path
          d="M5 12C5 13 4 14 3 14C2 14 1 13 1 12C1 11 2 10 3 10C4 10 5 11 5 12Z M13 10C13 11 12 12 11 12C10 12 9 11 9 10C9 9 10 8 11 8C12 8 13 9 13 10Z M5 12V4L13 2V10"
          fill={color}
          style={{ imageRendering: 'pixelated' }}
        />
      </svg>
    ),
    book: (
      <svg viewBox="0 0 16 16" width={size} height={size} className={className}>
        <path
          d="M3 2H13V14H3C2 14 2 13 2 13V3C2 3 2 2 3 2Z M5 5H11 M5 7H11 M5 9H9"
          fill="none"
          stroke={color}
          strokeWidth="1"
          style={{ imageRendering: 'pixelated' }}
        />
        <path d="M3 2H13V14H3V2Z" fill={color} fillOpacity="0.3" style={{ imageRendering: 'pixelated' }} />
      </svg>
    ),
  };
  
  return (
    <div 
      className={`inline-flex items-center justify-center ${className}`}
      style={{ 
        filter: `drop-shadow(0 0 8px ${color}60)`,
        imageRendering: 'pixelated'
      }}
    >
      {patterns[type]}
    </div>
  );
}
