import React, { useState } from 'react';
import { PixelIcon } from './PixelIcon';
import { GhibliBackground } from './GhibliBackground';

interface InsightsScreenProps {
  onBack?: () => void;
}

export function InsightsScreen({ onBack }: InsightsScreenProps) {
  // Weekly data: calm percentage for each day
  const weeklyData = [
    { day: 'Mon', calm: 72, overload: 28, label: 'M' },
    { day: 'Tue', calm: 45, overload: 55, label: 'T' },
    { day: 'Wed', calm: 88, overload: 12, label: 'W' },
    { day: 'Thu', calm: 61, overload: 39, label: 'T' },
    { day: 'Fri', calm: 34, overload: 66, label: 'F' },
    { day: 'Sat', calm: 91, overload: 9, label: 'S' },
    { day: 'Sun', calm: 85, overload: 15, label: 'S' }
  ];

  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  return (
    <div className="relative w-full max-w-[390px] min-h-[844px] bg-[#F7FFF7] overflow-hidden">
      {/* Ghibli-inspired atmospheric background */}
      <GhibliBackground variant="meadow" withTexture={true} withParticles={false} />

      {/* Content */}
      <div className="relative z-10 min-h-[844px] flex flex-col px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-[#4A8556] hover:text-[#2B5F4D] opacity-80 hover:opacity-100 transition-all mb-6"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12 4L6 10L12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-sm font-medium">Back</span>
          </button>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <PixelIcon type="star" size={28} color="#6DB876" />
              <h1 
                className="text-3xl font-light tracking-wide"
                style={{
                  color: '#2B5F4D',
                  textShadow: '0 2px 8px rgba(143, 214, 148, 0.15)',
                }}
              >
                Your Comfort Patterns
              </h1>
            </div>
            <p className="text-sm" style={{ color: '#6DB876', opacity: 0.7 }}>
              Past 7 days • Updated 2 hours ago
            </p>
          </div>
        </div>

        {/* Weekly Visualization Card */}
        <div 
          className="rounded-[24px] p-6 mb-6 backdrop-blur-lg border"
          style={{
            background: 'rgba(255, 255, 255, 0.6)',
            borderColor: 'rgba(143, 214, 148, 0.3)',
            boxShadow: '0 2px 16px rgba(75, 133, 86, 0.08)'
          }}
        >
          {/* Chart Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-medium mb-1" style={{ color: '#2B5F4D' }}>
                Weekly Balance
              </h3>
              <p className="text-xs" style={{ color: '#6DB876', opacity: 0.8 }}>
                Calm vs Sensory Overload
              </p>
            </div>
            
            {/* Legend */}
            <div className="flex gap-3 text-xs">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#7EC8E3]" />
                <span style={{ color: '#4A8556', opacity: 0.8 }}>Calm</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FFE870]" />
                <span style={{ color: '#4A8556', opacity: 0.8 }}>Overload</span>
              </div>
            </div>
          </div>

          {/* Chart Area */}
          <div className="relative h-48 mb-4">
            {/* Horizontal grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between">
              {[100, 75, 50, 25, 0].map((value) => (
                <div key={value} className="flex items-center">
                  <span className="text-[10px] w-6 text-right mr-2" style={{ color: '#6DB876', opacity: 0.6 }}>
                    {value}
                  </span>
                  <div className="flex-1 h-px bg-[rgba(143,214,148,0.2)]" />
                </div>
              ))}
            </div>

            {/* Bars */}
            <div className="absolute inset-0 pl-10 flex items-end justify-between gap-2 pb-1">
              {weeklyData.map((data, index) => (
                <button
                  key={data.day}
                  onClick={() => setSelectedDay(index)}
                  className="flex-1 flex flex-col items-center gap-1 group"
                >
                  {/* Stacked bar */}
                  <div className="w-full relative flex flex-col-reverse gap-0.5">
                    {/* Calm portion */}
                    <div 
                      className="w-full rounded-t-lg transition-all duration-300 relative overflow-hidden"
                      style={{ 
                        height: `${data.calm * 1.7}px`,
                        background: 'linear-gradient(180deg, #A8D8FF 0%, #7EC8E3 100%)',
                        opacity: selectedDay === index || selectedDay === null ? 1 : 0.4,
                        boxShadow: selectedDay === index 
                          ? '0 0 20px rgba(168, 216, 255, 0.6)' 
                          : 'none'
                      }}
                    >
                      {/* Shimmer effect */}
                      {selectedDay === index && (
                        <div 
                          className="absolute inset-0 bg-gradient-to-t from-transparent via-white to-transparent opacity-20"
                          style={{ animation: 'shimmer 2s ease-in-out infinite' }}
                        />
                      )}
                    </div>
                    
                    {/* Overload portion */}
                    <div 
                      className="w-full rounded-b-lg transition-all duration-300"
                      style={{ 
                        height: `${data.overload * 1.7}px`,
                        background: 'linear-gradient(180deg, #FFF3A3 0%, #FFE870 100%)',
                        opacity: selectedDay === index || selectedDay === null ? 1 : 0.4
                      }}
                    />
                  </div>
                  
                  {/* Day label */}
                  <span 
                    className={`text-xs transition-all duration-300 ${
                      selectedDay === index 
                        ? 'text-[#5A9A6B] font-medium' 
                        : 'text-[#7EC8E3] opacity-60'
                    }`}
                  >
                    {data.label}
                  </span>

                  {/* Tooltip on hover/select */}
                  {selectedDay === index && (
                    <div 
                      className="absolute -top-16 left-1/2 -translate-x-1/2 px-3 py-2 rounded-lg border whitespace-nowrap"
                      style={{
                        background: 'rgba(255, 255, 255, 0.98)',
                        borderColor: 'rgba(143, 214, 148, 0.4)',
                        boxShadow: '0 4px 24px rgba(75, 133, 86, 0.15)'
                      }}
                    >
                      <p className="text-[10px] mb-0.5" style={{ color: '#6DB876', opacity: 0.8 }}>{data.day}</p>
                      <p className="text-xs font-medium" style={{ color: '#5BA5C4' }}>{data.calm}% calm</p>
                      <p className="text-xs" style={{ color: '#D4A74A' }}>{data.overload}% overload</p>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div 
            className="flex items-center justify-between px-4 py-3 rounded-[16px]"
            style={{
              background: 'rgba(168, 216, 255, 0.15)',
              border: '1px solid rgba(168, 216, 255, 0.25)'
            }}
          >
            <div className="text-center flex-1">
              <p className="text-xs text-[#7EC8E3] opacity-60 mb-1">Average Calm</p>
              <p className="text-lg font-medium text-[#A8D8FF]">68%</p>
            </div>
            <div className="w-px h-8 bg-[rgba(126,200,227,0.3)]" />
            <div className="text-center flex-1">
              <p className="text-xs text-[#7EC8E3] opacity-60 mb-1">Best Day</p>
              <p className="text-lg font-medium text-[#5A9A6B]">Sat</p>
            </div>
            <div className="w-px h-8 bg-[rgba(126,200,227,0.3)]" />
            <div className="text-center flex-1">
              <p className="text-xs text-[#7EC8E3] opacity-60 mb-1">Improvement</p>
              <p className="text-lg font-medium text-[#8FD694]">+14%</p>
            </div>
          </div>
        </div>

        {/* Insights Grid */}
        <div className="space-y-4 pb-32">
          <h3 className="text-sm font-medium text-[#5A9A6B] opacity-80 px-1">
            Key Insights
          </h3>

          {/* Insight 1: Most Calming Environment */}
          <div 
            className="rounded-[20px] p-5 backdrop-blur-lg border"
            style={{
              background: 'linear-gradient(135deg, rgba(168, 216, 255, 0.15), rgba(126, 200, 227, 0.08))',
              borderColor: 'rgba(168, 216, 255, 0.25)',
              boxShadow: '0 2px 12px rgba(126, 200, 227, 0.08)'
            }}
          >
            <div className="flex items-start gap-4">
              <div 
                className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                style={{
                  background: 'rgba(168, 216, 255, 0.25)',
                  border: '1px solid rgba(168, 216, 255, 0.35)'
                }}
              >
                <PixelIcon type="sparkle" size={24} color="#5BA5C4" />
              </div>
              
              <div className="flex-1">
                <p className="text-xs uppercase tracking-wide mb-1" style={{ color: '#5BA5C4', opacity: 0.7 }}>
                  Most Calming Environment
                </p>
                <h4 className="text-base font-medium mb-2" style={{ color: '#2B5F4D' }}>
                  Spring Meadow
                </h4>
                <p className="text-sm leading-relaxed" style={{ color: '#4A8556', opacity: 0.85 }}>
                  Used 12 times this week with 94% effectiveness
                </p>
                
                {/* Mini chart */}
                <div className="flex items-center gap-1 mt-3">
                  {[92, 88, 95, 97, 94, 96, 91].map((value, i) => (
                    <div 
                      key={i}
                      className="flex-1 rounded-full"
                      style={{
                        height: `${value * 0.3}px`,
                        background: 'linear-gradient(180deg, #A8D8FF, #7EC8E3)',
                        opacity: 0.6
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Insight 2: Common Overload Trigger */}
          <div 
            className="rounded-[20px] p-5 backdrop-blur-lg border"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 243, 163, 0.15), rgba(255, 232, 112, 0.08))',
              borderColor: 'rgba(255, 243, 163, 0.25)',
              boxShadow: '0 2px 12px rgba(245, 216, 109, 0.08)'
            }}
          >
            <div className="flex items-start gap-4">
              <div 
                className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                style={{
                  background: 'rgba(255, 243, 163, 0.25)',
                  border: '1px solid rgba(255, 232, 112, 0.35)'
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C12 2 9.5 4 9.5 8C9.5 10 10 12 12 12C14 12 14.5 10 14.5 8C14.5 4 12 2 12 2Z" fill="#D4A74A"/>
                  <circle cx="8" cy="16" r="2" fill="#D4A74A" opacity="0.6"/>
                  <circle cx="16" cy="16" r="2" fill="#D4A74A" opacity="0.6"/>
                  <circle cx="12" cy="20" r="2" fill="#D4A74A" opacity="0.6"/>
                </svg>
              </div>
              
              <div className="flex-1">
                <p className="text-xs uppercase tracking-wide mb-1" style={{ color: '#D4A74A', opacity: 0.8 }}>
                  Common Overload Trigger
                </p>
                <h4 className="text-base font-medium mb-2" style={{ color: '#2B5F4D' }}>
                  Crowded Spaces
                </h4>
                <p className="text-sm leading-relaxed" style={{ color: '#4A8556', opacity: 0.85 }}>
                  Detected 8 times • Most common on weekdays
                </p>
                
                {/* Frequency indicators */}
                <div className="flex items-center gap-2 mt-3">
                  <div className="flex-1 h-1.5 rounded-full bg-[rgba(255,243,163,0.2)]">
                    <div 
                      className="h-full rounded-full"
                      style={{ 
                        width: '73%',
                        background: 'linear-gradient(90deg, #FFE870, #D4A74A)'
                      }}
                    />
                  </div>
                  <span className="text-xs font-medium" style={{ color: '#D4A74A' }}>73%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Insight 3: Recommended Recovery */}
          <div 
            className="rounded-[20px] p-5 backdrop-blur-lg border"
            style={{
              background: 'linear-gradient(135deg, rgba(143, 214, 148, 0.15), rgba(168, 230, 163, 0.08))',
              borderColor: 'rgba(143, 214, 148, 0.25)',
              boxShadow: '0 2px 12px rgba(143, 214, 148, 0.08)'
            }}
          >
            <div className="flex items-start gap-4">
              <div 
                className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                style={{
                  background: 'rgba(143, 214, 148, 0.25)',
                  border: '1px solid rgba(143, 214, 148, 0.35)'
                }}
              >
                <PixelIcon type="heart" size={24} color="#6DB876" />
              </div>
              
              <div className="flex-1">
                <p className="text-xs uppercase tracking-wide mb-1" style={{ color: '#6DB876', opacity: 0.8 }}>
                  Recommended Recovery
                </p>
                <h4 className="text-base font-medium mb-2" style={{ color: '#2B5F4D' }}>
                  Memory Atmosphere Mode
                </h4>
                <p className="text-sm leading-relaxed" style={{ color: '#4A8556', opacity: 0.85 }}>
                  Personalized blend shown to reduce stress by 87%
                </p>
                
                {/* Action */}
                <button 
                  className="mt-3 px-4 py-2 rounded-[12px] text-sm font-medium transition-all duration-300 hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, rgba(143, 214, 148, 0.3), rgba(168, 230, 163, 0.25))',
                    border: '1px solid rgba(143, 214, 148, 0.5)',
                    color: '#2B5F4D',
                    boxShadow: '0 2px 8px rgba(143, 214, 148, 0.15)'
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span>Try Now</span>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M4 2L8 6L4 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom spacing */}
        <div className="h-8" />
      </div>

      {/* Animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer {
          0% {
            transform: translateY(100%);
          }
          100% {
            transform: translateY(-100%);
          }
        }
      `}} />
    </div>
  );
}