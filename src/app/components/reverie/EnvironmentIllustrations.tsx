import React from 'react';

export const BedroomIllustration = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
    {/* Window */}
    <rect x="20" y="15" width="20" height="20" rx="2" fill="#6A7FDB" opacity="0.3"/>
    <line x1="30" y1="15" x2="30" y2="35" stroke="#A9B8FF" strokeWidth="1" opacity="0.5"/>
    <line x1="20" y1="25" x2="40" y2="25" stroke="#A9B8FF" strokeWidth="1" opacity="0.5"/>
    
    {/* Bed */}
    <rect x="15" y="45" width="50" height="20" rx="3" fill="#A9B8FF" opacity="0.4"/>
    <rect x="15" y="40" width="10" height="8" rx="2" fill="#F6D6FF" opacity="0.5"/>
    <rect x="55" y="40" width="10" height="8" rx="2" fill="#F6D6FF" opacity="0.5"/>
    
    {/* Stars */}
    <circle cx="50" cy="20" r="2" fill="#FFB8A3" opacity="0.6"/>
    <circle cx="58" cy="28" r="1.5" fill="#F6D6FF" opacity="0.6"/>
  </svg>
);

export const InternetIllustration = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
    {/* Monitor */}
    <rect x="18" y="20" width="44" height="32" rx="2" fill="#6A7FDB" opacity="0.3"/>
    <rect x="22" y="24" width="36" height="24" rx="1" fill="#A9B8FF" opacity="0.2"/>
    
    {/* Screen glow */}
    <rect x="24" y="26" width="32" height="20" fill="url(#screenGlow)" opacity="0.4"/>
    
    {/* Stand */}
    <rect x="36" y="52" width="8" height="6" fill="#A9B8FF" opacity="0.3"/>
    <rect x="30" y="58" width="20" height="2" rx="1" fill="#A9B8FF" opacity="0.3"/>
    
    {/* Pixels on screen */}
    <rect x="28" y="30" width="4" height="4" fill="#FFB8A3" opacity="0.6"/>
    <rect x="34" y="30" width="4" height="4" fill="#F6D6FF" opacity="0.6"/>
    <rect x="40" y="30" width="4" height="4" fill="#A9B8FF" opacity="0.6"/>
    
    <defs>
      <linearGradient id="screenGlow" x1="24" y1="26" x2="56" y2="46" gradientUnits="userSpaceOnUse">
        <stop stopColor="#6A7FDB" stopOpacity="0.8"/>
        <stop offset="1" stopColor="#A9B8FF" stopOpacity="0.3"/>
      </linearGradient>
    </defs>
  </svg>
);

export const LibraryIllustration = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
    {/* Books on shelf */}
    <rect x="15" y="25" width="8" height="30" rx="1" fill="#6A7FDB" opacity="0.4"/>
    <rect x="25" y="28" width="8" height="27" rx="1" fill="#A9B8FF" opacity="0.4"/>
    <rect x="35" y="30" width="8" height="25" rx="1" fill="#F6D6FF" opacity="0.4"/>
    <rect x="45" y="27" width="8" height="28" rx="1" fill="#FFB8A3" opacity="0.4"/>
    <rect x="55" y="32" width="8" height="23" rx="1" fill="#A9B8FF" opacity="0.4"/>
    
    {/* Shelf */}
    <rect x="12" y="55" width="56" height="3" rx="1" fill="#A9B8FF" opacity="0.3"/>
    
    {/* Open book */}
    <path d="M25 60 L25 70 L40 68 L55 70 L55 60 L40 62 Z" fill="#F6D6FF" opacity="0.3"/>
    <line x1="40" y1="62" x2="40" y2="68" stroke="#A9B8FF" strokeWidth="1" opacity="0.4"/>
  </svg>
);

export const NatureIllustration = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
    {/* Sun/Moon */}
    <circle cx="55" cy="25" r="10" fill="#FFB8A3" opacity="0.5"/>
    <circle cx="55" cy="25" r="12" fill="#FFB8A3" opacity="0.2"/>
    
    {/* Mountains */}
    <path d="M10 60 L25 35 L40 60 Z" fill="#6A7FDB" opacity="0.3"/>
    <path d="M30 60 L50 30 L70 60 Z" fill="#A9B8FF" opacity="0.3"/>
    
    {/* Horizon glow */}
    <ellipse cx="40" cy="60" rx="35" ry="8" fill="url(#sunsetGlow)" opacity="0.4"/>
    
    {/* Ground */}
    <rect x="10" y="60" width="60" height="10" fill="#F6D6FF" opacity="0.2"/>
    
    <defs>
      <linearGradient id="sunsetGlow" x1="40" y1="52" x2="40" y2="68" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFB8A3" stopOpacity="0.8"/>
        <stop offset="1" stopColor="#F6D6FF" stopOpacity="0.2"/>
      </linearGradient>
    </defs>
  </svg>
);

export const AfterSchoolIllustration = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
    {/* Door */}
    <rect x="28" y="25" width="24" height="40" rx="2" fill="#6A7FDB" opacity="0.3"/>
    <circle cx="45" cy="47" r="2" fill="#A9B8FF" opacity="0.5"/>
    
    {/* Door window */}
    <rect x="34" y="32" width="12" height="10" rx="1" fill="#FFB8A3" opacity="0.3"/>
    
    {/* Welcome mat */}
    <rect x="25" y="65" width="30" height="4" rx="1" fill="#F6D6FF" opacity="0.3"/>
    
    {/* Light from door */}
    <path d="M40 25 L30 15 L50 15 Z" fill="#A9B8FF" opacity="0.2"/>
    
    {/* Stars around */}
    <circle cx="20" cy="30" r="1.5" fill="#F6D6FF" opacity="0.5"/>
    <circle cx="60" cy="35" r="1.5" fill="#FFB8A3" opacity="0.5"/>
    <circle cx="25" cy="50" r="1" fill="#A9B8FF" opacity="0.5"/>
  </svg>
);

export const MusicIllustration = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
    {/* Headphones */}
    <path d="M25 40 Q25 20 40 20 Q55 20 55 40" stroke="#6A7FDB" strokeWidth="3" fill="none" opacity="0.4"/>
    <rect x="20" y="38" width="10" height="16" rx="3" fill="#A9B8FF" opacity="0.4"/>
    <rect x="50" y="38" width="10" height="16" rx="3" fill="#A9B8FF" opacity="0.4"/>
    
    {/* Music notes */}
    <circle cx="30" cy="60" r="3" fill="#F6D6FF" opacity="0.5"/>
    <rect x="33" y="50" width="2" height="10" fill="#F6D6FF" opacity="0.5"/>
    
    <circle cx="45" cy="58" r="3" fill="#FFB8A3" opacity="0.5"/>
    <rect x="48" y="48" width="2" height="10" fill="#FFB8A3" opacity="0.5"/>
    
    <circle cx="55" cy="62" r="2.5" fill="#A9B8FF" opacity="0.5"/>
    <rect x="57.5" y="54" width="2" height="8" fill="#A9B8FF" opacity="0.5"/>
    
    {/* Sound waves */}
    <path d="M15 35 Q18 35 18 40 Q18 45 15 45" stroke="#6A7FDB" strokeWidth="1.5" fill="none" opacity="0.3"/>
    <path d="M65 35 Q62 35 62 40 Q62 45 65 45" stroke="#6A7FDB" strokeWidth="1.5" fill="none" opacity="0.3"/>
  </svg>
);
