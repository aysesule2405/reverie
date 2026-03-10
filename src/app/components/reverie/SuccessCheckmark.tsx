import React, { useEffect, useState } from 'react';

interface SuccessCheckmarkProps {
  size?: number;
  onComplete?: () => void;
  className?: string;
}

export function SuccessCheckmark({ 
  size = 80,
  onComplete,
  className = ''
}: SuccessCheckmarkProps) {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
      onComplete?.();
    }, 1200);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div 
      className={`relative inline-flex items-center justify-center success-pop ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Celebration burst particles */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => {
          const angle = (i * 30) * (Math.PI / 180);
          const distance = size * 0.8;
          return (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                background: `linear-gradient(135deg, #8FD694 0%, #7EC8E3 100%)`,
                top: '50%',
                left: '50%',
                animation: `particle-burst-${i} 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards`,
                opacity: 0
              }}
            />
          );
        })}
      </div>

      {/* Outer glow ring */}
      <div 
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(143, 214, 148, 0.3) 0%, transparent 70%)',
          animation: 'success-glow 1.2s ease-out forwards'
        }}
      />

      {/* Main circle */}
      <div 
        className="relative rounded-full flex items-center justify-center"
        style={{
          width: size,
          height: size,
          background: 'linear-gradient(135deg, rgba(168, 216, 255, 0.2) 0%, rgba(143, 214, 148, 0.25) 100%)',
          border: '3px solid #8FD694',
          boxShadow: '0 8px 32px rgba(143, 214, 148, 0.3), inset 0 0 20px rgba(143, 214, 148, 0.1)',
          animation: 'scale-in-bounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards'
        }}
      >
        {/* Checkmark SVG */}
        <svg 
          width={size * 0.5} 
          height={size * 0.5} 
          viewBox="0 0 24 24" 
          fill="none"
          style={{
            animation: 'draw-check 0.6s ease-out 0.3s forwards'
          }}
        >
          <path 
            d="M5 13l4 4L19 7" 
            stroke="#2B5F4D"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              strokeDasharray: 24,
              strokeDashoffset: 24,
              animation: 'draw-check 0.6s ease-out 0.3s forwards'
            }}
          />
        </svg>
      </div>

      {/* Sparkles */}
      {[
        { top: '10%', left: '15%', delay: '0.3s' },
        { top: '15%', right: '10%', delay: '0.4s' },
        { bottom: '15%', left: '10%', delay: '0.5s' },
        { bottom: '10%', right: '15%', delay: '0.6s' }
      ].map((pos, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            ...pos,
            animation: `sparkle ${0.8}s ease-out ${pos.delay} forwards`,
            opacity: 0
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 0L9 7L8 16L7 7L8 0Z"
              fill="#FFF3A3"
              opacity="0.8"
            />
            <path
              d="M0 8L7 9L16 8L7 7L0 8Z"
              fill="#FFF3A3"
              opacity="0.8"
            />
          </svg>
        </div>
      ))}

      {/* Animation styles */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes draw-check {
          to {
            stroke-dashoffset: 0;
          }
        }

        @keyframes success-glow {
          0% {
            transform: scale(0.8);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }

        @keyframes sparkle {
          0% {
            transform: scale(0) rotate(0deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.2) rotate(180deg);
            opacity: 1;
          }
          100% {
            transform: scale(0.8) rotate(360deg);
            opacity: 0;
          }
        }

        ${[...Array(12)].map((_, i) => {
          const angle = (i * 30) * (Math.PI / 180);
          const distance = size * 0.8;
          const x = Math.cos(angle) * distance;
          const y = Math.sin(angle) * distance;
          return `
            @keyframes particle-burst-${i} {
              0% {
                transform: translate(-50%, -50%) translate(0, 0) scale(0);
                opacity: 0;
              }
              50% {
                opacity: 1;
              }
              100% {
                transform: translate(-50%, -50%) translate(${x}px, ${y}px) scale(0.5);
                opacity: 0;
              }
            }
          `;
        }).join('\n')}
      `}} />
    </div>
  );
}
