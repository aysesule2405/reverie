import React from 'react';

interface ReverieButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'aurora';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
}

export function ReverieButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
}: ReverieButtonProps) {
  const baseStyles = 'font-medium transition-all duration-500 rounded-[20px] relative overflow-hidden';
  
  const sizeStyles = {
    sm: 'px-5 py-2.5 text-sm',
    md: 'px-7 py-3.5 text-base',
    lg: 'px-9 py-4 text-base',
  };

  const variantStyles = {
    primary: `
      bg-gradient-to-br from-[#A8D8FF] via-[#9FD6A1] to-[#7EC8E3]
      text-[#3D5A47] shadow-[0_4px_20px_rgba(168,216,255,0.25)]
      hover:shadow-[0_6px_30px_rgba(168,216,255,0.35)]
      hover:scale-[1.02] active:scale-[0.98]
      border border-white/40
    `,
    secondary: `
      bg-white/50 backdrop-blur-md border border-[#9FD6A1]/30
      text-[#3D5A47] hover:bg-white/70 hover:border-[#9FD6A1]/50
      shadow-[0_2px_16px_rgba(159,214,161,0.15)]
      hover:shadow-[0_4px_24px_rgba(159,214,161,0.25)]
      hover:scale-[1.01] active:scale-[0.99]
    `,
    ghost: `
      bg-transparent border border-[#A8D8FF]/30
      text-[#5A7B60] hover:bg-[#A8D8FF]/10 hover:border-[#A8D8FF]/50
      hover:scale-[1.01] active:scale-[0.99]
    `,
    aurora: `
      bg-gradient-to-br from-[#FFE8D8] via-[#FFE89A] to-[#C4E3F5]
      text-[#3D5A47] shadow-[0_6px_32px_rgba(255,232,154,0.35)]
      hover:shadow-[0_8px_40px_rgba(255,232,154,0.45)]
      hover:scale-[1.02] active:scale-[0.98]
      border border-white/50
    `,
  };

  const disabledStyles = 'opacity-40 cursor-not-allowed pointer-events-none grayscale';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyles}
        ${sizeStyles[size]}
        ${variantStyles[variant]}
        ${disabled ? disabledStyles : ''}
        ${className}
      `}
    >
      {/* Soft inner glow effect */}
      <div 
        className="absolute inset-0 opacity-0 hover:opacity-20 transition-opacity duration-500"
        style={{
          background: 'radial-gradient(circle at center, rgba(181, 227, 184, 0.8), transparent 70%)',
        }}
      />
      
      {/* Gentle shimmer effect for primary and aurora variants */}
      {(variant === 'primary' || variant === 'aurora') && (
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: 'linear-gradient(120deg, transparent, rgba(255, 255, 255, 0.5), transparent)',
            animation: 'gentleShimmer 4s ease-in-out infinite'
          }}
        />
      )}
      
      <span className="relative z-10">{children}</span>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes gentleShimmer {
          0% { transform: translateX(-100%) skewX(-15deg); opacity: 0; }
          50% { opacity: 0.2; }
          100% { transform: translateX(200%) skewX(-15deg); opacity: 0; }
        }
      `}} />
    </button>
  );
}