import React from 'react';

interface BottomNavProps {
  activeTab: 'home' | 'atmospheres' | 'insights' | 'settings';
  onTabChange: (tab: 'home' | 'atmospheres' | 'insights' | 'settings') => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    {
      id: 'home' as const,
      label: 'Home',
      icon: (isActive: boolean) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={isActive ? 'pulse-gentle' : ''}>
          <circle 
            cx="12" 
            cy="13" 
            r="7" 
            stroke={isActive ? '#7EC8E3' : '#8FD694'} 
            strokeWidth="2"
            fill={isActive ? 'rgba(126, 200, 227, 0.2)' : 'none'}
            className="transition-all duration-300"
          />
          <circle 
            cx="12" 
            cy="13" 
            r="4" 
            fill={isActive ? '#7EC8E3' : '#8FD694'}
            opacity={isActive ? '0.5' : '0.3'}
            className="transition-all duration-300"
          />
          <circle 
            cx="12" 
            cy="13" 
            r="2" 
            fill={isActive ? '#7EC8E3' : '#8FD694'}
            opacity={isActive ? '0.9' : '0.6'}
            className="transition-all duration-300"
          />
        </svg>
      )
    },
    {
      id: 'atmospheres' as const,
      label: 'Atmospheres',
      icon: (isActive: boolean) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={isActive ? 'float-gentle' : ''}>
          <circle 
            cx="12" 
            cy="12" 
            r="6" 
            stroke={isActive ? '#7EC8E3' : '#8FD694'} 
            strokeWidth="2"
            strokeDasharray="2 3"
            opacity={isActive ? '0.8' : '0.5'}
            className="transition-all duration-300"
          />
          <path 
            d="M12 4L12.5 6L14 6.5L12.5 7L12 9L11.5 7L10 6.5L11.5 6L12 4Z" 
            fill={isActive ? '#7EC8E3' : '#8FD694'}
            opacity={isActive ? '1' : '0.7'}
            className="transition-all duration-300"
          />
          <path 
            d="M18 10L18.3 11L19 11.3L18.3 11.6L18 13L17.7 11.6L17 11.3L17.7 11L18 10Z" 
            fill={isActive ? '#FFF3A3' : '#8FD694'}
            opacity={isActive ? '0.9' : '0.6'}
            className="transition-all duration-300"
          />
          <path 
            d="M6 11L6.3 12L7 12.3L6.3 12.6L6 14L5.7 12.6L5 12.3L5.7 12L6 11Z" 
            fill={isActive ? '#FFF3A3' : '#8FD694'}
            opacity={isActive ? '0.9' : '0.6'}
            className="transition-all duration-300"
          />
          <circle 
            cx="12" 
            cy="12" 
            r="2" 
            fill={isActive ? '#7EC8E3' : '#8FD694'}
            opacity={isActive ? '0.6' : '0.4'}
            className="transition-all duration-300"
          />
        </svg>
      )
    },
    {
      id: 'insights' as const,
      label: 'Insights',
      icon: (isActive: boolean) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect 
            x="4" 
            y="14" 
            width="3" 
            height="6" 
            rx="1" 
            fill={isActive ? '#7EC8E3' : '#8FD694'}
            opacity={isActive ? '0.8' : '0.5'}
          />
          <rect 
            x="9" 
            y="10" 
            width="3" 
            height="10" 
            rx="1" 
            fill={isActive ? '#7EC8E3' : '#8FD694'}
            opacity={isActive ? '1' : '0.6'}
          />
          <rect 
            x="14" 
            y="6" 
            width="3" 
            height="14" 
            rx="1" 
            fill={isActive ? '#7EC8E3' : '#8FD694'}
            opacity={isActive ? '0.9' : '0.55'}
          />
          <rect 
            x="19" 
            y="12" 
            width="3" 
            height="8" 
            rx="1" 
            fill={isActive ? '#7EC8E3' : '#8FD694'}
            opacity={isActive ? '0.7' : '0.5'}
          />
          <path 
            d="M5.5 14L10.5 10L15.5 6L20.5 12" 
            stroke={isActive ? '#A8D8FF' : '#8FD694'} 
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={isActive ? '0.6' : '0.4'}
          />
        </svg>
      )
    },
    {
      id: 'settings' as const,
      label: 'Settings',
      icon: (isActive: boolean) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path 
            d="M12 3L5 6V11C5 16 8 20 12 22C16 20 19 16 19 11V6L12 3Z" 
            stroke={isActive ? '#7EC8E3' : '#8FD694'} 
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill={isActive ? 'rgba(126, 200, 227, 0.15)' : 'none'}
          />
          <line 
            x1="9" 
            y1="11" 
            x2="15" 
            y2="11" 
            stroke={isActive ? '#7EC8E3' : '#8FD694'} 
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity={isActive ? '0.8' : '0.6'}
          />
          <circle 
            cx="11" 
            cy="11" 
            r="1.5" 
            fill={isActive ? '#7EC8E3' : '#8FD694'}
            opacity={isActive ? '1' : '0.7'}
          />
          <line 
            x1="9" 
            y1="15" 
            x2="15" 
            y2="15" 
            stroke={isActive ? '#7EC8E3' : '#8FD694'} 
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity={isActive ? '0.8' : '0.6'}
          />
          <circle 
            cx="13" 
            cy="15" 
            r="1.5" 
            fill={isActive ? '#7EC8E3' : '#8FD694'}
            opacity={isActive ? '1' : '0.7'}
          />
        </svg>
      )
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-6 px-6 pointer-events-none">
      <div className="max-w-[390px] w-full pointer-events-auto">
        {/* Navigation container */}
        <div 
          className="rounded-[24px] px-4 py-3 backdrop-blur-xl border"
          style={{
            background: 'rgba(255, 255, 255, 0.8)',
            borderColor: 'rgba(143, 214, 148, 0.3)',
            boxShadow: '0 -10px 40px rgba(126, 200, 227, 0.15), 0 4px 20px rgba(255, 255, 255, 0.5)'
          }}
        >
          {/* Tabs */}
          <div className="flex items-center justify-around gap-2">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className="flex-1 flex flex-col items-center gap-1.5 py-2 px-3 rounded-[16px] transition-all duration-300 relative"
                  style={{
                    background: isActive 
                      ? 'linear-gradient(135deg, rgba(168, 216, 255, 0.25), rgba(126, 200, 227, 0.2))' 
                      : 'transparent'
                  }}
                >
                  {/* Glow effect for active tab */}
                  {isActive && (
                    <>
                      <div 
                        className="absolute inset-0 rounded-[16px] blur-lg opacity-30"
                        style={{ 
                          background: 'linear-gradient(135deg, #A8D8FF, #7EC8E3)',
                        }}
                      />
                      <div 
                        className="absolute inset-0 rounded-[16px] border opacity-50"
                        style={{ 
                          borderColor: '#7EC8E3',
                        }}
                      />
                    </>
                  )}

                  {/* Icon */}
                  <div className="relative">
                    {tab.icon(isActive)}
                    
                    {/* Icon glow */}
                    {isActive && (
                      <div 
                        className="absolute inset-0 blur-md opacity-40"
                        style={{ 
                          background: 'radial-gradient(circle, #7EC8E3 0%, transparent 70%)',
                        }}
                      />
                    )}
                  </div>

                  {/* Label */}
                  <span 
                    className={`text-[10px] font-medium tracking-wide transition-all duration-300 relative ${
                      isActive ? 'opacity-100' : 'opacity-60'
                    }`}
                    style={{
                      color: isActive ? '#2B5F4D' : '#6DB876',
                    }}
                  >
                    {tab.label}
                  </span>

                  {/* Active indicator dot */}
                  {isActive && (
                    <div 
                      className="absolute -top-1 right-1/2 translate-x-1/2 w-1 h-1 rounded-full animate-pulse"
                      style={{ 
                        background: '#7EC8E3',
                        boxShadow: '0 0 8px #7EC8E3'
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}