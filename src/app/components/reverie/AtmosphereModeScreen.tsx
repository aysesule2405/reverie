import React, { useState, useEffect, useRef } from 'react';
import { PixelIcon } from './PixelIcon';
import { getAtmosphereSounds } from './atmosphereSounds';
const springWindowImg = '/src/assets/213de50120f0b1e6f10d449fd7d2831ff161d156.png';
const earlyInternetImg = '/src/assets/57388e386573b7f1f030332335dfab77c975e4c5.png';
const childhoodBedroomImg = '/src/assets/cc70e1374516ec122a5e49f81ce099502394ce25.png';
const libraryCornerImg = '/src/assets/d0e52307aed4e225ade29e888772bff13c74b434.png';
const natureMeadowImg = '/src/assets/723ee9590660641bfc337977052cedd07429b4db.png';

interface AtmosphereModeScreenProps {
  atmosphereId?: string;
  onExit?: () => void;
}

interface AtmosphereConfig {
  id: string;
  name: string;
  backgroundImage: string;
  overlayColor: string;
  accentColor: string;
  animationType: 'curtains' | 'particles' | 'clouds' | 'glow' | 'meadow';
}

export function AtmosphereModeScreen({ 
  atmosphereId = 'spring-window', 
  onExit 
}: AtmosphereModeScreenProps) {
  const [soundVolume, setSoundVolume] = useState(70);
  const [intensity, setIntensity] = useState(60);
  const [showControls, setShowControls] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioRefs = useRef<HTMLAudioElement[]>([]);

  useEffect(() => {
    // Fade in effect
    setTimeout(() => setIsLoaded(true), 100);

    // Load and play all atmosphere sounds
    const sounds = getAtmosphereSounds(atmosphereId);
    // Stop previous audios
    audioRefs.current.forEach(a => {
      try { a.pause(); a.src = ''; } catch(e) {}
    });
    audioRefs.current = [];

    if (sounds.length > 0) {
      sounds.forEach((sound) => {
        try {
          const audio = new Audio(sound.path);
          audio.loop = Boolean(sound.loop);
          audio.volume = (soundVolume / 100) * (sound.volume / 100);
          // attempt to play (may require user gesture in some browsers)
          audio.play().catch((error) => {
            // Don't crash the app; log for debug
            console.debug('Audio playback blocked (user gesture may be required):', error);
          });
          audioRefs.current.push(audio);
        } catch (err) {
          console.error('Failed to create audio for', sound.path, err);
        }
      });
    }

    // Session timer
    const timer = setInterval(() => {
      setSessionTime(prev => prev + 1);
    }, 1000);

    return () => {
      // Cleanup: stop audio and timer
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      clearInterval(timer);
    };
  }, [atmosphereId]);

  // Update volume when slider changes
  useEffect(() => {
    const sounds = getAtmosphereSounds(atmosphereId);
    audioRefs.current.forEach((audio, idx) => {
      const sound = sounds[idx];
      if (!audio) return;
      try {
        audio.volume = (soundVolume / 100) * ((sound && sound.volume) ? (sound.volume / 100) : 1);
      } catch (e) {}
    });
  }, [soundVolume, atmosphereId]);

  // Format session time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const atmospheres: Record<string, AtmosphereConfig> = {
    'spring-window': {
      id: 'spring-window',
      name: 'Spring Evening Window',
      backgroundImage: springWindowImg,
      overlayColor: 'rgba(255, 243, 163, 0.15)',
      accentColor: '#FFE870',
      animationType: 'curtains'
    },
    'early-internet': {
      id: 'early-internet',
      name: 'Early Internet Room',
      backgroundImage: earlyInternetImg,
      overlayColor: 'rgba(126, 200, 227, 0.12)',
      accentColor: '#7EC8E3',
      animationType: 'glow'
    },
    'childhood-bedroom': {
      id: 'childhood-bedroom',
      name: 'Childhood Bedroom at Sunset',
      backgroundImage: childhoodBedroomImg,
      overlayColor: 'rgba(245, 216, 109, 0.1)',
      accentColor: '#F5D86D',
      animationType: 'particles'
    },
    'library-corner': {
      id: 'library-corner',
      name: 'Quiet Library Corner',
      backgroundImage: libraryCornerImg,
      overlayColor: 'rgba(107, 184, 118, 0.08)',
      accentColor: '#6DB876',
      animationType: 'particles'
    },
    'nature-meadow': {
      id: 'nature-meadow',
      name: 'Nature Meadow Afternoon',
      backgroundImage: natureMeadowImg,
      overlayColor: 'rgba(143, 214, 148, 0.1)',
      accentColor: '#8FD694',
      animationType: 'clouds'
    }
  };

  const currentAtmosphere = atmospheres[atmosphereId] || atmospheres['spring-window'];

  const handleExit = () => {
    setIsLoaded(false);
    setTimeout(() => {
      onExit?.();
    }, 300);
  };

  // Generate particles for dust/light effects
  const renderParticles = () => {
    return Array.from({ length: 15 }).map((_, i) => (
      <div
        key={i}
        className="absolute w-1 h-1 bg-white rounded-full opacity-40 particle-float"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 10}s`,
          animationDuration: `${8 + Math.random() * 8}s`
        }}
      />
    ));
  };

  // Generate clouds
  const renderClouds = () => {
    return Array.from({ length: 3 }).map((_, i) => (
      <div
        key={i}
        className="absolute w-32 h-16 bg-white rounded-full opacity-20 cloud-drift blur-xl"
        style={{
          left: `${-20 + Math.random() * 120}%`,
          top: `${10 + i * 30}%`,
          animationDelay: `${i * 5}s`,
          animationDuration: `${30 + i * 10}s`
        }}
      />
    ));
  };

  return (
    <div className="relative w-full max-w-[390px] min-h-screen overflow-hidden">
      {/* Full-screen background image */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{
          backgroundImage: `url(${currentAtmosphere.backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />

      {/* Colored overlay for mood */}
      <div 
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, ${currentAtmosphere.overlayColor} 0%, transparent 50%, ${currentAtmosphere.overlayColor} 100%)`
        }}
      />

      {/* Animated elements based on atmosphere type */}
      {currentAtmosphere.animationType === 'curtains' && (
        <>
          {/* Flowing curtain on left */}
          <div 
            className="absolute left-0 top-0 bottom-0 w-16 curtain-sway opacity-30 blur-sm"
            style={{
              background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.4) 0%, transparent 100%)'
            }}
          />
          {/* Flowing curtain on right */}
          <div 
            className="absolute right-0 top-0 bottom-0 w-16 curtain-sway-reverse opacity-30 blur-sm"
            style={{
              background: 'linear-gradient(270deg, rgba(255, 255, 255, 0.4) 0%, transparent 100%)',
              animationDelay: '1s'
            }}
          />
        </>
      )}

      {currentAtmosphere.animationType === 'particles' && (
        <div className="absolute inset-0 pointer-events-none">
          {renderParticles()}
        </div>
      )}

      {currentAtmosphere.animationType === 'clouds' && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {renderClouds()}
        </div>
      )}

      {currentAtmosphere.animationType === 'glow' && (
        <>
          {/* Screen glow effect */}
          <div 
            className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full screen-glow blur-3xl opacity-20"
            style={{
              background: `radial-gradient(circle, ${currentAtmosphere.accentColor} 0%, transparent 70%)`,
              transform: 'translate(-50%, -50%)'
            }}
          />
        </>
      )}

      {currentAtmosphere.animationType === 'meadow' && (
        <>
          {/* Gentle light rays */}
          <div 
            className="absolute top-0 right-1/4 w-1 h-full light-ray opacity-10"
            style={{
              background: 'linear-gradient(180deg, transparent 0%, rgba(255, 255, 255, 0.5) 50%, transparent 100%)',
              transform: 'rotate(15deg)',
              transformOrigin: 'top'
            }}
          />
        </>
      )}

      {/* Vignette effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, transparent 30%, rgba(0, 0, 0, 0.3) 100%)'
        }}
      />

      {/* Content overlay */}
      <div className={`relative z-10 flex flex-col min-h-screen transition-opacity duration-1000 delay-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        {/* Top section - Atmosphere name */}
        <div className="px-6 pt-16 pb-8">
          <div 
            className="inline-flex items-center gap-3 px-4 py-3 rounded-[16px] backdrop-blur-xl border fade-in-slow"
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              borderColor: 'rgba(255, 255, 255, 0.3)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
            }}
          >
            <div 
              className="w-2 h-2 rounded-full pulse-glow"
              style={{ background: currentAtmosphere.accentColor }}
            />
            <h1 className="text-xl font-light text-white drop-shadow-lg">
              {currentAtmosphere.name}
            </h1>
          </div>
        </div>

        {/* Center - Tap to toggle controls hint */}
        <div className="flex-1 flex items-center justify-center px-6">
          {!showControls && (
            <button
              onClick={() => setShowControls(true)}
              className="px-6 py-3 rounded-[16px] backdrop-blur-xl border float-gentle press-scale"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                borderColor: 'rgba(255, 255, 255, 0.2)',
              }}
            >
              <span className="text-sm text-white opacity-80">Tap for controls</span>
            </button>
          )}
        </div>

        {/* Bottom - Control panel */}
        {showControls && (
          <div 
            className="px-6 pb-8 slide-up"
            style={{
              background: 'linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.3) 100%)'
            }}
          >
            <div 
              className="rounded-[24px] p-6 backdrop-blur-xl border space-y-6"
              style={{
                background: 'rgba(255, 255, 255, 0.12)',
                borderColor: 'rgba(255, 255, 255, 0.25)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
              }}
            >
              {/* Hide controls button */}
              <button
                onClick={() => setShowControls(false)}
                className="w-full flex items-center justify-center py-2 opacity-60 hover:opacity-100 transition-opacity"
              >
                <div className="w-12 h-1 rounded-full bg-white opacity-40" />
              </button>

              {/* Sound Volume */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M4 7v6l3 2h2V5H7L4 7z" fill="white" opacity="0.9"/>
                      <path d="M13 6c.5.5 1 1.5 1 4s-.5 3.5-1 4M15 4c1 1 2 3 2 6s-1 5-2 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.9"/>
                    </svg>
                    <label className="text-sm font-medium text-white">Sound</label>
                  </div>
                  <span className="text-sm text-white opacity-80">{soundVolume}%</span>
                </div>
                
                {/* Custom slider */}
                <div className="relative h-2 bg-white bg-opacity-20 rounded-full overflow-hidden">
                  <div 
                    className="absolute left-0 top-0 h-full rounded-full transition-all duration-200"
                    style={{
                      width: `${soundVolume}%`,
                      background: `linear-gradient(90deg, ${currentAtmosphere.accentColor}, ${currentAtmosphere.accentColor}dd)`,
                      boxShadow: `0 0 12px ${currentAtmosphere.accentColor}80`
                    }}
                  />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={soundVolume}
                    onChange={(e) => setSoundVolume(Number(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              </div>

              {/* Atmosphere Intensity */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="10" r="4" fill="white" opacity="0.9"/>
                      <circle cx="10" cy="10" r="7" stroke="white" strokeWidth="1.5" opacity="0.5" strokeDasharray="2 3"/>
                      <circle cx="10" cy="10" r="9" stroke="white" strokeWidth="1" opacity="0.3" strokeDasharray="2 4"/>
                    </svg>
                    <label className="text-sm font-medium text-white">Intensity</label>
                  </div>
                  <span className="text-sm text-white opacity-80">{intensity}%</span>
                </div>
                
                {/* Custom slider */}
                <div className="relative h-2 bg-white bg-opacity-20 rounded-full overflow-hidden">
                  <div 
                    className="absolute left-0 top-0 h-full rounded-full transition-all duration-200"
                    style={{
                      width: `${intensity}%`,
                      background: `linear-gradient(90deg, ${currentAtmosphere.accentColor}, ${currentAtmosphere.accentColor}dd)`,
                      boxShadow: `0 0 12px ${currentAtmosphere.accentColor}80`
                    }}
                  />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={intensity}
                    onChange={(e) => setIntensity(Number(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-white opacity-20" />

              {/* Exit button */}
              <button
                onClick={handleExit}
                className="w-full py-4 rounded-[16px] border-2 flex items-center justify-center gap-2 transition-all hover-lift press-scale"
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  borderColor: 'rgba(255, 255, 255, 0.4)',
                }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M8 4L2 10l6 6M2 10h18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-base font-medium text-white">Exit Atmosphere</span>
              </button>

              {/* Session time */}
              <div className="flex items-center justify-center gap-2 pt-2">
                <div 
                  className="w-1.5 h-1.5 rounded-full pulse-glow"
                  style={{ background: currentAtmosphere.accentColor }}
                />
                <span className="text-xs text-white opacity-60">Session: {formatTime(sessionTime)}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes curtain-sway {
          0%, 100% { transform: translateX(0) scaleX(1); opacity: 0.3; }
          50% { transform: translateX(8px) scaleX(1.15); opacity: 0.4; }
        }
        
        @keyframes curtain-sway-reverse {
          0%, 100% { transform: translateX(0) scaleX(1); opacity: 0.3; }
          50% { transform: translateX(-8px) scaleX(1.15); opacity: 0.4; }
        }
        
        @keyframes particle-float {
          0% { transform: translate(0, 0) scale(1); opacity: 0; }
          10% { opacity: 0.4; }
          90% { opacity: 0.4; }
          100% { transform: translate(calc(var(--random-x, 20px)), calc(var(--random-y, -100vh))) scale(0.5); opacity: 0; }
        }
        
        @keyframes cloud-drift {
          0% { transform: translateX(0); }
          100% { transform: translateX(120vw); }
        }
        
        @keyframes screen-glow {
          0%, 100% { opacity: 0.15; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.25; transform: translate(-50%, -50%) scale(1.1); }
        }
        
        @keyframes light-ray {
          0%, 100% { opacity: 0.05; }
          50% { opacity: 0.15; }
        }
        
        .curtain-sway {
          animation: curtain-sway 6s ease-in-out infinite;
        }
        
        .curtain-sway-reverse {
          animation: curtain-sway-reverse 6s ease-in-out infinite;
        }
        
        .particle-float {
          animation: particle-float linear infinite;
          --random-x: ${Math.random() * 40 - 20}px;
          --random-y: ${-80 - Math.random() * 40}vh;
        }
        
        .cloud-drift {
          animation: cloud-drift linear infinite;
        }
        
        .screen-glow {
          animation: screen-glow 4s ease-in-out infinite;
        }
        
        .light-ray {
          animation: light-ray 8s ease-in-out infinite;
        }
      `}} />
    </div>
  );
}