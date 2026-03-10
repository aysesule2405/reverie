import React from 'react';

interface ReverieCardProps {
  children: React.ReactNode;
  variant?: 'glass' | 'solid' | 'glow';
  className?: string;
  onClick?: () => void;
}

export function ReverieCard({
  children,
  variant = 'glass',
  className = '',
  onClick,
}: ReverieCardProps) {
  const baseStyles = 'rounded-[20px] transition-all duration-500 relative overflow-hidden';

  const variantStyles = {
    glass: `
      bg-white/60 backdrop-blur-xl
      border border-white/50
      shadow-[0_4px_24px_rgba(159,214,161,0.12)]
      hover:shadow-[0_6px_32px_rgba(159,214,161,0.18)]
    `,
    solid: `
      bg-gradient-to-br from-white/80 via-white/70 to-white/80
      border border-[#C8E6C9]/30
      shadow-[0_2px_16px_rgba(168,216,255,0.1)]
      hover:shadow-[0_4px_24px_rgba(168,216,255,0.15)]
    `,
    glow: `
      bg-gradient-to-br from-[#FFFEF8]/90 via-white/70 to-[#FFF9E5]/80
      border border-[#FFE89A]/30
      shadow-[0_8px_40px_rgba(255,232,154,0.2)]
      hover:shadow-[0_12px_48px_rgba(255,232,154,0.3)]
    `,
  };

  return (
    <div
      onClick={onClick}
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${onClick ? 'cursor-pointer hover:scale-[1.01] active:scale-[0.99]' : ''}
        ${className}
      `}
    >
      {/* Subtle paper texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply rounded-[20px]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Warm inner glow for glow variant */}
      {variant === 'glow' && (
        <div 
          className="absolute inset-0 opacity-40 pointer-events-none rounded-[20px]"
          style={{
            background: 'radial-gradient(circle at top right, rgba(255, 232, 154, 0.15), transparent 60%)',
          }}
        />
      )}
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}