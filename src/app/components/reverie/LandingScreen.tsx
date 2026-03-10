import React, { useEffect, useState } from 'react';
import ghibliLandscape from 'figma:asset/573cbd7ceaaa6d73a84668028329e1776130e659.png';

interface LandingScreenProps {
  onBegin?: () => void;
}

export function LandingScreen({ onBegin }: LandingScreenProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full max-w-[390px] min-h-[844px] overflow-hidden">
      {/* Beautiful Ghibli-style meadow landscape background */}
      <div className="absolute inset-0">
        <img 
          src={ghibliLandscape}
          alt="Peaceful meadow landscape with morning mist"
          className="w-full h-full object-cover"
        />
        
        {/* Soft overlay for readability */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(255, 254, 248, 0.1) 0%, rgba(255, 254, 248, 0.3) 50%, rgba(255, 254, 248, 0.6) 100%)',
          }}
        />
        
        {/* Subtle paper texture */}
        <div 
          className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-multiply"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '250px 250px'
          }}
        />
      </div>

      {/* Content */}
      <div 
        className={`relative z-10 flex flex-col items-center justify-between min-h-[844px] px-8 py-16 transition-all duration-1500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} bg-[#09362b78]`}
      >
        {/* Top section */}
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 pt-20">
          {/* Decorative element - soft and natural */}
          <div className="flex items-center gap-3 opacity-60">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#B5E3B8]/50 to-transparent" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFEEAD]/80" style={{ boxShadow: '0 0 16px rgba(255, 238, 173, 0.6)' }} />
            <div className="w-16 h-px bg-gradient-to-l from-transparent via-[#B5E3B8]/50 to-transparent" />
          </div>

          {/* Title - warm and inviting */}
          <div className="space-y-3">
            <h1 
              className="text-6xl font-light tracking-wide"
              style={{
                background: 'linear-gradient(135deg, #B8DDFF 0%, #B5E3B8 50%, #FFEEAD 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 2px 12px rgba(184, 221, 255, 0.3))',
                fontFamily: 'var(--font-heading)',
                letterSpacing: '0.05em'
              }}
            ><span className="font-bold">Reverie</span></h1>
            
            {/* Decorative line - soft and subtle */}
            <div className="flex justify-center">
              <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#B8DDFF]/60 to-transparent opacity-50" />
            </div>
          </div>

          {/* Subtitle */}
          <p 
            className="text-base leading-relaxed max-w-[280px]"
            style={{
              color: 'white',
              fontWeight: '300',
              letterSpacing: '0.02em'
            }}
          >Rediscover emotional comfort through familiar atmospheres.</p>

          {/* Decorative sparkle */}
          <div className="relative pt-4">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="opacity-60">
              <path 
                d="M20 4L21 14L28 15L21 16L20 26L19 16L12 15L19 14L20 4Z" 
                fill="#FFEEAD"
                style={{ filter: 'drop-shadow(0 0 8px rgba(255, 238, 173, 0.6))' }}
              />
              <circle cx="20" cy="15" r="2" fill="#95D199" opacity="0.8" />
            </svg>
          </div>
        </div>

        {/* Bottom section */}
        <div className="space-y-6 w-full pb-8">
          {/* Begin button */}
          <button
            onClick={onBegin}
            className="w-full py-4 px-8 rounded-[20px] text-base font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #B8DDFF 0%, #B5E3B8 50%, #FFEEAD 100%)',
              color: '#5A7B65',
              textShadow: '0 1px 2px rgba(255, 255, 255, 0.8)',
              boxShadow: '0 8px 24px rgba(184, 221, 255, 0.3), 0 0 40px rgba(255, 238, 173, 0.25)',
              letterSpacing: '0.02em'
            }}
          >
            {/* Button glow effect */}
            <div 
              className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, transparent 100%)',
              }}
            />
            
            <span className="relative z-10">Begin Calibration</span>
            
            {/* Shimmer */}
            <div 
              className="absolute inset-0 opacity-30"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent)',
                animation: 'shimmer 3s ease-in-out infinite'
              }}
            />
          </button>

          {/* Tagline */}
          <p 
            className="text-xs text-center opacity-70"
            style={{
              color: 'white',
              letterSpacing: '0.05em'
            }}
          >
            A gentle space for emotional regulation
          </p>
        </div>
      </div>

      {/* Animations */}
      <style dangerouslySetInnerHTML={{__html: `\n        @keyframes shimmer {\n          0% {\n            transform: translateX(-100%);\n          }\n          100% {\n            transform: translateX(100%);\n          }\n        }\n      `}} />
    </div>
  );
}