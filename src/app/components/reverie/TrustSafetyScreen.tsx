import React from 'react';
import { PixelIcon } from './PixelIcon';
import { ReverieButton } from './ReverieButton';
import { GhibliBackground } from './GhibliBackground';

interface TrustSafetyScreenProps {
  onBack?: () => void;
  onContinue?: () => void;
}

export function TrustSafetyScreen({ onBack, onContinue }: TrustSafetyScreenProps) {
  return (
    <div className="relative w-full max-w-[390px] min-h-[844px] bg-[#F7FFF7] overflow-hidden">
      {/* Ghibli-inspired background */}
      <GhibliBackground variant="comfort" withTexture={true} withParticles={false} />

      {/* Content */}
      <div className="relative z-10 min-h-[844px] flex flex-col px-6 py-10">
        {/* Header */}
        <div className="mb-10">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-[#4A8556] hover:text-[#2B5F4D] opacity-80 hover:opacity-100 transition-all mb-6"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12 4L6 10L12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-sm font-medium">Back</span>
          </button>

          <div className="space-y-3 text-center">
            {/* Shield icon with Ghibli-style glow */}
            <div className="flex justify-center mb-4">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(168, 216, 255, 0.3), rgba(126, 200, 227, 0.25))',
                  border: '1px solid rgba(168, 216, 255, 0.4)',
                  boxShadow: '0 8px 32px rgba(126, 200, 227, 0.25), inset 0 2px 8px rgba(255, 255, 255, 0.5)'
                }}
              >
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path 
                    d="M16 4L6 8V14C6 21 11 26 16 28C21 26 26 21 26 14V8L16 4Z" 
                    stroke="#5BA5C4" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    fill="rgba(168, 216, 255, 0.2)"
                  />
                  <path 
                    d="M12 16L15 19L20 13" 
                    stroke="#7EC8E3" 
                    strokeWidth="2.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            <h1 
              className="text-3xl font-light tracking-wide"
              style={{
                color: '#2B5F4D',
                textShadow: '0 2px 8px rgba(143, 214, 148, 0.15)',
              }}
            >
              Trust & Safety
            </h1>
            <p className="text-sm leading-relaxed max-w-[280px] mx-auto" style={{ color: '#4A8556' }}>
              Your wellbeing and privacy are our foundation. Here's how Reverie protects you.
            </p>
          </div>
        </div>

        {/* Safety Cards */}
        <div className="space-y-5 flex-1">
          {/* Privacy Card */}
          <div 
            className="rounded-[24px] p-6 backdrop-blur-lg border"
            style={{
              background: 'linear-gradient(135deg, rgba(168, 216, 255, 0.15), rgba(126, 200, 227, 0.08))',
              borderColor: 'rgba(168, 216, 255, 0.25)'
            }}
          >
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div 
                className="flex-shrink-0 w-14 h-14 rounded-[16px] flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(168, 216, 255, 0.25), rgba(126, 200, 227, 0.2))',
                  border: '1px solid rgba(168, 216, 255, 0.35)'
                }}
              >
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <rect x="7" y="10" width="14" height="12" rx="2" stroke="#A8D8FF" strokeWidth="2" fill="rgba(168, 216, 255, 0.15)"/>
                  <path d="M10 10V8C10 6.34315 11.3431 5 13 5H15C16.6569 5 18 6.34315 18 8V10" stroke="#7EC8E3" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="14" cy="16" r="1.5" fill="#A8D8FF"/>
                </svg>
              </div>

              {/* Content */}
              <div className="flex-1 space-y-3">
                <div>
                  <h3 className="text-lg font-medium mb-1" style={{ color: '#2B5F4D' }}>
                    Privacy
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#4A8556' }}>
                    Your emotional data remains private and local. Nothing is shared, sold, or sent to external servers.
                  </p>
                </div>

                {/* Detail points */}
                <div className="space-y-2 pl-1">
                  <div className="flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full bg-[#7EC8E3] mt-2 flex-shrink-0" />
                    <p className="text-xs leading-relaxed" style={{ color: '#4A8556', opacity: 0.85 }}>
                      All processing happens on your device
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full bg-[#7EC8E3] mt-2 flex-shrink-0" />
                    <p className="text-xs leading-relaxed" style={{ color: '#4A8556', opacity: 0.85 }}>
                      No account required, no data collection
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full bg-[#7EC8E3] mt-2 flex-shrink-0" />
                    <p className="text-xs leading-relaxed" style={{ color: '#4A8556', opacity: 0.85 }}>
                      You can delete all data at any time
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Transparency Card */}
          <div 
            className="rounded-[24px] p-6 backdrop-blur-lg border"
            style={{
              background: 'linear-gradient(135deg, rgba(143, 214, 148, 0.15), rgba(168, 230, 163, 0.08))',
              borderColor: 'rgba(143, 214, 148, 0.25)'
            }}
          >
            <div className="flex items-start gap-3">
              {/* Icon */}
              <div 
                className="flex-shrink-0 w-14 h-14 rounded-[16px] flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(143, 214, 148, 0.25), rgba(168, 230, 163, 0.2))',
                  border: '1px solid rgba(143, 214, 148, 0.35)'
                }}
              >
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <circle cx="14" cy="14" r="9" stroke="#8FD694" strokeWidth="2" fill="rgba(143, 214, 148, 0.15)"/>
                  <path d="M14 10V14" stroke="#8FD694" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="14" cy="18" r="1" fill="#5A9A6B"/>
                </svg>
              </div>

              {/* Content */}
              <div className="flex-1 space-y-3">
                <div>
                  <h3 className="text-lg font-medium mb-1" style={{ color: '#2B5F4D' }}>
                    Transparency
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#4A8556' }}>
                    Signals are estimates, not diagnoses. Reverie is a wellness tool, not a medical device.
                  </p>
                </div>

                {/* Detail points */}
                <div className="space-y-2 pl-1">
                  <div className="flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full bg-[#8FD694] mt-2 flex-shrink-0" />
                    <p className="text-xs leading-relaxed" style={{ color: '#4A8556', opacity: 0.85 }}>
                      Based on environmental sensors and patterns
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full bg-[#8FD694] mt-2 flex-shrink-0" />
                    <p className="text-xs leading-relaxed" style={{ color: '#4A8556', opacity: 0.85 }}>
                      Not a substitute for professional care
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full bg-[#8FD694] mt-2 flex-shrink-0" />
                    <p className="text-xs leading-relaxed" style={{ color: '#4A8556', opacity: 0.85 }}>
                      Open about limitations and capabilities
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* User Control Card */}
          <div 
            className="rounded-[24px] p-6 backdrop-blur-lg border"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 243, 163, 0.15), rgba(255, 232, 112, 0.08))',
              borderColor: 'rgba(255, 243, 163, 0.25)'
            }}
          >
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div 
                className="flex-shrink-0 w-14 h-14 rounded-[16px] flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 243, 163, 0.25), rgba(255, 232, 112, 0.2))',
                  border: '1px solid rgba(255, 243, 163, 0.35)'
                }}
              >
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <circle cx="14" cy="14" r="9" stroke="#FFF3A3" strokeWidth="2" fill="rgba(255, 243, 163, 0.15)"/>
                  <path d="M14 8V14L18 16" stroke="#FFE870" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M8 8L10 10" stroke="#FFF3A3" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M20 8L18 10" stroke="#FFF3A3" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>

              {/* Content */}
              <div className="flex-1 space-y-3">
                <div>
                  <h3 className="text-lg font-medium mb-1" style={{ color: '#2B5F4D' }}>
                    User Control
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#4A8556' }}>
                    Atmospheres can be turned off anytime. You're always in control of your experience.
                  </p>
                </div>

                {/* Detail points */}
                <div className="space-y-2 pl-1">
                  <div className="flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full bg-[#FFE870] mt-2 flex-shrink-0" />
                    <p className="text-xs leading-relaxed" style={{ color: '#4A8556', opacity: 0.85 }}>
                      One-tap pause or stop at any moment
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full bg-[#FFE870] mt-2 flex-shrink-0" />
                    <p className="text-xs leading-relaxed" style={{ color: '#4A8556', opacity: 0.85 }}>
                      Customize intensity and environment settings
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full bg-[#FFE870] mt-2 flex-shrink-0" />
                    <p className="text-xs leading-relaxed" style={{ color: '#4A8556', opacity: 0.85 }}>
                      No pressure, no judgment, just support
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info Card */}
          <div 
            className="rounded-[20px] p-5 backdrop-blur-lg border"
            style={{
              background: 'rgba(212, 232, 215, 0.4)',
              borderColor: 'rgba(143, 214, 148, 0.3)',
              boxShadow: '0 2px 16px rgba(75, 133, 86, 0.08)'
            }}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <PixelIcon type="heart" size={20} color="#6DB876" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium" style={{ color: '#2B5F4D' }}>
                  Designed with care
                </p>
                <p className="text-xs leading-relaxed" style={{ color: '#4A8556', opacity: 0.85 }}>
                  Reverie is built by researchers and designers who understand the importance of ethical, transparent wellness technology.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Action */}
        <div className="pt-6 pb-2">
          <ReverieButton 
            variant="primary" 
            size="lg" 
            className="w-full"
            onClick={onContinue}
          >
            I Understand
          </ReverieButton>
        </div>
      </div>
    </div>
  );
}