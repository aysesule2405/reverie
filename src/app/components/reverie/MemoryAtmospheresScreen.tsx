import React, { useState } from 'react';
import { PixelIcon } from './PixelIcon';
import { ReverieButton } from './ReverieButton';
import { GhibliBackground } from './GhibliBackground';
import springWindowImg from 'figma:asset/213de50120f0b1e6f10d449fd7d2831ff161d156.png';
import earlyInternetImg from 'figma:asset/57388e386573b7f1f030332335dfab77c975e4c5.png';
import childhoodBedroomImg from 'figma:asset/cc70e1374516ec122a5e49f81ce099502394ce25.png';
import libraryCornerImg from 'figma:asset/d0e52307aed4e225ade29e888772bff13c74b434.png';
import natureMeadowImg from 'figma:asset/723ee9590660641bfc337977052cedd07429b4db.png';

interface MemoryAtmospheresScreenProps {
  onSelect?: (atmosphereId: string) => void;
  onBack?: () => void;
}

interface AtmosphereOption {
  id: string;
  title: string;
  description: string;
  visualElements: string[];
  soundElements: string[];
  gradient: string;
  accentColor: string;
  illustration: React.ReactNode;
}

export function MemoryAtmospheresScreen({ onSelect, onBack }: MemoryAtmospheresScreenProps) {
  const [selectedAtmosphere, setSelectedAtmosphere] = useState<string | null>(null);

  const atmospheres: AtmosphereOption[] = [
    {
      id: 'spring-window',
      title: 'Spring Evening Window',
      description: 'A calm spring evening with warm sunlight and a light breeze.',
      visualElements: ['Sunset light', 'Flowing curtains', 'Warm sky'],
      soundElements: ['Soft wind', 'Distant birds'],
      gradient: 'linear-gradient(135deg, #FFE870 0%, #FFF3A3 40%, #A8D8FF 100%)',
      accentColor: '#FFE870',
      illustration: (
        <div className="relative w-full h-48 rounded-[16px] overflow-hidden"
          style={{
            backgroundImage: `url(${springWindowImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Subtle overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(255,243,163,0.15)]" />
        </div>
      )
    },
    {
      id: 'early-internet',
      title: 'Early Internet Room (2000s Nostalgia)',
      description: 'The quiet comfort of browsing the early internet late at night.',
      visualElements: ['CRT glow', 'Pixel UI', 'Screen light'],
      soundElements: ['Computer hum', 'Keyboard typing'],
      gradient: 'linear-gradient(135deg, #5BA5C4 0%, #7EC8E3 50%, #A8D8FF 100%)',
      accentColor: '#7EC8E3',
      illustration: (
        <div className="relative w-full h-48 rounded-[16px] overflow-hidden"
          style={{
            backgroundImage: `url(${earlyInternetImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Subtle overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(126,200,227,0.15)]" />
        </div>
      )
    },
    {
      id: 'childhood-bedroom',
      title: 'Childhood Bedroom at Sunset',
      description: 'The calm feeling of being in your childhood room as the sun sets.',
      visualElements: ['Golden light', 'Soft shadows', 'Toy silhouettes'],
      soundElements: ['Quiet room tone', 'Evening ambience'],
      gradient: 'linear-gradient(135deg, #FFE870 0%, #8FD694 50%, #7EC8E3 100%)',
      accentColor: '#F5D86D',
      illustration: (
        <div className="relative w-full h-48 rounded-[16px] overflow-hidden"
          style={{
            backgroundImage: `url(${childhoodBedroomImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Subtle overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(245,216,109,0.15)]" />
        </div>
      )
    },
    {
      id: 'library-corner',
      title: 'Quiet Library Corner',
      description: 'A peaceful place to slow down and focus.',
      visualElements: ['Wooden shelves', 'Lamp light', 'Dust particles'],
      soundElements: ['Page turning', 'Ambient silence'],
      gradient: 'linear-gradient(135deg, #8FD694 0%, #6DB876 50%, #4A8556 100%)',
      accentColor: '#6DB876',
      illustration: (
        <div className="relative w-full h-48 rounded-[16px] overflow-hidden"
          style={{
            backgroundImage: `url(${libraryCornerImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Subtle overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(107,184,118,0.15)]" />
        </div>
      )
    },
    {
      id: 'nature-meadow',
      title: 'Nature Meadow Afternoon',
      description: 'A peaceful outdoor moment surrounded by nature.',
      visualElements: ['Green meadow', 'Sunlight', 'Gentle clouds'],
      soundElements: ['Light wind', 'Nature sounds'],
      gradient: 'linear-gradient(135deg, #A8D8FF 0%, #8FD694 50%, #6DB876 100%)',
      accentColor: '#8FD694',
      illustration: (
        <div className="relative w-full h-48 rounded-[16px] overflow-hidden"
          style={{
            backgroundImage: `url(${natureMeadowImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Subtle overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(143,214,148,0.15)]" />
        </div>
      )
    }
  ];

  const handleSelect = (id: string) => {
    setSelectedAtmosphere(id);
  };

  const handleContinue = () => {
    if (selectedAtmosphere) {
      onSelect?.(selectedAtmosphere);
    }
  };

  return (
    <div className="relative w-full max-w-[390px] min-h-screen bg-[#F7FFF7] overflow-hidden">
      {/* Ghibli-inspired atmospheric background */}
      <GhibliBackground variant="comfort" withTexture={true} withParticles={false} />

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen pb-32">
        {/* Header */}
        <div className="px-6 pt-12 pb-6 fade-in-normal">
          {/* Back button */}
          <button className="flex items-center gap-2 mb-6 text-[#4A8556] hover:text-[#2B5F4D] opacity-80 hover:opacity-100 transition-all hover-lift-sm press-scale"
            onClick={onBack}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12 4L6 10L12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-sm font-medium">Back</span>
          </button>

          {/* Title section */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <PixelIcon type="sparkle" size={32} color="#6DB876" />
              <h1 
                className="text-3xl font-light"
                style={{
                  color: '#2B5F4D',
                  textShadow: '0 2px 8px rgba(143, 214, 148, 0.15)'
                }}
              >
                Memory Atmospheres
              </h1>
            </div>
            <p className="text-sm" style={{ color: '#4A8556', opacity: 0.85 }}>
              Choose a familiar environment to reconnect with comfort
            </p>
          </div>
        </div>

        {/* Atmosphere Cards */}
        <div className="px-6 space-y-5 flex-1">
          {atmospheres.map((atmosphere, index) => (
            <div
              key={atmosphere.id}
              onClick={() => handleSelect(atmosphere.id)}
              className={`
                relative rounded-[24px] p-6 backdrop-blur-lg border-2 cursor-pointer
                transition-all duration-300 overflow-hidden group
                ${selectedAtmosphere === atmosphere.id 
                  ? 'border-[rgba(143,214,148,0.5)] shadow-ghibli-md scale-in-bounce' 
                  : 'border-[rgba(143,214,148,0.25)] hover-lift press-scale hover-glow-meadow'
                }
                fade-in-normal
              `}
              style={{
                background: selectedAtmosphere === atmosphere.id
                  ? 'rgba(255, 255, 255, 0.8)'
                  : 'rgba(255, 255, 255, 0.5)',
                animationDelay: `${index * 0.1}s`,
                animationFillMode: 'both'
              }}
            >
              {/* Selection glow */}
              {selectedAtmosphere === atmosphere.id && (
                <div 
                  className="absolute inset-0 rounded-[24px] pointer-events-none pulse-glow"
                  style={{
                    boxShadow: `inset 0 0 40px ${atmosphere.accentColor}33, 0 0 40px ${atmosphere.accentColor}20`
                  }}
                />
              )}

              {/* Paper texture */}
              <div className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-multiply"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
                }}
              />

              {/* Content */}
              <div className="relative z-10 space-y-4">
                {/* Visual Preview */}
                <div className="relative rounded-[16px] overflow-hidden"
                  style={{
                    background: atmosphere.gradient,
                    boxShadow: `0 4px 20px ${atmosphere.accentColor}20`
                  }}>
                  {atmosphere.illustration}
                </div>

                {/* Title */}
                <h3 
                  className="text-lg font-medium transition-colors duration-300"
                  style={{ color: '#2B5F4D' }}
                >
                  {atmosphere.title}
                </h3>

                {/* Description */}
                <p 
                  className="text-sm leading-relaxed"
                  style={{ color: '#4A8556', opacity: 0.9 }}
                >
                  {atmosphere.description}
                </p>

                {/* Elements Grid */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  {/* Visual Elements */}
                  <div 
                    className="rounded-[12px] p-3 border"
                    style={{
                      background: 'rgba(168, 216, 255, 0.1)',
                      borderColor: 'rgba(168, 216, 255, 0.25)'
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="8" r="6" stroke="#7EC8E3" strokeWidth="1.5" fill="none"/>
                        <circle cx="8" cy="8" r="3" fill="#7EC8E3" opacity="0.5"/>
                      </svg>
                      <span className="text-xs font-medium" style={{ color: '#5BA5C4' }}>
                        Visual
                      </span>
                    </div>
                    <div className="space-y-1">
                      {atmosphere.visualElements.map((element, i) => (
                        <div key={i} className="flex items-center gap-1.5">
                          <div className="w-1 h-1 rounded-full bg-[#7EC8E3] opacity-60" />
                          <span className="text-xs" style={{ color: '#4A8556', opacity: 0.8 }}>
                            {element}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Sound Elements */}
                  <div 
                    className="rounded-[12px] p-3 border"
                    style={{
                      background: 'rgba(143, 214, 148, 0.1)',
                      borderColor: 'rgba(143, 214, 148, 0.25)'
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M3 6v4l3 2h2V4H6L3 6z" fill="#6DB876" opacity="0.6"/>
                        <path d="M11 5c.5.5 1 1.5 1 3s-.5 2.5-1 3M13 3c1 1 2 3 2 5s-1 4-2 5" stroke="#6DB876" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                      </svg>
                      <span className="text-xs font-medium" style={{ color: '#6DB876' }}>
                        Sound
                      </span>
                    </div>
                    <div className="space-y-1">
                      {atmosphere.soundElements.map((element, i) => (
                        <div key={i} className="flex items-center gap-1.5">
                          <div className="w-1 h-1 rounded-full bg-[#6DB876] opacity-60" />
                          <span className="text-xs" style={{ color: '#4A8556', opacity: 0.8 }}>
                            {element}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Enter Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect?.(atmosphere.id);
                  }}
                  className="w-full py-4 rounded-[16px] border-2 flex items-center justify-center gap-2 transition-all hover-lift press-scale mt-2"
                  style={{
                    background: `linear-gradient(135deg, ${atmosphere.accentColor}15, ${atmosphere.accentColor}08)`,
                    borderColor: `${atmosphere.accentColor}50`,
                    boxShadow: `0 2px 12px ${atmosphere.accentColor}15`
                  }}
                >
                  <PixelIcon type="sparkle" size={18} color={atmosphere.accentColor} />
                  <span className="text-base font-medium" style={{ color: '#2B5F4D' }}>
                    Enter Atmosphere
                  </span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="float-gentle">
                    <path d="M6 4L10 8L6 12" stroke={atmosphere.accentColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                {/* Selected Indicator */}
                {selectedAtmosphere === atmosphere.id && (
                  <div 
                    className="flex items-center justify-center gap-2 py-2 rounded-[12px] success-pop"
                    style={{
                      background: `linear-gradient(135deg, ${atmosphere.accentColor}20, ${atmosphere.accentColor}10)`,
                      border: `1px solid ${atmosphere.accentColor}40`
                    }}
                  >
                    <div className="w-5 h-5 rounded-full flex items-center justify-center"
                      style={{ background: atmosphere.accentColor }}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="text-sm font-medium" style={{ color: '#2B5F4D' }}>
                      Selected
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom spacing for scroll */}
        <div className="h-8" />
      </div>

      {/* Enter Button - Fixed at bottom */}
      {selectedAtmosphere && (
        <div 
          className="fixed bottom-0 left-0 right-0 max-w-[390px] mx-auto px-6 py-6 backdrop-blur-xl border-t slide-up"
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderColor: 'rgba(143, 214, 148, 0.3)',
            boxShadow: '0 -4px 24px rgba(75, 133, 86, 0.08)'
          }}
        >
          <ReverieButton
            variant="aurora"
            size="lg"
            className="w-full"
            onClick={handleContinue}
          >
            <div className="flex items-center justify-center gap-2">
              <PixelIcon type="sparkle" size={20} color="#2B5F4D" />
              <span>Enter Atmosphere</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="float-gentle">
                <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </ReverieButton>
        </div>
      )}

      {/* Animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes curtain-sway {
          0%, 100% { transform: translateX(0) scaleX(1); }
          50% { transform: translateX(2px) scaleX(1.1); }
        }
      `}} />
    </div>
  );
}