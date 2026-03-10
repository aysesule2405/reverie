import React, { useState } from 'react';
import { ReverieButton } from './ReverieButton';
import { GhibliBackground } from './GhibliBackground';

interface ProfileSetupScreenProps {
  onComplete?: (profile: UserProfile) => void;
  onBack?: () => void;
}

export interface UserProfile {
  name: string;
  ageRange: string;
  environments: string[];
  sensitivityLevel: string;
  sounds: string[];
}

type Environment = {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  gradient: string;
};

type Sound = {
  id: string;
  label: string;
  icon: React.ReactNode;
};

const environments: Environment[] = [
  { 
    id: 'nature', 
    label: 'Nature', 
    icon: (
      <div 
        className="w-8 h-8 rounded-full flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, #8FD694 0%, #A8E6A3 100%)',
          boxShadow: '0 2px 8px rgba(143, 214, 148, 0.3)'
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 1C8 1 6 2.5 6 5C6 6.5 7 7.5 8 7.5C9 7.5 10 6.5 10 5C10 2.5 8 1 8 1Z" fill="white" opacity="0.9"/>
          <path d="M5 6C5 6 3.5 7 3.5 9C3.5 10 4.5 10.5 5.5 10.5C6.5 10.5 7 10 7 9C7 7 5 6 5 6Z" fill="white" opacity="0.7"/>
          <path d="M11 6C11 6 12.5 7 12.5 9C12.5 10 11.5 10.5 10.5 10.5C9.5 10.5 9 10 9 9C9 7 11 6 11 6Z" fill="white" opacity="0.7"/>
          <rect x="7" y="10" width="2" height="5" rx="0.5" fill="white" opacity="0.6"/>
        </svg>
      </div>
    ),
    color: '#8FD694',
    gradient: 'linear-gradient(135deg, rgba(143, 214, 148, 0.2), rgba(168, 230, 163, 0.15))'
  },
  { 
    id: 'sunset', 
    label: 'Sunset Room', 
    icon: (
      <div 
        className="w-8 h-8 rounded-full flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, #FFB088 0%, #FFC8A0 100%)',
          boxShadow: '0 2px 8px rgba(255, 176, 136, 0.3)'
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="10" r="3" fill="white" opacity="0.9"/>
          <path d="M8 13L8 15" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
          <path d="M4 10L2 10" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
          <path d="M12 10L14 10" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
          <path d="M2 13L14 13" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.8"/>
        </svg>
      </div>
    ),
    color: '#FFB088',
    gradient: 'linear-gradient(135deg, rgba(255, 176, 136, 0.2), rgba(255, 200, 160, 0.15))'
  },
  { 
    id: 'library', 
    label: 'Quiet Library', 
    icon: (
      <div 
        className="w-8 h-8 rounded-full flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, #A8D8FF 0%, #7EC8E3 100%)',
          boxShadow: '0 2px 8px rgba(168, 216, 255, 0.3)'
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <rect x="3" y="3" width="3" height="11" rx="0.5" fill="white" opacity="0.9"/>
          <rect x="6.5" y="2" width="3" height="12" rx="0.5" fill="white" opacity="0.7"/>
          <rect x="10" y="4" width="3" height="10" rx="0.5" fill="white" opacity="0.8"/>
          <rect x="2.5" y="13.5" width="11" height="1" rx="0.5" fill="white" opacity="0.6"/>
        </svg>
      </div>
    ),
    color: '#A8D8FF',
    gradient: 'linear-gradient(135deg, rgba(168, 216, 255, 0.2), rgba(126, 200, 227, 0.15))'
  },
  { 
    id: 'bedroom', 
    label: 'Childhood Bedroom', 
    icon: (
      <div 
        className="w-8 h-8 rounded-full flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, #E8C4F0 0%, #D2B4DC 100%)',
          boxShadow: '0 2px 8px rgba(232, 196, 240, 0.3)'
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <rect x="2" y="8" width="12" height="6" rx="1" fill="white" opacity="0.9"/>
          <rect x="2" y="6" width="12" height="2" rx="0.5" fill="white" opacity="0.7"/>
          <circle cx="4.5" cy="4" r="1.5" fill="white" opacity="0.8"/>
          <circle cx="11.5" cy="4" r="1.5" fill="white" opacity="0.8"/>
          <rect x="1.5" y="13.5" width="1" height="1.5" rx="0.3" fill="white" opacity="0.6"/>
          <rect x="13.5" y="13.5" width="1" height="1.5" rx="0.3" fill="white" opacity="0.6"/>
        </svg>
      </div>
    ),
    color: '#E8C4F0',
    gradient: 'linear-gradient(135deg, rgba(232, 196, 240, 0.2), rgba(210, 180, 220, 0.15))'
  },
  { 
    id: 'internet', 
    label: 'Early Internet Room', 
    icon: (
      <div 
        className="w-8 h-8 rounded-full flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, #7EC8E3 0%, #A8D8FF 100%)',
          boxShadow: '0 2px 8px rgba(126, 200, 227, 0.3)'
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <rect x="2" y="3" width="12" height="8" rx="1" fill="white" opacity="0.9"/>
          <rect x="3.5" y="4.5" width="9" height="5" rx="0.3" fill="white" opacity="0.3"/>
          <rect x="6" y="11" width="4" height="2" rx="0.5" fill="white" opacity="0.7"/>
          <rect x="4" y="13" width="8" height="0.5" rx="0.25" fill="white" opacity="0.8"/>
        </svg>
      </div>
    ),
    color: '#7EC8E3',
    gradient: 'linear-gradient(135deg, rgba(126, 200, 227, 0.2), rgba(168, 216, 255, 0.15))'
  },
];

const sounds: Sound[] = [
  { 
    id: 'nature', 
    label: 'Nature Sounds', 
    icon: (
      <div 
        className="w-8 h-8 rounded-full flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, #7EC8E3 0%, #A8D8FF 100%)',
          boxShadow: '0 2px 8px rgba(126, 200, 227, 0.3)'
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 2C8 2 5 4 5 7C5 9 6.5 10.5 8 10.5C9.5 10.5 11 9 11 7C11 4 8 2 8 2Z" fill="white" opacity="0.9"/>
          <path d="M8 10.5C8 10.5 6 11.5 6 13C6 14 6.89 14.5 8 14.5C9.11 14.5 10 14 10 13C10 11.5 8 10.5 8 10.5Z" fill="white" opacity="0.7"/>
        </svg>
      </div>
    )
  },
  { 
    id: 'quiet', 
    label: 'Quiet Room Tone', 
    icon: (
      <div 
        className="w-8 h-8 rounded-full flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, #E8C4F0 0%, #D2B4DC 100%)',
          boxShadow: '0 2px 8px rgba(232, 196, 240, 0.3)'
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="6" fill="white" opacity="0.3"/>
          <circle cx="8" cy="8" r="4" fill="white" opacity="0.5"/>
          <circle cx="8" cy="8" r="2" fill="white" opacity="0.9"/>
        </svg>
      </div>
    )
  },
  { 
    id: 'music', 
    label: 'Soft Music', 
    icon: (
      <div 
        className="w-8 h-8 rounded-full flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, #FFB088 0%, #FFC8A0 100%)',
          boxShadow: '0 2px 8px rgba(255, 176, 136, 0.3)'
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M12 2L6 3.5V11C6 12.1 5.1 13 4 13C2.9 13 2 12.1 2 11C2 9.9 2.9 9 4 9C4.5 9 5 9.2 5 9.4V4.5L11 3.3V9C11 10.1 10.1 11 9 11C7.9 11 7 10.1 7 9C7 7.9 7.9 7 9 7C9.5 7 10 7.2 10 7.4V2H12Z" fill="white" opacity="0.9"/>
        </svg>
      </div>
    )
  },
  { 
    id: 'wind', 
    label: 'Wind Ambience', 
    icon: (
      <div 
        className="w-8 h-8 rounded-full flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, #8FD694 0%, #A8E6A3 100%)',
          boxShadow: '0 2px 8px rgba(143, 214, 148, 0.3)'
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M2 5H8C9.1 5 10 4.1 10 3C10 1.9 9.1 1 8 1C7.4 1 6.8 1.3 6.5 1.7" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.9"/>
          <path d="M2 8H11C12.1 8 13 8.9 13 10C13 11.1 12.1 12 11 12C10.4 12 9.8 11.7 9.5 11.3" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
          <path d="M2 11H6" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.8"/>
        </svg>
      </div>
    )
  },
];

const ageRanges = ['18-24', '25-34', '35-44', '45-54', '55+'];
const sensitivityLevels = [
  { id: 'low', label: 'Low', description: 'I enjoy more stimulation' },
  { id: 'medium', label: 'Medium', description: 'Balanced is best' },
  { id: 'high', label: 'High', description: 'I prefer minimal stimulation' },
];

export function ProfileSetupScreen({ onComplete, onBack }: ProfileSetupScreenProps) {
  const [name, setName] = useState('');
  const [ageRange, setAgeRange] = useState('');
  const [selectedEnvironments, setSelectedEnvironments] = useState<string[]>([]);
  const [sensitivityLevel, setSensitivityLevel] = useState('');
  const [selectedSounds, setSelectedSounds] = useState<string[]>([]);

  const toggleEnvironment = (id: string) => {
    setSelectedEnvironments(prev => 
      prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
    );
  };

  const toggleSound = (id: string) => {
    setSelectedSounds(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const handleSubmit = () => {
    const profile: UserProfile = {
      name,
      ageRange,
      environments: selectedEnvironments,
      sensitivityLevel,
      sounds: selectedSounds,
    };
    onComplete?.(profile);
  };

  const isComplete = name && ageRange && selectedEnvironments.length > 0 && sensitivityLevel && selectedSounds.length > 0;

  return (
    <div className="relative w-full max-w-[390px] min-h-[844px] bg-[#F7FFF7] overflow-hidden">
      {/* Warm comfort background */}
      <GhibliBackground variant="comfort" withTexture={true} withParticles={false} />

      {/* Scrollable Content */}
      <div className="relative z-10 min-h-[844px] overflow-y-auto">
        <div className="px-6 py-10 pb-24">
          
          {/* Back Button */}
          {onBack && (
            <button 
              onClick={onBack}
              className="flex items-center gap-2 text-[#4A8556] hover:text-[#2B5F4D] opacity-80 hover:opacity-100 transition-all mb-6 press-scale"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M12 4L6 10L12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-sm font-medium">Back</span>
            </button>
          )}

          {/* Header */}
          <div className="text-center mb-10 fade-in-up">
            <h1 
              className="text-3xl font-light tracking-wide mb-3"
              style={{
                color: '#2B5F4D',
                textShadow: '0 2px 8px rgba(143, 214, 148, 0.15)',
              }}
            >
              Tell us what helps you relax
            </h1>
            <p className="text-sm leading-relaxed" style={{ color: '#4A8556', opacity: 0.85 }}>
              We'll personalize your memory atmospheres
            </p>
          </div>

          {/* Form Sections */}
          <div className="space-y-8">
            
            {/* Name Input */}
            <div className="space-y-3 fade-in-up" style={{ animationDelay: '0.1s' }}>
              <label 
                htmlFor="name" 
                className="block text-sm font-medium pl-1"
                style={{ color: '#2B5F4D' }}
              >
                What should we call you?
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full px-5 py-4 rounded-[20px] border-2 transition-all duration-300 focus:outline-none"
                style={{
                  background: 'rgba(255, 255, 255, 0.7)',
                  backdropFilter: 'blur(10px)',
                  borderColor: 'rgba(143, 214, 148, 0.25)',
                  color: '#2B5F4D',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'rgba(168, 216, 255, 0.6)';
                  e.target.style.boxShadow = '0 8px 24px rgba(168, 216, 255, 0.15)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(143, 214, 148, 0.25)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* Age Range */}
            <div className="space-y-3 fade-in-up" style={{ animationDelay: '0.2s' }}>
              <label className="block text-sm font-medium pl-1" style={{ color: '#2B5F4D' }}>
                Age range
              </label>
              <div className="grid grid-cols-3 gap-2">
                {ageRanges.map((range) => (
                  <button
                    key={range}
                    onClick={() => setAgeRange(range)}
                    className="px-4 py-3 rounded-[16px] border-2 transition-all duration-300 text-sm font-medium hover-lift press-scale"
                    style={{
                      background: ageRange === range 
                        ? 'linear-gradient(135deg, rgba(168, 216, 255, 0.25), rgba(126, 200, 227, 0.2))'
                        : 'rgba(255, 255, 255, 0.6)',
                      backdropFilter: 'blur(10px)',
                      borderColor: ageRange === range ? '#A8D8FF' : 'rgba(143, 214, 148, 0.2)',
                      color: ageRange === range ? '#2B5F4D' : '#4A8556',
                      boxShadow: ageRange === range ? '0 4px 16px rgba(168, 216, 255, 0.2)' : 'none'
                    }}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>

            {/* Preferred Environments */}
            <div className="space-y-3 fade-in-up" style={{ animationDelay: '0.3s' }}>
              <label className="block text-sm font-medium pl-1" style={{ color: '#2B5F4D' }}>
                Preferred calming environments
              </label>
              <p className="text-xs pl-1" style={{ color: '#4A8556', opacity: 0.75 }}>
                Select all that resonate with you
              </p>
              <div className="grid grid-cols-2 gap-3">
                {environments.map((env) => (
                  <button
                    key={env.id}
                    onClick={() => toggleEnvironment(env.id)}
                    className="p-4 rounded-[20px] border-2 transition-all duration-300 text-left hover-lift press-scale"
                    style={{
                      background: selectedEnvironments.includes(env.id) 
                        ? env.gradient
                        : 'rgba(255, 255, 255, 0.6)',
                      backdropFilter: 'blur(10px)',
                      borderColor: selectedEnvironments.includes(env.id) ? env.color : 'rgba(143, 214, 148, 0.2)',
                      boxShadow: selectedEnvironments.includes(env.id) 
                        ? `0 4px 16px ${env.color}40` 
                        : 'none'
                    }}
                  >
                    <div className="mb-2">{env.icon}</div>
                    <div className="text-sm font-medium" style={{ color: '#2B5F4D' }}>
                      {env.label}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Sensory Sensitivity */}
            <div className="space-y-3 fade-in-up" style={{ animationDelay: '0.4s' }}>
              <label className="block text-sm font-medium pl-1" style={{ color: '#2B5F4D' }}>
                Sensory sensitivity level
              </label>
              <div className="space-y-2">
                {sensitivityLevels.map((level) => (
                  <button
                    key={level.id}
                    onClick={() => setSensitivityLevel(level.id)}
                    className="w-full p-4 rounded-[20px] border-2 transition-all duration-300 text-left hover-lift press-scale"
                    style={{
                      background: sensitivityLevel === level.id 
                        ? 'linear-gradient(135deg, rgba(143, 214, 148, 0.25), rgba(168, 230, 163, 0.2))'
                        : 'rgba(255, 255, 255, 0.6)',
                      backdropFilter: 'blur(10px)',
                      borderColor: sensitivityLevel === level.id ? '#8FD694' : 'rgba(143, 214, 148, 0.2)',
                      boxShadow: sensitivityLevel === level.id ? '0 4px 16px rgba(143, 214, 148, 0.2)' : 'none'
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium mb-0.5" style={{ color: '#2B5F4D' }}>
                          {level.label}
                        </div>
                        <div className="text-xs" style={{ color: '#4A8556', opacity: 0.8 }}>
                          {level.description}
                        </div>
                      </div>
                      {sensitivityLevel === level.id && (
                        <div className="flex-shrink-0 ml-3">
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <circle cx="10" cy="10" r="9" fill="#8FD694" opacity="0.2"/>
                            <path d="M6 10L9 13L14 7" stroke="#5A9A6B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Preferred Sounds */}
            <div className="space-y-3 fade-in-up" style={{ animationDelay: '0.5s' }}>
              <label className="block text-sm font-medium pl-1" style={{ color: '#2B5F4D' }}>
                Preferred atmosphere sounds
              </label>
              <p className="text-xs pl-1" style={{ color: '#4A8556', opacity: 0.75 }}>
                Select all that calm you
              </p>
              <div className="grid grid-cols-2 gap-3">
                {sounds.map((sound) => (
                  <button
                    key={sound.id}
                    onClick={() => toggleSound(sound.id)}
                    className="p-4 rounded-[20px] border-2 transition-all duration-300 text-left hover-lift press-scale"
                    style={{
                      background: selectedSounds.includes(sound.id) 
                        ? 'linear-gradient(135deg, rgba(168, 216, 255, 0.25), rgba(126, 200, 227, 0.2))'
                        : 'rgba(255, 255, 255, 0.6)',
                      backdropFilter: 'blur(10px)',
                      borderColor: selectedSounds.includes(sound.id) ? '#A8D8FF' : 'rgba(143, 214, 148, 0.2)',
                      boxShadow: selectedSounds.includes(sound.id) 
                        ? '0 4px 16px rgba(168, 216, 255, 0.2)' 
                        : 'none'
                    }}
                  >
                    <div className="mb-2">{sound.icon}</div>
                    <div className="text-sm font-medium" style={{ color: '#2B5F4D' }}>
                      {sound.label}
                    </div>
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Fixed Bottom Action */}
      <div 
        className="fixed bottom-0 left-0 right-0 z-20 px-6 py-6 max-w-[390px] mx-auto"
        style={{
          background: 'linear-gradient(to top, rgba(247, 255, 247, 0.98) 70%, transparent)',
          backdropFilter: 'blur(10px)'
        }}
      >
        <ReverieButton 
          variant="primary" 
          size="lg" 
          className="w-full"
          onClick={handleSubmit}
          disabled={!isComplete}
        >
          Complete Profile
        </ReverieButton>
      </div>

      {/* Animation Styles */}
      <style dangerouslySetInnerHTML={{__html: `
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

        .fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }
      `}} />
    </div>
  );
}