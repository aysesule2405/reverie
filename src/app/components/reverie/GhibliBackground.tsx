import React from 'react';

interface GhibliBackgroundProps {
  variant?: 'morning' | 'sky' | 'meadow' | 'golden' | 'comfort' | 'sunset';
  withTexture?: boolean;
  withParticles?: boolean;
  withGlow?: boolean;
}

export function GhibliBackground({ 
  variant = 'comfort', 
  withTexture = true,
  withParticles = true,
  withGlow = true
}: GhibliBackgroundProps) {
  
  // Refined Ghibli-inspired gradients with warm, soft colors
  const gradients = {
    morning: 'linear-gradient(135deg, #E8F4FB 0%, #FFFEF8 50%, #FFF9E5 100%)',
    sky: 'linear-gradient(180deg, #C4E3F5 0%, #E8F4FB 40%, #FFFEF8 100%)',
    meadow: 'linear-gradient(135deg, #E8F5E8 0%, #C8E6C9 30%, #FFFEF8 100%)',
    golden: 'radial-gradient(circle at 50% 30%, #FFF9E5 0%, #FFE89A 20%, #FFFEF8 70%)',
    comfort: 'linear-gradient(135deg, #E8F4FB 0%, #E8F5E8 30%, #FFF9E5 70%, #FFFEF8 100%)',
    sunset: 'linear-gradient(135deg, #FFE8D8 0%, #FFE89A 40%, #C4E3F5 100%)'
  };

  // Warm atmospheric glows
  const glows = {
    morning: { color: '#A8D8FF', secondaryColor: '#C8E6C9', position: 'top-right' },
    sky: { color: '#A8D8FF', secondaryColor: '#E8F4FB', position: 'top-center' },
    meadow: { color: '#9FD6A1', secondaryColor: '#E8F5E8', position: 'bottom-left' },
    golden: { color: '#FFE89A', secondaryColor: '#FFF9E5', position: 'top-center' },
    comfort: { color: '#A8D8FF', secondaryColor: '#9FD6A1', position: 'center' },
    sunset: { color: '#FFD4B8', secondaryColor: '#FFE89A', position: 'top-right' }
  };

  const glow = glows[variant];
  
  const glowPositions = {
    'top-right': 'top-0 right-0 translate-x-1/4 -translate-y-1/4',
    'top-center': 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/4',
    'bottom-left': 'bottom-0 left-0 -translate-x-1/4 translate-y-1/4',
    'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
  };

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base gradient - soft and warm */}
      <div 
        className="absolute inset-0"
        style={{ 
          background: gradients[variant]
        }}
      />

      {/* Primary sunlight glow - warm and gentle */}
      {withGlow && (
        <>
          <div 
            className={`absolute w-[700px] h-[700px] rounded-full ${glowPositions[glow.position]}`}
            style={{ 
              background: `radial-gradient(circle, ${glow.color}50 0%, ${glow.color}25 35%, transparent 70%)`,
              filter: 'blur(80px)',
              animation: 'gentlePulse 10s ease-in-out infinite',
              opacity: 0.5
            }}
          />
          
          {/* Secondary atmospheric glow - adds depth */}
          <div 
            className="absolute bottom-0 left-0 w-full h-[50%] rounded-full"
            style={{ 
              background: `radial-gradient(ellipse at bottom, ${glow.secondaryColor}40 0%, ${glow.secondaryColor}20 30%, transparent 60%)`,
              filter: 'blur(100px)',
              animation: 'gentlePulse 15s ease-in-out infinite reverse',
              opacity: 0.4
            }}
          />
          
          {/* Warm ambient light - like afternoon sun */}
          <div 
            className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full"
            style={{ 
              background: 'radial-gradient(circle, rgba(255, 232, 154, 0.25) 0%, rgba(255, 243, 200, 0.12) 40%, transparent 70%)',
              filter: 'blur(90px)',
              animation: 'gentleFloat 12s ease-in-out infinite',
              opacity: 0.6
            }}
          />
        </>
      )}

      {/* Subtle paper texture overlay - nostalgic Ghibli feel */}
      {withTexture && (
        <div 
          className="absolute inset-0 opacity-[0.025] pointer-events-none mix-blend-multiply"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '250px 250px'
          }}
        />
      )}

      {/* Floating light particles - like dust in warm sunlight */}
      {withParticles && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                background: i % 4 === 0 ? '#FFE89A' : i % 4 === 1 ? '#A8D8FF' : i % 4 === 2 ? '#9FD6A1' : '#FFD4B8',
                opacity: 0.2,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `floatGently ${10 + i * 2}s ease-in-out infinite`,
                animationDelay: `${i * 0.7}s`,
                boxShadow: `0 0 12px currentColor`,
                filter: 'blur(1px)'
              }}
            />
          ))}
        </div>
      )}

      {/* Animation keyframes */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes gentlePulse {
          0%, 100% {
            transform: translate(var(--tw-translate-x), var(--tw-translate-y)) scale(1);
            opacity: 0.5;
          }
          50% {
            transform: translate(var(--tw-translate-x), var(--tw-translate-y)) scale(1.08);
            opacity: 0.65;
          }
        }
        
        @keyframes gentleFloat {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(20px, -15px) scale(1.05);
          }
          66% {
            transform: translate(-15px, 10px) scale(0.95);
          }
        }
        
        @keyframes floatGently {
          0%, 100% {
            transform: translate(0, 0);
            opacity: 0.15;
          }
          25% {
            transform: translate(15px, -25px);
            opacity: 0.25;
          }
          50% {
            transform: translate(-10px, -50px);
            opacity: 0.2;
          }
          75% {
            transform: translate(-20px, -30px);
            opacity: 0.22;
          }
        }
      `}} />
    </div>
  );
}