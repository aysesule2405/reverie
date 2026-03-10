import React from 'react';

interface AtmosphereCardProps {
  title: string;
  subtitle: string;
  theme: 'meadow' | 'lake' | 'sunset' | 'garden';
  isSelected?: boolean;
  onClick?: () => void;
}

export function AtmosphereCard({ title, subtitle, theme, isSelected = false, onClick }: AtmosphereCardProps) {
  const themes = {
    meadow: {
      background: 'linear-gradient(135deg, #A8E6A3 0%, #8FD694 30%, #C8E6C9 60%, #E8F5E9 100%)',
      accentColor: '#5A9A6B',
      glowColor: 'rgba(143, 214, 148, 0.5)',
      elements: (
        <>
          {/* Grass blades */}
          <div className="absolute bottom-0 left-0 right-0 h-24 opacity-30">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute bottom-0 w-1 bg-[#8FD694]"
                style={{
                  height: `${30 + Math.random() * 40}px`,
                  left: `${i * 7}%`,
                  borderRadius: '100% 100% 0 0',
                  animation: `sway ${2 + i * 0.3}s ease-in-out infinite`,
                  animationDelay: `${i * 0.1}s`,
                  opacity: 0.4 + Math.random() * 0.3
                }}
              />
            ))}
          </div>
          
          {/* Wildflowers */}
          <div className="absolute bottom-12 left-1/4 w-3 h-3 bg-[#FFF3A3] opacity-60 rounded-full" />
          <div className="absolute bottom-16 right-1/3 w-2.5 h-2.5 bg-[#A8D8FF] opacity-50 rounded-full" />
          <div className="absolute bottom-14 left-1/2 w-2 h-2 bg-[#FFF3A3] opacity-55 rounded-full" />
          
          {/* Sun glow */}
          <div className="absolute top-8 right-12 w-32 h-32 bg-[#FFF3A3] opacity-20 blur-3xl rounded-full" />
          
          {/* Floating particles */}
          {[...Array(4)].map((_, i) => (
            <div
              key={`particle-${i}`}
              className="absolute w-1.5 h-1.5 bg-white opacity-40 rounded-full"
              style={{
                top: `${20 + i * 15}%`,
                left: `${10 + i * 20}%`,
                animation: `float-particle ${4 + i}s ease-in-out infinite`,
                animationDelay: `${i * 0.5}s`
              }}
            />
          ))}
        </>
      )
    },
    lake: {
      background: 'linear-gradient(135deg, #B8E0FF 0%, #7EC8E3 40%, #A8D8FF 70%, #C8E9FF 100%)',
      accentColor: '#4A8BA8',
      glowColor: 'rgba(126, 200, 227, 0.5)',
      elements: (
        <>
          {/* Water ripples */}
          {[...Array(5)].map((_, i) => (
            <div
              key={`ripple-${i}`}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white opacity-20"
              style={{
                width: `${100 + i * 40}px`,
                height: `${60 + i * 24}px`,
                animation: `ripple ${3 + i * 0.5}s ease-in-out infinite`,
                animationDelay: `${i * 0.4}s`
              }}
            />
          ))}
          
          {/* Sky reflection */}
          <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white to-transparent opacity-10" />
          
          {/* Sun reflection on water */}
          <div className="absolute top-1/4 right-1/4">
            <div className="w-24 h-24 bg-[#FFF3A3] opacity-15 rounded-full blur-2xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white opacity-25 rounded-full blur-xl" />
          </div>
          
          {/* Light shimmer */}
          <div className="absolute top-1/3 left-1/3 w-40 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-30" style={{ animation: 'shimmer 2s ease-in-out infinite' }} />
          <div className="absolute top-1/2 right-1/4 w-32 h-px bg-gradient-to-l from-transparent via-white to-transparent opacity-25" style={{ animation: 'shimmer 2.5s ease-in-out infinite', animationDelay: '0.5s' }} />
        </>
      )
    },
    sunset: {
      background: 'linear-gradient(135deg, #FFE870 0%, #FFF3A3 20%, #FFB8A3 50%, #FF9EB3 80%, #E8A8D8 100%)',
      accentColor: '#D68A5C',
      glowColor: 'rgba(255, 184, 163, 0.5)',
      elements: (
        <>
          {/* Sunset sky layers */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/4 bg-gradient-to-b from-[#FFE870] to-transparent opacity-30" />
            <div className="absolute top-1/4 left-0 w-full h-1/3 bg-gradient-to-b from-[#FFB8A3] to-transparent opacity-25" />
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#E8A8D8] to-transparent opacity-20" />
          </div>
          
          {/* Sun */}
          <div className="absolute top-1/4 left-1/4">
            <div className="w-24 h-24 bg-[#FFE870] opacity-40 rounded-full blur-2xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-[#FFF3A3] opacity-50 rounded-full blur-xl" />
          </div>
          
          {/* Light rays */}
          <div className="absolute top-1/4 left-1/4 w-48 h-px bg-gradient-to-r from-[#FFE870] to-transparent opacity-25" style={{ transform: 'rotate(-15deg)' }} />
          <div className="absolute top-1/3 left-1/4 w-40 h-px bg-gradient-to-r from-[#FFF3A3] to-transparent opacity-20" style={{ transform: 'rotate(5deg)' }} />
          <div className="absolute top-2/5 left-1/4 w-44 h-px bg-gradient-to-r from-[#FFB8A3] to-transparent opacity-18" style={{ transform: 'rotate(12deg)' }} />
          
          {/* Silhouette of distant trees */}
          <div className="absolute bottom-0 left-0 right-0 h-16 opacity-15">
            <div className="absolute bottom-0 left-[10%] w-12 h-14 bg-[#5A9A6B] rounded-t-full" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
            <div className="absolute bottom-0 left-[30%] w-10 h-12 bg-[#5A9A6B] rounded-t-full" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
            <div className="absolute bottom-0 right-[25%] w-14 h-16 bg-[#5A9A6B] rounded-t-full" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
          </div>
        </>
      )
    },
    garden: {
      background: 'linear-gradient(135deg, #8FD694 0%, #A8E6A3 30%, #C8E6C9 60%, #E0F2E9 100%)',
      accentColor: '#5A9A6B',
      glowColor: 'rgba(143, 214, 148, 0.4)',
      elements: (
        <>
          {/* Leaves */}
          <div className="absolute top-6 right-8 opacity-25">
            <div className="w-8 h-12 bg-[#8FD694] rounded-full" style={{ transform: 'rotate(20deg)' }} />
            <div className="absolute top-2 -left-4 w-6 h-10 bg-[#A8E6A3] rounded-full" style={{ transform: 'rotate(-15deg)' }} />
          </div>
          
          <div className="absolute bottom-12 left-6 opacity-20">
            <div className="w-10 h-14 bg-[#8FD694] rounded-full" style={{ transform: 'rotate(-25deg)' }} />
            <div className="absolute top-3 right-2 w-7 h-11 bg-[#A8E6A3] rounded-full" style={{ transform: 'rotate(10deg)' }} />
          </div>
          
          {/* Flowers */}
          <div className="absolute top-1/3 left-1/4">
            <div className="relative w-6 h-6">
              <div className="absolute w-3 h-3 bg-[#FFF3A3] opacity-60 rounded-full" style={{ top: '0', left: '50%', transform: 'translate(-50%, -50%)' }} />
              <div className="absolute w-3 h-3 bg-[#FFF3A3] opacity-60 rounded-full" style={{ top: '50%', right: '0', transform: 'translate(50%, -50%)' }} />
              <div className="absolute w-3 h-3 bg-[#FFF3A3] opacity-60 rounded-full" style={{ bottom: '0', left: '50%', transform: 'translate(-50%, 50%)' }} />
              <div className="absolute w-3 h-3 bg-[#FFF3A3] opacity-60 rounded-full" style={{ top: '50%', left: '0', transform: 'translate(-50%, -50%)' }} />
              <div className="absolute w-2 h-2 bg-[#FFB8A3] opacity-70 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
          </div>
          
          {/* Soft light */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#FFF3A3] opacity-10 blur-3xl rounded-full" />
          
          {/* Butterflies */}
          <div className="absolute top-1/4 right-1/3 opacity-30">
            <div className="w-2 h-1 bg-[#A8D8FF] rounded-full" style={{ animation: 'flutter 2s ease-in-out infinite' }} />
          </div>
          <div className="absolute top-1/2 left-1/2 opacity-25">
            <div className="w-1.5 h-1 bg-[#FFF3A3] rounded-full" style={{ animation: 'flutter 2.5s ease-in-out infinite', animationDelay: '0.5s' }} />
          </div>
        </>
      )
    }
  };

  const currentTheme = themes[theme];

  return (
    <button
      onClick={onClick}
      className={`
        relative w-full h-64 rounded-[24px] overflow-hidden
        transition-all duration-500 ease-out
        ${isSelected
          ? 'scale-[1.02] shadow-[0_0_40px_rgba(126,200,227,0.5),0_20px_40px_rgba(0,0,0,0.15)]' 
          : 'hover:scale-[1.01] shadow-[0_10px_30px_rgba(0,0,0,0.1)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.15)]'
        }
      `}
      style={{ background: currentTheme.background }}
    >
      {/* Animated border glow */}
      {isSelected && (
        <div 
          className="absolute inset-0 rounded-[24px] border-2 opacity-50 animate-pulse"
          style={{ 
            borderColor: currentTheme.accentColor,
            boxShadow: `inset 0 0 30px ${currentTheme.glowColor}`
          }}
        />
      )}
      
      {/* Theme-specific elements */}
      <div className="absolute inset-0">
        {currentTheme.elements}
      </div>
      
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.2)] via-transparent to-transparent" />
      
      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <div className="space-y-1 relative z-10">
          <h3 
            className="text-2xl font-light tracking-wide"
            style={{
              color: 'white',
              textShadow: `0 0 20px ${currentTheme.glowColor}, 0 2px 8px rgba(0,0,0,0.3)`
            }}
          >
            {title}
          </h3>
          <p 
            className="text-sm opacity-90"
            style={{ 
              color: currentTheme.accentColor,
              textShadow: '0 1px 4px rgba(255,255,255,0.3)'
            }}
          >
            {subtitle}
          </p>
        </div>
        
        {/* Enter indicator */}
        <div className={`
          absolute bottom-6 right-6 flex items-center gap-2 transition-all duration-300
          ${isSelected ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 group-hover:opacity-70 group-hover:translate-x-0'}
        `}>
          <span className="text-xs uppercase tracking-wider" style={{ color: currentTheme.accentColor }}>
            Enter
          </span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 4L10 8L6 12" stroke={currentTheme.accentColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Interaction ripple effect */}
      <div className={`
        absolute inset-0 bg-gradient-radial from-white to-transparent opacity-0 transition-opacity duration-300
        ${isSelected ? 'opacity-10' : ''}
      `} />

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes sway {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(3deg); }
        }
        
        @keyframes ripple {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 0.2; }
          100% { transform: translate(-50%, -50%) scale(1.3); opacity: 0; }
        }
        
        @keyframes flutter {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(5px, -3px) rotate(5deg); }
          75% { transform: translate(-3px, -5px) rotate(-5deg); }
        }
        
        @keyframes float-particle {
          0%, 100% {
            transform: translate(0, 0);
            opacity: 0.3;
          }
          50% {
            transform: translate(10px, -15px);
            opacity: 0.6;
          }
        }
      `}} />
    </button>
  );
}