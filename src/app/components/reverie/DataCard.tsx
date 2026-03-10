import React from 'react';

interface DataCardProps {
  label: string;
  value: string | number;
  unit?: string;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  color?: string;
  className?: string;
}

export function DataCard({ 
  label, 
  value, 
  unit,
  icon,
  trend,
  trendValue,
  color = '#6A7FDB',
  className = ''
}: DataCardProps) {
  const trendColors = {
    up: '#A9B8FF',
    down: '#FFB8A3',
    neutral: '#F6D6FF'
  };
  
  const trendIcons = {
    up: '↗',
    down: '↘',
    neutral: '→'
  };
  
  return (
    <div className={`
      relative overflow-hidden rounded-[20px] p-5
      bg-[rgba(255,255,255,0.06)] backdrop-blur-lg
      border border-[rgba(255,255,255,0.12)]
      shadow-[0_8px_32px_rgba(0,0,0,0.3)]
      transition-all duration-300
      hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)]
      hover:bg-[rgba(255,255,255,0.08)]
      ${className}
    `}>
      {/* Ambient glow based on color */}
      <div 
        className="absolute top-0 right-0 w-24 h-24 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: color }}
      />
      
      {/* CRT scanlines */}
      <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.02)_2px,rgba(255,255,255,0.02)_4px)] pointer-events-none opacity-50" />
      
      {/* Content */}
      <div className="relative z-10 space-y-2">
        {/* Header */}
        <div className="flex items-center justify-between">
          <p className="text-xs text-[#A9B8FF] uppercase tracking-wide opacity-80">
            {label}
          </p>
          {icon && (
            <div className="text-lg opacity-60" style={{ color }}>
              {icon}
            </div>
          )}
        </div>
        
        {/* Value */}
        <div className="flex items-baseline gap-1">
          <p className="text-3xl font-semibold text-[#F6D6FF]" style={{ 
            textShadow: `0 0 20px ${color}40`
          }}>
            {value}
          </p>
          {unit && (
            <p className="text-sm text-[#A9B8FF] opacity-70">
              {unit}
            </p>
          )}
        </div>
        
        {/* Trend */}
        {trend && trendValue && (
          <div className="flex items-center gap-1.5 pt-1">
            <span 
              className="text-xs font-medium"
              style={{ color: trendColors[trend] }}
            >
              {trendIcons[trend]} {trendValue}
            </span>
            <span className="text-xs text-[#A9B8FF] opacity-50">
              vs. yesterday
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
