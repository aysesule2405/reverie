import React, { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

interface AtmosphericParticlesProps {
  count?: number;
  variant?: 'dust' | 'light' | 'sparkle';
  intensity?: 'subtle' | 'medium' | 'strong';
}

export function AtmosphericParticles({ 
  count = 20, 
  variant = 'dust',
  intensity = 'subtle'
}: AtmosphericParticlesProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 20 + 15,
        delay: Math.random() * 5,
        opacity: Math.random() * 0.4 + 0.1,
      });
    }
    setParticles(newParticles);
  }, [count]);

  const getParticleColor = () => {
    switch (variant) {
      case 'dust':
        return 'var(--particle-dust)';
      case 'light':
        return 'var(--particle-light)';
      case 'sparkle':
        return 'var(--particle-glow)';
      default:
        return 'var(--particle-dust)';
    }
  };

  const getIntensityOpacity = () => {
    switch (intensity) {
      case 'subtle':
        return 0.3;
      case 'medium':
        return 0.5;
      case 'strong':
        return 0.7;
      default:
        return 0.3;
    }
  };

  return (
    <div 
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
    >
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: getParticleColor(),
            opacity: particle.opacity * getIntensityOpacity(),
            animation: `floatParticle ${particle.duration}s ease-in-out ${particle.delay}s infinite`,
            filter: 'blur(1px)',
          }}
        />
      ))}
      
      <style>{`
        @keyframes floatParticle {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(20px, -30px) scale(1.1);
          }
          50% {
            transform: translate(-15px, -60px) scale(0.9);
          }
          75% {
            transform: translate(25px, -90px) scale(1.05);
          }
        }
      `}</style>
    </div>
  );
}
