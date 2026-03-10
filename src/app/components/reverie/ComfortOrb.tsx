import React from 'react';

interface ComfortOrbProps {
  percentage: number;
  className?: string;
}

export function ComfortOrb({ percentage, className = '' }: ComfortOrbProps) {
  // Ghibli-inspired color mapping based on comfort level
  const getOrbColor = (pct: number) => {
    // High comfort - sky blue (peaceful, like Totoro's sky)
    if (pct >= 70) return { 
      primary: '#7EC8E3',    // Lake blue
      secondary: '#A8D8FF',  // Sky blue
      accent: '#8FD694',     // Meadow green
      glow: 'rgba(126, 200, 227, 0.3)'
    };
    // Medium comfort - balanced green (growth, like Ghibli meadows)
    if (pct >= 40) return { 
      primary: '#8FD694',    // Grass green
      secondary: '#7EC8E3',  // Sky complement
      accent: '#FFF3A3',     // Warm sunlight
      glow: 'rgba(143, 214, 148, 0.3)'
    };
    // Lower comfort - warm sunlight (hope, gentle not alarming)
    return { 
      primary: '#FFF3A3',    // Warm sun
      secondary: '#8FD694',  // Calming green
      accent: '#A8D8FF',     // Sky hope
      glow: 'rgba(255, 243, 163, 0.35)'
    };
  };

  const colors = getOrbColor(percentage);
  const circumference = 2 * Math.PI * 85;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Outer atmospheric glows - Ghibli-style soft light */}
      <div 
        className="absolute inset-0 rounded-full blur-[100px] opacity-30 pulse-slow"
        style={{ 
          background: `radial-gradient(circle, ${colors.primary}60 0%, ${colors.secondary}40 40%, transparent 70%)`,
          animation: 'ghibli-glow 8s ease-in-out infinite',
          boxShadow: colors.glow
        }}
      />
      <div 
        className="absolute inset-0 rounded-full blur-[120px] opacity-25 pulse-gentle"
        style={{ 
          background: `radial-gradient(circle, ${colors.secondary}50 0%, ${colors.accent}30 50%, transparent 70%)`,
          animation: 'ghibli-glow 10s ease-in-out infinite reverse'
        }}
      />
      <div 
        className="absolute inset-0 rounded-full blur-[80px] opacity-35 pulse-glow"
        style={{ 
          background: `radial-gradient(circle, ${colors.accent}40 20%, transparent 60%)`,
          animation: 'ghibli-glow 9s ease-in-out infinite'
        }}
      />
      
      {/* Main orb container */}
      <div className="relative w-64 h-64">
        {/* SVG for circular progress */}
        <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
          {/* Background circle */}
          <circle
            cx="100"
            cy="100"
            r="85"
            fill="none"
            stroke="rgba(255, 255, 255, 0.06)"
            strokeWidth="8"
          />
          
          {/* Progress circle */}
          <circle
            cx="100"
            cy="100"
            r="85"
            fill="none"
            stroke={colors.primary}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{
              filter: `drop-shadow(0 0 15px ${colors.primary}80)`,
              transition: 'stroke-dashoffset 1s ease-out'
            }}
          />
          
          {/* Inner glow circle */}
          <circle
            cx="100"
            cy="100"
            r="75"
            fill="url(#orbGradient)"
            opacity="0.15"
          />
          
          <defs>
            <radialGradient id="orbGradient">
              <stop offset="0%" stopColor={colors.primary} stopOpacity="0.8" />
              <stop offset="50%" stopColor={colors.secondary} stopOpacity="0.4" />
              <stop offset="100%" stopColor={colors.accent} stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
        
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {/* Floating particles */}
          <div className="absolute inset-0">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 rounded-full"
                style={{
                  background: colors.accent,
                  opacity: 0.4,
                  top: `${30 + Math.random() * 40}%`,
                  left: `${30 + Math.random() * 40}%`,
                  animation: `float-particle ${4 + i}s ease-in-out infinite`,
                  animationDelay: `${i * 0.5}s`,
                  boxShadow: `0 0 10px ${colors.accent}`
                }}
              />
            ))}
          </div>
          
          {/* Text content */}
          <div className="relative z-10 text-center">
            <p 
              className="text-xs uppercase tracking-widest mb-2 opacity-70"
              style={{ color: colors.primary }}
            >
              Comfort Field
            </p>
            <p 
              className="text-5xl font-light tabular-nums"
              style={{
                color: colors.primary,
                textShadow: `0 0 30px ${colors.primary}60`,
                letterSpacing: '-0.02em'
              }}
            >
              {percentage}
              <span className="text-3xl opacity-70">%</span>
            </p>
          </div>
        </div>
        
        {/* Orbital rings */}
        <div 
          className="absolute inset-0 rounded-full border border-white/5"
          style={{
            animation: 'rotate-slow 30s linear infinite'
          }}
        />
        <div 
          className="absolute inset-4 rounded-full border border-white/5"
          style={{
            animation: 'rotate-slow 25s linear infinite reverse'
          }}
        />
      </div>

      {/* Custom animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float-particle {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.4;
          }
          50% {
            transform: translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px) scale(1.5);
            opacity: 0.8;
          }
        }
        
        @keyframes rotate-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes ghibli-glow {
          0%, 100% {
            transform: scale(1);
            opacity: 0.4;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.6;
          }
        }
        
        @keyframes pulse-slow {
          0%, 100% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.02);
            opacity: 0.5;
          }
        }
        
        @keyframes pulse-gentle {
          0%, 100% {
            transform: scale(1);
            opacity: 0.25;
          }
          50% {
            transform: scale(1.03);
            opacity: 0.4;
          }
        }
        
        @keyframes pulse-glow {
          0%, 100% {
            transform: scale(1);
            opacity: 0.35;
          }
          50% {
            transform: scale(1.04);
            opacity: 0.5;
          }
        }
      `}} />
    </div>
  );
}