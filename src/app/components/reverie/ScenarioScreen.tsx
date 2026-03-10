import React, { useState, useEffect } from 'react';
import { PixelIcon } from './PixelIcon';
import { ReverieButton } from './ReverieButton';
import { GhibliBackground } from './GhibliBackground';

interface ScenarioScreenProps {
  onActivate?: () => void;
}

export function ScenarioScreen({ onActivate }: ScenarioScreenProps) {
  const [detected, setDetected] = useState(false);

  // Trigger detection animation after mount
  useEffect(() => {
    const timer = setTimeout(() => setDetected(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full max-w-[390px] min-h-[844px] bg-[#F7FFF7] overflow-hidden">
      {/* Ghibli-inspired atmospheric background */}
      <GhibliBackground variant="comfort" withTexture={true} withParticles={false} />

      {/* Content */}
      <div className="relative z-10 min-h-[844px] flex flex-col px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <button className="flex items-center gap-2 text-[#4A8556] hover:text-[#2B5F4D] opacity-80 hover:opacity-100 transition-all mb-6">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12 4L6 10L12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-sm font-medium">Back</span>
          </button>

          <div className="space-y-2">
            <h1 
              className="text-2xl font-light tracking-wide"
              style={{
                color: '#2B5F4D',
                textShadow: '0 2px 8px rgba(143, 214, 148, 0.15)',
              }}
            >
              University Study Environment
            </h1>
            <p className="text-sm" style={{ color: '#6DB876', opacity: 0.8 }}>
              Scenario Detection
            </p>
          </div>
        </div>

        {/* Sensory Overload Visualization */}
        <div className="relative mb-8 h-72 rounded-[24px] overflow-hidden">
          {/* Base card */}
          <div 
            className="absolute inset-0 backdrop-blur-sm border"
            style={{
              background: 'rgba(255, 255, 255, 0.02)',
              borderColor: 'rgba(255, 255, 255, 0.08)'
            }}
          />

          {/* Chaotic sensory elements - representing crowded study space */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Multiple overlapping "people" shapes */}
            <div className="absolute top-8 left-6 w-12 h-12 rounded-full bg-[#6A7FDB] opacity-20 blur-sm" style={{ animation: 'chaos-pulse 2s ease-in-out infinite' }} />
            <div className="absolute top-12 left-20 w-14 h-14 rounded-full bg-[#A9B8FF] opacity-20 blur-sm" style={{ animation: 'chaos-pulse 2.3s ease-in-out infinite' }} />
            <div className="absolute top-6 right-16 w-10 h-10 rounded-full bg-[#F6D6FF] opacity-20 blur-sm" style={{ animation: 'chaos-pulse 1.8s ease-in-out infinite' }} />
            <div className="absolute top-16 right-8 w-13 h-13 rounded-full bg-[#6A7FDB] opacity-20 blur-sm" style={{ animation: 'chaos-pulse 2.5s ease-in-out infinite' }} />
            
            {/* Sound waves/noise lines */}
            <div className="absolute top-1/4 left-0 right-0">
              {[...Array(8)].map((_, i) => (
                <div 
                  key={`wave-${i}`}
                  className="h-px bg-gradient-to-r from-transparent via-[#A9B8FF] to-transparent opacity-10 mb-2"
                  style={{ 
                    animation: `wave-move ${1 + i * 0.2}s linear infinite`,
                    animationDelay: `${i * 0.1}s`
                  }}
                />
              ))}
            </div>

            {/* Laptop/desk items icons */}
            <div className="absolute bottom-20 left-8 opacity-25" style={{ animation: 'float-item 3s ease-in-out infinite' }}>
              <PixelIcon type="book" size={32} color="#A9B8FF" />
            </div>
            <div className="absolute bottom-24 right-12 opacity-25" style={{ animation: 'float-item 2.5s ease-in-out infinite reverse' }}>
              <PixelIcon type="book" size={28} color="#F6D6FF" />
            </div>
            <div className="absolute bottom-32 left-1/3 opacity-25" style={{ animation: 'float-item 3.2s ease-in-out infinite' }}>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <rect x="4" y="8" width="24" height="16" rx="2" stroke="#6A7FDB" strokeWidth="2" opacity="0.6"/>
                <rect x="6" y="10" width="20" height="12" fill="#6A7FDB" opacity="0.2"/>
                <rect x="8" y="24" width="16" height="2" fill="#6A7FDB" opacity="0.4"/>
              </svg>
            </div>

            {/* Chatter/conversation bubbles */}
            <div className="absolute top-1/3 right-1/4 opacity-20">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path d="M8 12C8 9.79086 9.79086 8 12 8H28C30.2091 8 32 9.79086 32 12V24C32 26.2091 30.2091 28 28 28H16L8 34V12Z" fill="#FFB8A3" opacity="0.6"/>
              </svg>
            </div>
            <div className="absolute top-1/2 left-1/4 opacity-15">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                <path d="M6 10C6 7.79086 7.79086 6 10 6H26C28.2091 6 30 7.79086 30 10V22C30 24.2091 28.2091 26 26 26H14L6 32V10Z" fill="#A9B8FF" opacity="0.6"/>
              </svg>
            </div>

            {/* Movement/distraction indicators */}
            {[...Array(12)].map((_, i) => (
              <div
                key={`distract-${i}`}
                className="absolute w-1 h-1 bg-[#FFB8A3] rounded-full opacity-30"
                style={{
                  top: `${15 + Math.random() * 60}%`,
                  left: `${10 + Math.random() * 80}%`,
                  animation: `float-distract ${2 + Math.random() * 2}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              />
            ))}

            {/* Overlay gradient for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(15,18,36,0.8)] via-transparent to-transparent" />
          </div>

          {/* Environment label */}
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-center gap-3 text-[#F6D6FF] opacity-70">
              <div className="flex-1 space-y-1">
                <p className="text-xs uppercase tracking-wide opacity-60">Current Environment</p>
                <p className="text-sm font-medium">Crowded Library • 42 people • High noise</p>
              </div>
            </div>
          </div>
        </div>

        {/* Detection Alert */}
        <div 
          className={`
            rounded-[24px] p-6 mb-6 backdrop-blur-lg border transition-all duration-700
            ${detected 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-4'
            }
          `}
          style={{
            background: 'linear-gradient(135deg, rgba(255, 184, 163, 0.12), rgba(106, 127, 219, 0.08))',
            borderColor: 'rgba(255, 184, 163, 0.3)',
            boxShadow: '0 0 30px rgba(255, 184, 163, 0.2)'
          }}
        >
          <div className="flex items-start gap-4">
            {/* Alert icon */}
            <div className="flex-shrink-0 mt-1">
              <div 
                className="relative w-12 h-12 rounded-full flex items-center justify-center"
                style={{
                  background: 'rgba(255, 184, 163, 0.15)',
                  border: '2px solid rgba(255, 184, 163, 0.4)'
                }}
              >
                <div 
                  className="absolute inset-0 rounded-full blur-lg opacity-40 animate-pulse"
                  style={{ background: '#FFB8A3' }}
                />
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="relative z-10">
                  <path d="M12 2C12 2 9.5 4 9.5 8C9.5 10 10 12 12 12C14 12 14.5 10 14.5 8C14.5 4 12 2 12 2Z" fill="#FFB8A3"/>
                  <path d="M12 16C10.3431 16 9 17.3431 9 19C9 20.6569 10.3431 22 12 22C13.6569 22 15 20.6569 15 19C15 17.3431 13.6569 16 12 16Z" fill="#FFB8A3"/>
                  <circle cx="12" cy="14" r="1" fill="#FFB8A3"/>
                </svg>
              </div>
            </div>

            {/* Alert content */}
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#FFB8A3] rounded-full animate-pulse" />
                <h3 
                  className="text-base font-medium"
                  style={{ 
                    color: '#FFB8A3',
                    textShadow: '0 0 20px rgba(255, 184, 163, 0.4)'
                  }}
                >
                  Cognitive Overload Detected
                </h3>
              </div>
              <p className="text-sm text-[#A9B8FF] opacity-90 leading-relaxed">
                Your environment shows high sensory input levels. Multiple sound sources, visual distractions, and crowding detected.
              </p>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-2 pt-3">
                <div className="text-center py-2 rounded-lg bg-[rgba(255,255,255,0.04)]">
                  <p className="text-xs text-[#FFB8A3] opacity-60 mb-1">Noise</p>
                  <p className="text-lg font-medium text-[#FFB8A3]">87%</p>
                </div>
                <div className="text-center py-2 rounded-lg bg-[rgba(255,255,255,0.04)]">
                  <p className="text-xs text-[#FFB8A3] opacity-60 mb-1">Crowd</p>
                  <p className="text-lg font-medium text-[#FFB8A3]">73%</p>
                </div>
                <div className="text-center py-2 rounded-lg bg-[rgba(255,255,255,0.04)]">
                  <p className="text-xs text-[#FFB8A3] opacity-60 mb-1">Stress</p>
                  <p className="text-lg font-medium text-[#FFB8A3]">81%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Suggestion Card */}
        <div 
          className={`
            rounded-[24px] p-6 backdrop-blur-lg border transition-all duration-700 delay-300
            ${detected 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-4'
            }
          `}
          style={{
            background: 'linear-gradient(135deg, rgba(106, 127, 219, 0.12), rgba(169, 184, 255, 0.08))',
            borderColor: 'rgba(106, 127, 219, 0.3)'
          }}
        >
          <div className="space-y-4">
            {/* Icon and title */}
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{
                    background: 'rgba(106, 127, 219, 0.2)',
                    border: '1px solid rgba(106, 127, 219, 0.4)'
                  }}
                >
                  <PixelIcon type="sparkle" size={20} color="#6A7FDB" />
                </div>
              </div>
              <div className="flex-1">
                <p className="text-xs uppercase tracking-wide text-[#A9B8FF] opacity-60 mb-1">
                  Suggested Action
                </p>
                <h3 className="text-base font-medium text-[#F6D6FF]">
                  Activate Early Internet Comfort Mode
                </h3>
              </div>
            </div>

            {/* Benefits */}
            <div className="space-y-2 pl-13">
              <div className="flex items-start gap-2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5 flex-shrink-0">
                  <path d="M3 8L6 11L13 4" stroke="#6A7FDB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <p className="text-sm text-[#A9B8FF] opacity-90">
                  Reduce sensory input with familiar visuals
                </p>
              </div>
              <div className="flex items-start gap-2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5 flex-shrink-0">
                  <path d="M3 8L6 11L13 4" stroke="#6A7FDB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <p className="text-sm text-[#A9B8FF] opacity-90">
                  Create nostalgic comfort environment
                </p>
              </div>
              <div className="flex items-start gap-2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5 flex-shrink-0">
                  <path d="M3 8L6 11L13 4" stroke="#6A7FDB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <p className="text-sm text-[#A9B8FF] opacity-90">
                  Restore focus and calm through Windows 98 aesthetics
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Action Button */}
        <div 
          className={`
            pt-6 pb-6 transition-all duration-700 delay-500
            ${detected 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-4'
            }
          `}
        >
          <ReverieButton 
            variant="aurora" 
            size="lg" 
            className="w-full"
            onClick={onActivate}
          >
            <div className="flex items-center justify-center gap-3">
              <PixelIcon type="sparkle" size={20} color="#F6D6FF" />
              <span>Activate Atmosphere</span>
            </div>
          </ReverieButton>

          {/* Secondary action */}
          <button className="w-full mt-3 py-3 text-sm text-[#A9B8FF] opacity-60 hover:opacity-100 transition-opacity">
            Dismiss suggestion
          </button>
        </div>
      </div>

      {/* Animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes chaos-pulse {
          0%, 100% {
            opacity: 0.15;
            transform: scale(1);
          }
          50% {
            opacity: 0.3;
            transform: scale(1.1);
          }
        }
        
        @keyframes wave-move {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          50% {
            opacity: 0.15;
          }
          100% {
            transform: translateX(100%);
            opacity: 0;
          }
        }
        
        @keyframes float-item {
          0%, 100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(5px, -8px);
          }
        }
        
        @keyframes float-distract {
          0%, 100% {
            transform: translate(0, 0);
            opacity: 0.2;
          }
          50% {
            transform: translate(15px, -20px);
            opacity: 0.4;
          }
        }
      `}} />
    </div>
  );
}