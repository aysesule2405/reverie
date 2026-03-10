import React, { useState, useEffect } from 'react';
import { ComfortOrb } from './ComfortOrb';
import { DashboardCard } from './DashboardCard';
import { PixelIcon } from './PixelIcon';
import { GhibliBackground } from './GhibliBackground';

interface DashboardScreenProps {
  userName?: string;
}

export function DashboardScreen({ userName = 'Friend' }: DashboardScreenProps) {
  const [comfortPercentage, setComfortPercentage] = useState(72);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const getPressureStatus = () => {
    return {
      status: 'rising',
      level: 'Medium',
      color: '#D4A74A',
      icon: '↗'
    };
  };

  const pressureStatus = getPressureStatus();

  return (
    <div className="relative w-full max-w-[390px] min-h-[844px] overflow-hidden bg-[#F7FFF7]">
      {/* Ghibli-inspired atmospheric background */}
      <GhibliBackground variant="sky" withTexture={true} withParticles={true} />

      {/* Main content */}
      <div className="relative z-10 flex flex-col min-h-[844px] px-6 pt-12 pb-28">
        {/* Header */}
        <div className="space-y-1 mb-8">
          <h2 
            className="text-sm font-light tracking-wide"
            style={{ color: '#6DB876', opacity: 0.8 }}
          >
            {getGreeting()}, {userName}
          </h2>
          <h1 
            className="text-3xl font-light"
            style={{ 
              color: '#2B5F4D',
              textShadow: '0 2px 8px rgba(143, 214, 148, 0.15)'
            }}
          >
            How are you feeling?
          </h1>
        </div>

        {/* Comfort Orb */}
        <div className="mb-8">
          <ComfortOrb percentage={comfortPercentage} />
        </div>

        {/* Quick Status */}
        <div 
          className="rounded-[20px] p-5 mb-6 backdrop-blur-md border"
          style={{
            background: 'rgba(255, 255, 255, 0.6)',
            borderColor: 'rgba(143, 214, 148, 0.3)',
            boxShadow: '0 2px 16px rgba(75, 133, 86, 0.08)'
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-medium" style={{ color: '#2B5F4D' }}>
              Emotional State
            </h3>
            <span className="text-xs" style={{ color: '#6DB876', opacity: 0.7 }}>
              {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm" style={{ color: '#4A8556', opacity: 0.85 }}>
                Comfort Level
              </span>
              <div className="flex items-center gap-2">
                <span className="text-lg font-medium" style={{ color: '#5BA5C4' }}>
                  {comfortPercentage}%
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm" style={{ color: '#4A8556', opacity: 0.85 }}>
                Stress Pressure
              </span>
              <div className="flex items-center gap-2">
                <span className="text-lg" style={{ color: pressureStatus.color }}>
                  {pressureStatus.icon}
                </span>
                <span className="text-sm font-medium" style={{ color: pressureStatus.color }}>
                  {pressureStatus.level}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Cards */}
        <div className="space-y-4">
          <DashboardCard
            title="Memory Atmospheres"
            description="Enter a calming nostalgic environment"
            icon={
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #8FD694 0%, #A8E6A3 100%)',
                  boxShadow: '0 2px 12px rgba(143, 214, 148, 0.4)'
                }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 2C10 2 7.5 4 7.5 7C7.5 9 8.5 10 10 10C11.5 10 12.5 9 12.5 7C12.5 4 10 2 10 2Z" fill="white" opacity="0.9"/>
                  <path d="M6 7C6 7 4.5 8.5 4.5 10.5C4.5 11.5 5.5 12 6.5 12C7.5 12 8 11.5 8 10.5C8 8.5 6 7 6 7Z" fill="white" opacity="0.7"/>
                  <path d="M14 7C14 7 15.5 8.5 15.5 10.5C15.5 11.5 14.5 12 13.5 12C12.5 12 12 11.5 12 10.5C12 8.5 14 7 14 7Z" fill="white" opacity="0.7"/>
                  <rect x="9" y="12" width="2" height="6" rx="0.5" fill="white" opacity="0.6"/>
                </svg>
              </div>
            }
            gradient="linear-gradient(135deg, #8FD694, #A8E6A3)"
          />
          
          <DashboardCard
            title="Comfort Patterns"
            description="View your emotional regulation insights"
            icon={
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #A8D8FF 0%, #7EC8E3 100%)',
                  boxShadow: '0 2px 12px rgba(168, 216, 255, 0.4)'
                }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M3 15L6 10L9 12L13 6L17 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.9"/>
                  <rect x="2" y="3" width="2" height="14" rx="0.5" fill="white" opacity="0.7"/>
                  <rect x="2" y="16" width="16" height="2" rx="0.5" fill="white" opacity="0.7"/>
                </svg>
              </div>
            }
            gradient="linear-gradient(135deg, #A8D8FF, #7EC8E3)"
          />
          
          <DashboardCard
            title="Breathing Exercise"
            description="5-minute guided calm session"
            icon={
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #FFF3A3 0%, #FFE870 100%)',
                  boxShadow: '0 2px 12px rgba(255, 243, 163, 0.4)'
                }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="9" r="4" fill="white" opacity="0.9"/>
                  <path d="M10 13L10 16" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.7"/>
                  <path d="M5 9L2 9" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.7"/>
                  <path d="M15 9L18 9" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.7"/>
                  <path d="M7 6L5 4" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
                  <path d="M13 6L15 4" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
                </svg>
              </div>
            }
            gradient="linear-gradient(135deg, #FFF3A3, #FFE870)"
          />
        </div>

        {/* Bottom Suggestion */}
        <div 
          className="mt-auto pt-6 rounded-[20px] p-4 backdrop-blur-sm border"
          style={{
            background: 'rgba(255, 255, 255, 0.4)',
            borderColor: 'rgba(168, 216, 255, 0.3)',
          }}
        >
          <p className="text-xs text-center" style={{ color: '#5A9A6B', opacity: 0.7 }}>
            💭 Your comfort score is steady. Consider a brief atmosphere session.
          </p>
        </div>
      </div>
    </div>
  );
}