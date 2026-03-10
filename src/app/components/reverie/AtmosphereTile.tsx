import React from 'react';

interface AtmosphereTileProps {
  title: string;
  icon: React.ReactNode;
  gradient: string;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

export function AtmosphereTile({ 
  title, 
  icon, 
  gradient,
  isActive = false,
  onClick,
  className = ''
}: AtmosphereTileProps) {
  return (
    <button
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-[20px] p-6
        backdrop-blur-lg transition-all duration-300
        cursor-pointer group
        ${isActive 
          ? 'bg-[rgba(255,255,255,0.7)] border-2 border-[rgba(143,214,148,0.4)] shadow-ghibli-md scale-in-bounce' 
          : 'bg-[rgba(255,255,255,0.4)] border border-[rgba(143,214,148,0.25)] hover-lift-sm press-scale hover-glow-meadow'
        }
        ${className}
      `}
    >
      {/* Aurora gradient background */}
      <div 
        className={`absolute inset-0 opacity-15 group-hover:opacity-25 transition-opacity duration-300 ${isActive ? 'opacity-30' : ''}`}
        style={{ background: gradient }}
      />
      
      {/* Paper texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-3 text-center">
        <div className={`
          text-3xl transition-all duration-300
          ${isActive ? 'scale-110 bounce-once' : 'group-hover:scale-110 float-gentle'}
        `}>
          {icon}
        </div>
        <p className={`
          text-sm font-medium transition-colors duration-300
          ${isActive ? 'text-[#2B5F4D]' : 'text-[#4A8556] group-hover:text-[#2B5F4D]'}
        `}>
          {title}
        </p>
      </div>
      
      {/* Glow effect when active */}
      {isActive && (
        <div className="absolute inset-0 rounded-[20px] pointer-events-none pulse-glow"
          style={{
            boxShadow: 'inset 0 0 30px rgba(143, 214, 148, 0.3), 0 0 40px rgba(143, 214, 148, 0.2)'
          }}
        />
      )}
    </button>
  );
}