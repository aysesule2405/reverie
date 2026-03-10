import React, { useState } from 'react';
import { ReverieButton } from './ReverieButton';
import { EnvironmentCard } from './EnvironmentCard';
import { PixelIcon } from './PixelIcon';
import { GhibliBackground } from './GhibliBackground';
import {
  BedroomIllustration,
  InternetIllustration,
  LibraryIllustration,
  NatureIllustration,
  AfterSchoolIllustration,
  MusicIllustration
} from './EnvironmentIllustrations';

interface OnboardingScreenProps {
  onContinue?: (selectedEnvironments: string[]) => void;
}

export function OnboardingScreen({ onContinue }: OnboardingScreenProps) {
  const [selectedEnvironments, setSelectedEnvironments] = useState<string[]>([]);

  const environments = [
    {
      id: 'meadow',
      title: 'Spring meadow',
      gradient: 'linear-gradient(135deg, #8FD694, #A8E6A3)',
      icon: <PixelIcon type="sparkle" size={20} color="#6DB876" />,
      illustration: <BedroomIllustration />
    },
    {
      id: 'lake',
      title: 'Calm lakeside',
      gradient: 'linear-gradient(135deg, #A8D8FF, #7EC8E3)',
      icon: <PixelIcon type="moon" size={20} color="#5BA5C4" />,
      illustration: <InternetIllustration />
    },
    {
      id: 'garden',
      title: 'Garden retreat',
      gradient: 'linear-gradient(135deg, #C8E6C9, #8FD694)',
      icon: <PixelIcon type="heart" size={20} color="#6DB876" />,
      illustration: <LibraryIllustration />
    },
    {
      id: 'sunset',
      title: 'Golden hour',
      gradient: 'linear-gradient(135deg, #FFF3A3, #FFE870)',
      icon: <PixelIcon type="sun" size={20} color="#D4A74A" />,
      illustration: <NatureIllustration />
    },
    {
      id: 'sky',
      title: 'Open sky',
      gradient: 'linear-gradient(135deg, #B8E0FF, #A8D8FF)',
      icon: <PixelIcon type="star" size={20} color="#7EC8E3" />,
      illustration: <AfterSchoolIllustration />
    },
    {
      id: 'nature',
      title: 'Nature sounds',
      gradient: 'linear-gradient(135deg, #A8E6A3, #FFF3A3)',
      icon: <PixelIcon type="music" size={20} color="#6DB876" />,
      illustration: <MusicIllustration />
    }
  ];

  const toggleEnvironment = (id: string) => {
    setSelectedEnvironments(prev => 
      prev.includes(id) 
        ? prev.filter(envId => envId !== id)
        : [...prev, id]
    );
  };

  const handleContinue = () => {
    onContinue?.(selectedEnvironments);
  };

  return (
    <div className="relative w-full max-w-[390px] min-h-screen overflow-hidden bg-[#F7FFF7]">
      {/* Ghibli-inspired atmospheric background */}
      <GhibliBackground variant="morning" withTexture={true} withParticles={false} />

      {/* Content */}
      <div className="relative z-10 px-6 py-8 pb-32 min-h-screen flex flex-col">
        {/* Header */}
        <div className="mb-8">
          {/* Progress indicator */}
          <div className="flex items-center gap-2 mb-6">
            <div className="h-1 flex-1 rounded-full bg-[#7EC8E3] shadow-[0_0_10px_rgba(126,200,227,0.5)]" />
            <div className="h-1 flex-1 rounded-full bg-[rgba(143,214,148,0.2)]" />
            <div className="h-1 flex-1 rounded-full bg-[rgba(143,214,148,0.2)]" />
          </div>

          {/* Title */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <PixelIcon type="heart" size={24} color="#6DB876" />
              <h1 
                className="text-2xl font-light"
                style={{
                  color: '#2B5F4D',
                  textShadow: '0 2px 8px rgba(143, 214, 148, 0.15)',
                  letterSpacing: '0.02em'
                }}
              >
                Which environments make you feel calm?
              </h1>
            </div>
            <p className="text-sm pl-8" style={{ color: '#6DB876', opacity: 0.8 }}>
              Select all that resonate with you
            </p>
          </div>
        </div>

        {/* Environment grid */}
        <div className="grid grid-cols-2 gap-4 mb-6 flex-1">
          {environments.map((env) => (
            <EnvironmentCard
              key={env.id}
              title={env.title}
              gradient={env.gradient}
              icon={env.icon}
              illustration={env.illustration}
              isSelected={selectedEnvironments.includes(env.id)}
              onClick={() => toggleEnvironment(env.id)}
            />
          ))}
        </div>

        {/* Selection count */}
        {selectedEnvironments.length > 0 && (
          <div className="text-center mb-4">
            <p className="text-xs opacity-60" style={{ color: '#7EC8E3' }}>
              {selectedEnvironments.length} {selectedEnvironments.length === 1 ? 'environment' : 'environments'} selected
            </p>
          </div>
        )}
      </div>

      {/* Fixed bottom button */}
      <div className="fixed bottom-0 left-0 right-0 z-20 px-6 pb-8 pt-6 bg-gradient-to-t from-[#F7FFF7] via-[#F7FFF7] to-transparent flex justify-center">
        <ReverieButton 
          variant={selectedEnvironments.length > 0 ? "aurora" : "ghost"}
          size="lg" 
          className="w-full max-w-[390px]"
          onClick={handleContinue}
          disabled={selectedEnvironments.length === 0}
        >
          {selectedEnvironments.length > 0 ? 'Continue' : 'Select at least one'}
        </ReverieButton>
      </div>
    </div>
  );
}