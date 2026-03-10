import React, { useState, useEffect } from 'react';
import { ReverieButton } from './ReverieButton';
import { GhibliBackground } from './GhibliBackground';

interface StorytellingMomentScreenProps {
  onEnter?: () => void;
  detectedPressure?: 'high' | 'rising' | 'moderate';
  atmosphereName?: string;
}

export function StorytellingMomentScreen({ 
  onEnter,
  detectedPressure = 'rising',
  atmosphereName = 'Spring Meadow'
}: StorytellingMomentScreenProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [curtainPhase, setCurtainPhase] = useState(0);

  useEffect(() => {
    // Fade in animation
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Subtle curtain movement cycle
    const interval = setInterval(() => {
      setCurtainPhase(prev => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const pressureMessages = {
    high: 'We noticed you might be feeling overwhelmed.',
    rising: 'We detected rising sensory pressure.',
    moderate: 'You seem like you could use a moment of calm.'
  };

  return (
    <div 
      className={`relative w-full max-w-[390px] min-h-[844px] overflow-hidden bg-[#F7FFF7] transition-opacity duration-1000 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Ghibli atmospheric background */}
      <GhibliBackground variant="golden" withTexture={true} withParticles={true} />

      {/* Top Half: Sunlight Through Curtains Visual */}
      <div className="relative h-[422px] overflow-hidden">
        {/* Warm sky gradient background */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(180deg,
                #FFF9E5 0%,
                #FFE870 20%,
                #F5D86D 40%,
                #FFC48A 60%,
                #A8D8FF 80%,
                #7EC8E3 100%
              )
            `
          }}
        />

        {/* Sun glow - golden hour */}
        <div 
          className="absolute top-[15%] right-[20%] w-[300px] h-[300px] rounded-full blur-[100px]"
          style={{
            background: 'radial-gradient(circle, #FFF3A3 0%, #FFE870 30%, transparent 70%)',
            opacity: 0.7,
            animation: 'gentle-pulse 8s ease-in-out infinite'
          }}
        />

        {/* Soft clouds */}
        <div className="absolute top-[10%] left-[10%] w-24 h-10 rounded-full bg-white opacity-30 blur-xl animate-[drift_30s_linear_infinite]" />
        <div className="absolute top-[25%] right-[15%] w-32 h-12 rounded-full bg-white opacity-25 blur-xl animate-[drift_35s_linear_infinite_reverse]" />
        
        {/* Moving curtains - left side */}
        <div 
          className="absolute top-0 left-0 w-[45%] h-full"
          style={{
            background: `
              linear-gradient(90deg,
                rgba(255, 255, 255, 0.85) 0%,
                rgba(255, 255, 255, 0.7) 40%,
                rgba(255, 255, 255, 0.4) 70%,
                rgba(255, 255, 255, 0) 100%
              )
            `,
            filter: 'blur(0.5px)',
            animation: 'curtain-left 6s ease-in-out infinite',
            transformOrigin: 'top left'
          }}
        >
          {/* Curtain fabric folds */}
          {[...Array(8)].map((_, i) => (
            <div
              key={`fold-left-${i}`}
              className="absolute h-full w-1 opacity-10"
              style={{
                left: `${10 + i * 12}%`,
                background: 'linear-gradient(180deg, transparent 0%, rgba(255, 243, 163, 0.3) 50%, transparent 100%)',
                animation: `curtain-fold ${3 + i * 0.2}s ease-in-out infinite`,
                animationDelay: `${i * 0.1}s`
              }}
            />
          ))}
        </div>

        {/* Moving curtains - right side */}
        <div 
          className="absolute top-0 right-0 w-[45%] h-full"
          style={{
            background: `
              linear-gradient(270deg,
                rgba(255, 255, 255, 0.85) 0%,
                rgba(255, 255, 255, 0.7) 40%,
                rgba(255, 255, 255, 0.4) 70%,
                rgba(255, 255, 255, 0) 100%
              )
            `,
            filter: 'blur(0.5px)',
            animation: 'curtain-right 6s ease-in-out infinite',
            transformOrigin: 'top right'
          }}
        >
          {/* Curtain fabric folds */}
          {[...Array(8)].map((_, i) => (
            <div
              key={`fold-right-${i}`}
              className="absolute h-full w-1 opacity-10"
              style={{
                right: `${10 + i * 12}%`,
                background: 'linear-gradient(180deg, transparent 0%, rgba(255, 243, 163, 0.3) 50%, transparent 100%)',
                animation: `curtain-fold ${3 + i * 0.2}s ease-in-out infinite`,
                animationDelay: `${i * 0.1}s`
              }}
            />
          ))}
        </div>

        {/* Light rays streaming through curtains */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div
              key={`ray-${i}`}
              className="absolute h-full opacity-10"
              style={{
                left: `${15 + i * 15}%`,
                width: '40px',
                background: 'linear-gradient(180deg, rgba(255, 243, 163, 0.4) 0%, rgba(255, 243, 163, 0.1) 50%, transparent 100%)',
                transform: `skewX(-20deg) translateX(${curtainPhase * 10}px)`,
                transition: 'transform 2s ease-in-out',
                animation: `light-ray ${4 + i * 0.5}s ease-in-out infinite`,
                animationDelay: `${i * 0.3}s`
              }}
            />
          ))}
        </div>

        {/* Gentle floating particles (dust in sunlight) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <div
              key={`particle-${i}`}
              className="absolute w-1 h-1 rounded-full bg-white opacity-40"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float-particle ${8 + Math.random() * 6}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 4}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Bottom Half: Content */}
      <div className="relative z-10 px-6 pt-12 pb-8 flex flex-col items-center">
        {/* Decorative divider */}
        <div className="flex items-center gap-3 mb-8">
          <div 
            className="w-12 h-px"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, #6DB876 100%)',
              opacity: 0.4
            }}
          />
          <div className="flex gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-[#8FD694] opacity-60" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#7EC8E3] opacity-60" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#FFF3A3] opacity-60" />
          </div>
          <div 
            className="w-12 h-px"
            style={{
              background: 'linear-gradient(270deg, transparent 0%, #6DB876 100%)',
              opacity: 0.4
            }}
          />
        </div>

        {/* Title */}
        <h1 
          className="text-3xl font-light text-center mb-6"
          style={{
            color: '#2B5F4D',
            textShadow: '0 2px 12px rgba(143, 214, 148, 0.2)',
            letterSpacing: '0.02em',
            animation: 'fade-in-up 1s ease-out 0.3s both'
          }}
        >
          A moment of calm
        </h1>

        {/* Message card */}
        <div 
          className="rounded-[24px] p-6 mb-8 backdrop-blur-lg border max-w-[320px]"
          style={{
            background: 'rgba(255, 255, 255, 0.7)',
            borderColor: 'rgba(143, 214, 148, 0.3)',
            boxShadow: '0 4px 24px rgba(75, 133, 86, 0.12)',
            animation: 'fade-in-up 1s ease-out 0.5s both'
          }}
        >
          <div className="space-y-4">
            {/* Icon indicator */}
            <div className="flex justify-center">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(168, 216, 255, 0.2) 0%, rgba(143, 214, 148, 0.15) 100%)',
                  border: '1.5px solid rgba(126, 200, 227, 0.3)',
                  boxShadow: '0 4px 16px rgba(126, 200, 227, 0.15)'
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="3" fill="#6DB876" opacity="0.6" />
                  <circle 
                    cx="12" 
                    cy="12" 
                    r="7" 
                    stroke="#7EC8E3" 
                    strokeWidth="2" 
                    strokeDasharray="2 3"
                    opacity="0.5"
                  >
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      from="0 12 12"
                      to="360 12 12"
                      dur="20s"
                      repeatCount="indefinite"
                    />
                  </circle>
                </svg>
              </div>
            </div>

            {/* Detection message */}
            <div className="text-center space-y-3">
              <p 
                className="text-sm leading-relaxed"
                style={{ color: '#4A8556', opacity: 0.9 }}
              >
                {pressureMessages[detectedPressure]}
              </p>
              <p 
                className="text-sm leading-relaxed"
                style={{ color: '#6DB876', opacity: 0.85 }}
              >
                We've prepared a familiar comfort environment for you—
                <span style={{ color: '#2B5F4D', fontWeight: 500 }}> {atmosphereName}</span>.
              </p>
            </div>

            {/* Breathing indicator */}
            <div className="flex justify-center pt-2">
              <div className="relative w-16 h-16">
                <div 
                  className="absolute inset-0 rounded-full border-2 opacity-20"
                  style={{ 
                    borderColor: '#7EC8E3',
                    animation: 'breathe 6s ease-in-out infinite'
                  }}
                />
                <div 
                  className="absolute inset-2 rounded-full border-2 opacity-15"
                  style={{ 
                    borderColor: '#8FD694',
                    animation: 'breathe 6s ease-in-out infinite',
                    animationDelay: '1s'
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-[10px] uppercase tracking-wide" style={{ color: '#6DB876', opacity: 0.6 }}>
                    Breathe
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enter button */}
        <div 
          className="w-full max-w-[280px]"
          style={{
            animation: 'fade-in-up 1s ease-out 0.7s both'
          }}
        >
          <ReverieButton
            variant="aurora"
            size="lg"
            onClick={onEnter}
            className="w-full"
          >
            <span className="flex items-center justify-center gap-2">
              <span>Enter Atmosphere</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="opacity-70">
                <path 
                  d="M6 3L11 8L6 13" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </ReverieButton>
        </div>

        {/* Gentle reminder */}
        <p 
          className="text-xs text-center mt-6 px-8"
          style={{ 
            color: '#8FD694', 
            opacity: 0.7,
            animation: 'fade-in 1.5s ease-out 1s both'
          }}
        >
          Take as long as you need. You're safe here.
        </p>
      </div>

      {/* Animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes gentle-pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.7;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.85;
          }
        }

        @keyframes curtain-left {
          0%, 100% {
            transform: translateX(0) scaleX(1);
          }
          50% {
            transform: translateX(-8px) scaleX(0.98);
          }
        }

        @keyframes curtain-right {
          0%, 100% {
            transform: translateX(0) scaleX(1);
          }
          50% {
            transform: translateX(8px) scaleX(0.98);
          }
        }

        @keyframes curtain-fold {
          0%, 100% {
            transform: scaleY(1) translateY(0);
            opacity: 0.1;
          }
          50% {
            transform: scaleY(1.02) translateY(-2px);
            opacity: 0.15;
          }
        }

        @keyframes light-ray {
          0%, 100% {
            opacity: 0.1;
            transform: skewX(-20deg) translateY(0);
          }
          50% {
            opacity: 0.15;
            transform: skewX(-20deg) translateY(-10px);
          }
        }

        @keyframes float-particle {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 0.2;
          }
          25% {
            transform: translate(10px, -30px) scale(1.2);
            opacity: 0.4;
          }
          50% {
            transform: translate(-5px, -60px) scale(0.9);
            opacity: 0.3;
          }
          75% {
            transform: translate(15px, -90px) scale(1.1);
            opacity: 0.5;
          }
          100% {
            transform: translate(0, -120px) scale(0.8);
            opacity: 0;
          }
        }

        @keyframes drift {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(100vw);
          }
        }

        @keyframes breathe {
          0%, 100% {
            transform: scale(1);
            opacity: 0.2;
          }
          50% {
            transform: scale(1.3);
            opacity: 0.3;
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}} />
    </div>
  );
}
