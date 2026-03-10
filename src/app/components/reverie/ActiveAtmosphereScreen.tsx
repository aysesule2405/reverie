import React, { useState, useEffect } from 'react';
import { PixelIcon } from './PixelIcon';
import { ReverieButton } from './ReverieButton';
import { GhibliBackground } from './GhibliBackground';

interface ActiveAtmosphereScreenProps {
  atmosphereType?: 'internet' | 'bedroom' | 'afterschool' | 'library';
  onExit?: () => void;
}

export function ActiveAtmosphereScreen({ 
  atmosphereType = 'internet',
  onExit 
}: ActiveAtmosphereScreenProps) {
  const [intensity, setIntensity] = useState<'low' | 'medium' | 'deep'>('medium');
  const [isActive, setIsActive] = useState(false);

  // Activate animation on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsActive(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const atmosphereConfig = {
    internet: {
      title: 'Spring Meadow Mode',
      subtitle: 'Wildflowers • Gentle breeze • Nature sounds',
      message: 'Atmosphere active. Your environment is shifting toward familiar comfort.',
      primaryColor: '#6DB876',
      secondaryColor: '#8FD694',
      accentColor: '#4A8556'
    }
  };

  const config = atmosphereConfig[atmosphereType];
  const intensityLevels = ['low', 'medium', 'deep'];

  return (
    <div className={`relative w-full max-w-[390px] min-h-[844px] overflow-hidden transition-opacity duration-1000 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
      {/* Ghibli-inspired atmospheric background */}
      <GhibliBackground variant="meadow" withTexture={true} withParticles={true} />

      {/* Main Content */}
      <div className="relative z-10 min-h-[844px] flex flex-col px-6 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          {/* Back/Exit button */}
          <button 
            onClick={onExit}
            className="flex items-center gap-2 text-[#4A8556] opacity-80 hover:opacity-100 hover:text-[#2B5F4D] transition-all duration-300"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>

          {/* Timer */}
          <div 
            className="flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-lg border"
            style={{
              background: 'rgba(143, 214, 148, 0.15)',
              borderColor: 'rgba(143, 214, 148, 0.35)',
              boxShadow: '0 2px 8px rgba(75, 133, 86, 0.08)'
            }}
          >
            <div className="w-2 h-2 bg-[#6DB876] rounded-full animate-pulse" />
            <span className="text-xs font-medium" style={{ color: '#4A8556' }}>12:34</span>
          </div>
        </div>

        {/* Center Content */}
        <div className="flex-1 flex flex-col items-center justify-center space-y-8 pb-32">
          {/* Status Icon with Ghibli-style glow */}
          <div className="relative">
            <div 
              className="absolute inset-0 rounded-full blur-2xl opacity-40 animate-pulse"
              style={{ 
                background: `radial-gradient(circle, ${config.primaryColor} 0%, transparent 70%)`,
                width: '120px',
                height: '120px'
              }}
            />
            <div 
              className="relative w-20 h-20 rounded-full flex items-center justify-center"
              style={{
                background: `rgba(143, 214, 148, 0.2)`,
                border: `2px solid rgba(109, 184, 118, 0.4)`,
                boxShadow: `0 0 30px rgba(109, 184, 118, 0.3), inset 0 0 20px rgba(143, 214, 148, 0.15)`
              }}
            >
              <PixelIcon type="sparkle" size={40} color={config.primaryColor} />
            </div>
          </div>

          {/* Mode Title */}
          <div className="text-center space-y-3 px-4">
            <h1 
              className="text-2xl font-light tracking-wide"
              style={{
                color: '#2B5F4D',
                textShadow: `0 2px 12px rgba(109, 184, 118, 0.25)`,
                letterSpacing: '0.02em'
              }}
            >
              {config.title}
            </h1>
            <p 
              className="text-xs uppercase tracking-widest"
              style={{ color: config.accentColor, opacity: 0.85 }}
            >
              {config.subtitle}
            </p>
          </div>

          {/* Status Message */}
          <div 
            className="rounded-[20px] px-6 py-4 backdrop-blur-lg border max-w-[320px]"
            style={{
              background: 'rgba(255, 255, 255, 0.5)',
              borderColor: 'rgba(143, 214, 148, 0.3)',
              boxShadow: '0 2px 16px rgba(75, 133, 86, 0.08)'
            }}
          >
            <p 
              className="text-sm text-center leading-relaxed"
              style={{ color: '#4A8556', opacity: 0.85 }}
            >
              {config.message}
            </p>
          </div>

          {/* Breathing Animation Circle */}
          <div className="relative w-32 h-32">
            <div 
              className="absolute inset-0 rounded-full border-2 opacity-30"
              style={{ 
                borderColor: config.primaryColor,
                animation: 'breathe 6s ease-in-out infinite'
              }}
            />
            <div 
              className="absolute inset-2 rounded-full border-2 opacity-20"
              style={{ 
                borderColor: config.secondaryColor,
                animation: 'breathe 6s ease-in-out infinite reverse',
                animationDelay: '1s'
              }}
            />
            <div 
              className="absolute inset-4 rounded-full border-2 opacity-10"
              style={{ 
                borderColor: config.primaryColor,
                animation: 'breathe 6s ease-in-out infinite',
                animationDelay: '2s'
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-xs" style={{ color: '#6DB876', opacity: 0.7 }}>Breathe</p>
            </div>
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="space-y-6">
          {/* Intensity Slider */}
          <div 
            className="rounded-[24px] p-6 backdrop-blur-lg border"
            style={{
              background: 'rgba(255, 255, 255, 0.5)',
              borderColor: 'rgba(143, 214, 148, 0.25)',
              boxShadow: '0 2px 16px rgba(75, 133, 86, 0.08)'
            }}
          >
            <label className="block mb-4">
              <span className="text-sm font-medium" style={{ color: '#2B5F4D' }}>Atmosphere Intensity</span>
            </label>

            {/* Custom segmented control */}
            <div className="flex gap-2">
              {intensityLevels.map((level) => (
                <button
                  key={level}
                  onClick={() => setIntensity(level as typeof intensity)}
                  className={`
                    flex-1 py-3 px-4 rounded-[16px] text-sm font-medium
                    transition-all duration-300 relative overflow-hidden
                    ${intensity === level 
                      ? 'text-[#2B5F4D]' 
                      : 'text-[#6DB876] opacity-70 hover:opacity-100'
                    }
                  `}
                  style={{
                    background: intensity === level 
                      ? `rgba(143, 214, 148, 0.25)`
                      : 'rgba(143, 214, 148, 0.08)',
                    border: intensity === level 
                      ? `1px solid rgba(109, 184, 118, 0.5)`
                      : '1px solid rgba(143, 214, 148, 0.2)',
                    boxShadow: intensity === level 
                      ? `0 2px 12px rgba(109, 184, 118, 0.15)`
                      : 'none'
                  }}
                >
                  <span className="relative z-10 capitalize">{level}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3">
            <button 
              className="py-3 px-4 rounded-[16px] text-sm font-medium transition-all duration-300 hover:opacity-90"
              style={{
                background: 'rgba(168, 216, 255, 0.15)',
                border: '1px solid rgba(168, 216, 255, 0.3)',
                color: '#5BA5C4',
                boxShadow: '0 2px 8px rgba(126, 200, 227, 0.08)'
              }}
            >
              <div className="flex items-center justify-center gap-2">
                <PixelIcon type="music" size={16} color="#5BA5C4" />
                <span>Add Sound</span>
              </div>
            </button>
            
            <button 
              className="py-3 px-4 rounded-[16px] text-sm font-medium transition-all duration-300 hover:opacity-90"
              style={{
                background: 'rgba(255, 184, 163, 0.15)',
                border: '1px solid rgba(255, 184, 163, 0.3)',
                color: '#D4916E',
                boxShadow: '0 2px 8px rgba(255, 184, 163, 0.08)'
              }}
            >
              <div className="flex items-center justify-center gap-2">
                <PixelIcon type="heart" size={16} color="#D4916E" />
                <span>Save</span>
              </div>
            </button>
          </div>
        </div>

        {/* Safe area spacing */}
        <div className="h-6" />
      </div>

      {/* Custom Animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes crt-pulse {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.4;
            transform: scale(1.05);
          }
        }
        
        @keyframes scan-line {
          0% {
            top: 0%;
          }
          100% {
            top: 100%;
          }
        }
        
        @keyframes float-element {
          0%, 100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(10px, -15px);
          }
        }
        
        @keyframes pixel-fade {
          0%, 100% {
            opacity: 0.4;
          }
          50% {
            opacity: 1;
          }
        }
        
        @keyframes loading-pulse {
          0%, 100% {
            opacity: 0.5;
            transform: scaleX(0.7);
          }
          50% {
            opacity: 1;
            transform: scaleX(1);
          }
        }
        
        @keyframes breathe {
          0%, 100% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.1;
          }
        }
      `}} />
    </div>
  );
}