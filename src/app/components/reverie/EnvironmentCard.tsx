import React from 'react';

interface EnvironmentCardProps {
  title: string;
  gradient: string;
  icon: React.ReactNode;
  illustration: React.ReactNode;
  isSelected: boolean;
  onClick: () => void;
}

export function EnvironmentCard({ 
  title, 
  gradient, 
  icon,
  illustration,
  isSelected, 
  onClick 
}: EnvironmentCardProps) {
  return (
    <button
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-[20px] p-4 pb-5
        backdrop-blur-lg transition-all duration-300
        cursor-pointer group
        ${isSelected 
          ? 'bg-[rgba(255,255,255,0.12)] border-2 border-[rgba(169,184,255,0.6)] shadow-[0_0_30px_rgba(106,127,219,0.5),inset_0_0_20px_rgba(106,127,219,0.2)] scale-[0.98]' 
          : 'bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.2)] hover:scale-[1.02]'
        }
      `}
    >
      {/* Gradient background */}
      <div 
        className={`absolute inset-0 transition-opacity duration-300 ${isSelected ? 'opacity-25' : 'opacity-15 group-hover:opacity-20'}`}
        style={{ background: gradient }}
      />
      
      {/* CRT scanlines */}
      <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.02)_2px,rgba(255,255,255,0.02)_4px)] pointer-events-none bg-[#48b5153b]" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-3 h-full">
        {/* Illustration area */}
        <div className={`
          w-full aspect-square rounded-2xl flex items-center justify-center
          transition-all duration-300
          ${isSelected ? 'bg-[rgba(255,255,255,0.08)]' : 'bg-[rgba(255,255,255,0.04)] group-hover:bg-[rgba(255,255,255,0.06)]'}
        `}>
          <div className={`
            transition-all duration-300
            ${isSelected ? 'scale-110' : 'group-hover:scale-105'}
          `}>
            {illustration}
          </div>
        </div>
        
        {/* Title */}
        <div className="flex flex-col items-center gap-1.5 flex-1 justify-end">
          <div className={`
            text-lg transition-all duration-300
            ${isSelected ? 'scale-110 opacity-90' : 'opacity-70'}
          `}>
            {icon}
          </div>
          <p className={`
            text-xs text-center font-medium transition-colors duration-300 leading-snug
            ${isSelected ? 'text-[#F6D6FF]' : 'text-[#A9B8FF]'}
          `}>
            {title}
          </p>
        </div>
      </div>
      
      {/* Selection indicator */}
      {isSelected && (
        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#6A7FDB] shadow-[0_0_15px_rgba(106,127,219,0.8)] flex items-center justify-center z-20">
          <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
            <path d="M1 5L4.5 8.5L11 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      )}
    </button>
  );
}
