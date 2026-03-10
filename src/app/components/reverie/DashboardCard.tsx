import React from 'react';

interface DashboardCardProps {
  label?: string;
  title: string;
  subtitle?: string;
  description?: string;  // Added for compatibility
  variant?: 'default' | 'highlight' | 'action';
  icon?: React.ReactNode;
  gradient?: string;  // Added for compatibility
  onClick?: () => void;
  className?: string;
}

export function DashboardCard({ 
  label,
  title, 
  subtitle,
  description,
  variant = 'default',
  icon,
  gradient,
  onClick,
  className = ''
}: DashboardCardProps) {
  const variantStyles = {
    default: {
      container: 'bg-[rgba(255,255,255,0.6)] border-[rgba(143,214,148,0.3)]',
      glow: 'transparent'
    },
    highlight: {
      container: 'bg-[rgba(168,216,255,0.15)] border-[rgba(168,216,255,0.3)]',
      glow: 'rgba(126,200,227,0.15)'
    },
    action: {
      container: 'bg-gradient-to-br from-[rgba(168,216,255,0.2)] to-[rgba(143,214,148,0.15)] border-[rgba(143,214,148,0.35)]',
      glow: 'rgba(126,200,227,0.2)'
    }
  };

  const style = variantStyles[variant];
  const isInteractive = !!onClick;
  const displaySubtitle = subtitle || description; // Support both prop names

  return (
    <div
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-[20px] p-5 border backdrop-blur-lg
        transition-all duration-300
        ${style.container}
        ${isInteractive ? 'cursor-pointer hover-lift press-scale hover-glow-meadow group' : ''}
        ${className}
      `}
      style={{
        boxShadow: '0 2px 16px rgba(75, 133, 86, 0.08)'
      }}
    >
      {/* Gradient overlay if provided */}
      {gradient && (
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none transition-opacity duration-300"
          style={{ background: gradient }}
        />
      )}
      
      {/* Ambient glow */}
      {style.glow !== 'transparent' && (
        <div 
          className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl pointer-events-none opacity-60 pulse-slow"
          style={{ background: style.glow }}
        />
      )}
      
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 space-y-2">
        {/* Label */}
        {label && (
          <p className="text-xs uppercase tracking-wider fade-in-fast" style={{ color: '#6DB876', opacity: 0.7 }}>
            {label}
          </p>
        )}
        
        {/* Title row */}
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-base font-medium transition-colors duration-300" style={{ color: '#2B5F4D' }}>
            {title}
          </h3>
          {icon && (
            <div className="flex-shrink-0">
              {icon}
            </div>
          )}
        </div>
        
        {/* Subtitle/Description */}
        {displaySubtitle && (
          <p className="text-sm leading-relaxed transition-colors duration-300" style={{ color: '#4A8556', opacity: 0.85 }}>
            {displaySubtitle}
          </p>
        )}
      </div>

      {/* Arrow indicator for interactive cards */}
      {isInteractive && (
        <div className="absolute bottom-5 right-5 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 4L10 8L6 12" stroke="#4A8556" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      )}
    </div>
  );
}