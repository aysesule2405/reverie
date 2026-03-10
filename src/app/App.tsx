import React, { useState } from 'react';
import {
  // Screens
  AuthScreen,
  ProfileSetupScreen,
  LandingScreen,
  OnboardingScreen,
  DashboardScreen,
  MemoryAtmospheresScreen,
  ActiveAtmosphereScreen,
  AtmosphereModeScreen,
  ScenarioScreen,
  InsightsScreen,
  TrustSafetyScreen,
  StorytellingMomentScreen,
  // UI Components
  LoadingSpinner,
  SuccessCheckmark,
  BottomNav,
  ReverieButton,
  ReverieCard,
  AtmosphereTile,
  DataCard,
  ReverieSlider,
  PixelIcon,
  // Types
  type UserProfile,
} from './components/reverie';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'auth' | 'profile-setup' | 'landing' | 'onboarding' | 'dashboard' | 'atmospheres' | 'storytelling' | 'active' | 'atmosphere-mode' | 'scenario' | 'insights' | 'trust' | 'library'>('auth');
  const [activeTab, setActiveTab] = useState<'home' | 'atmospheres' | 'insights' | 'settings'>('home');
  const [activeAtmosphere, setActiveAtmosphere] = useState('lofi');
  const [selectedAtmosphereId, setSelectedAtmosphereId] = useState('spring-window');
  const [intensity, setIntensity] = useState(65);
  const [ambience, setAmbience] = useState(40);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // Handle tab navigation
  const handleTabChange = (tab: 'home' | 'atmospheres' | 'insights' | 'settings') => {
    setActiveTab(tab);
    switch (tab) {
      case 'home':
        setCurrentScreen('dashboard');
        break;
      case 'atmospheres':
        setCurrentScreen('atmospheres');
        break;
      case 'insights':
        setCurrentScreen('insights');
        break;
      case 'settings':
        setCurrentScreen('trust');
        break;
    }
  };

  // Show auth screen
  if (currentScreen === 'auth') {
    return (
      <div className="min-h-screen bg-[#F7FFF7] flex items-center justify-center">
        <AuthScreen 
          onLogin={(email, password) => {
            // Handle login logic here
            console.log('Login:', email);
            setCurrentScreen('profile-setup');
          }}
          onSignUp={(email, password) => {
            // Handle signup logic here
            console.log('Sign up:', email);
            setCurrentScreen('profile-setup');
          }}
          onGoogleAuth={() => {
            // Handle Google auth here
            console.log('Google auth');
            setCurrentScreen('profile-setup');
          }}
        />
      </div>
    );
  }

  // Show profile setup screen
  if (currentScreen === 'profile-setup') {
    return (
      <div className="min-h-screen bg-[#F7FFF7] flex items-center justify-center">
        <ProfileSetupScreen 
          onComplete={(profile) => {
            setUserProfile(profile);
            setCurrentScreen('landing');
          }}
          onBack={() => setCurrentScreen('auth')}
        />
      </div>
    );
  }

  // Show landing screen
  if (currentScreen === 'landing') {
    return (
      <div className="min-h-screen bg-[#F7FFF7] flex items-center justify-center">
        <LandingScreen onBegin={() => setCurrentScreen('onboarding')} />
      </div>
    );
  }

  // Show onboarding screen
  if (currentScreen === 'onboarding') {
    return (
      <div className="min-h-screen bg-[#F7FFF7] flex items-center justify-center">
        <OnboardingScreen onContinue={() => {
          setCurrentScreen('dashboard');
          setActiveTab('home');
        }} />
      </div>
    );
  }

  // Show dashboard with navigation
  if (currentScreen === 'dashboard') {
    return (
      <div className="min-h-screen bg-[#F7FFF7] flex items-center justify-center">
        <DashboardScreen userName={userProfile?.name || 'Guest'} />
        <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
      </div>
    );
  }

  // Show memory atmospheres with navigation
  if (currentScreen === 'atmospheres') {
    return (
      <div className="min-h-screen bg-[#F7FFF7] flex items-center justify-center">
        <MemoryAtmospheresScreen 
          onSelect={(id) => {
            setSelectedAtmosphereId(id);
            setCurrentScreen('atmosphere-mode');
          }}
          onBack={() => {
            setCurrentScreen('dashboard');
            setActiveTab('home');
          }}
        />
        <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
      </div>
    );
  }

  // Show immersive atmosphere mode (no navigation - full immersion)
  if (currentScreen === 'atmosphere-mode') {
    return (
      <div className="min-h-screen bg-[#F7FFF7] flex items-center justify-center">
        <AtmosphereModeScreen 
          atmosphereId={selectedAtmosphereId}
          onExit={() => {
            setCurrentScreen('atmospheres');
            setActiveTab('atmospheres');
          }}
        />
      </div>
    );
  }

  // Show scenario detection
  if (currentScreen === 'scenario') {
    return (
      <div className="min-h-screen bg-[#F7FFF7] flex items-center justify-center">
        <ScenarioScreen onActivate={() => setCurrentScreen('active')} />
      </div>
    );
  }

  // Show insights with navigation
  if (currentScreen === 'insights') {
    return (
      <div className="min-h-screen bg-[#F7FFF7] flex items-center justify-center">
        <InsightsScreen onBack={() => {
          setCurrentScreen('dashboard');
          setActiveTab('home');
        }} />
        <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
      </div>
    );
  }

  // Show trust & safety with navigation
  if (currentScreen === 'trust') {
    return (
      <div className="min-h-screen bg-[#F7FFF7] flex items-center justify-center">
        <TrustSafetyScreen 
          onBack={() => {
            setCurrentScreen('dashboard');
            setActiveTab('home');
          }}
          onContinue={() => {
            setCurrentScreen('dashboard');
            setActiveTab('home');
          }}
        />
        <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
      </div>
    );
  }

  // Show storytelling moment
  if (currentScreen === 'storytelling') {
    return (
      <div className="min-h-screen bg-[#F7FFF7] flex items-center justify-center">
        <StorytellingMomentScreen 
          detectedPressure="rising"
          atmosphereName="Spring Meadow"
          onEnter={() => {
            setCurrentScreen('active');
          }} 
        />
      </div>
    );
  }

  // Rest of the app (design system showcase)
  const atmospheres = [
    {
      id: 'lofi',
      title: 'Lo-Fi Study',
      icon: <PixelIcon type="music" size={32} color="#A9B8FF" />,
      gradient: 'linear-gradient(135deg, #6A7FDB, #A9B8FF)'
    },
    {
      id: 'rainy',
      title: 'Rainy Day',
      icon: <PixelIcon type="cloud" size={32} color="#A9B8FF" />,
      gradient: 'linear-gradient(135deg, #A9B8FF, #F6D6FF)'
    },
    {
      id: 'midnight',
      title: 'Midnight',
      icon: <PixelIcon type="moon" size={32} color="#A9B8FF" />,
      gradient: 'linear-gradient(135deg, #6A7FDB, #0F1224)'
    },
    {
      id: 'sunrise',
      title: 'Sunrise',
      icon: <PixelIcon type="sun" size={32} color="#FFB8A3" />,
      gradient: 'linear-gradient(135deg, #FFB8A3, #F6D6FF)'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0F1224] overflow-hidden relative">
      {/* Animated aurora background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-0 left-0 w-[800px] h-[800px] rounded-full blur-[120px] opacity-20 animate-pulse"
          style={{ 
            background: 'radial-gradient(circle, #6A7FDB 0%, transparent 70%)',
            animation: 'float 20s ease-in-out infinite'
          }}
        />
        <div 
          className="absolute top-1/3 right-0 w-[600px] h-[600px] rounded-full blur-[100px] opacity-15"
          style={{ 
            background: 'radial-gradient(circle, #A9B8FF 0%, transparent 70%)',
            animation: 'float 15s ease-in-out infinite reverse'
          }}
        />
        <div 
          className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[90px] opacity-10"
          style={{ 
            background: 'radial-gradient(circle, #F6D6FF 0%, transparent 70%)',
            animation: 'float 18s ease-in-out infinite'
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-md mx-auto px-6 py-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2 pt-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <PixelIcon type="sparkle" size={28} color="#FFB8A3" />
            <h1 className="text-3xl font-semibold bg-gradient-to-r from-[#A9B8FF] via-[#F6D6FF] to-[#FFB8A3] bg-clip-text text-transparent">
              Reverie
            </h1>
            <PixelIcon type="sparkle" size={28} color="#FFB8A3" />
          </div>
          <p className="text-sm text-[#A9B8FF] opacity-80">
            Your nostalgic wellness sanctuary
          </p>
        </div>

        {/* Data Cards Grid */}
        <div className="grid grid-cols-2 gap-4">
          <DataCard
            label="Calm Score"
            value={87}
            unit="%"
            icon={<PixelIcon type="heart" size={20} color="#6A7FDB" />}
            trend="up"
            trendValue="+12%"
            color="#6A7FDB"
          />
          <DataCard
            label="Focus Time"
            value={42}
            unit="min"
            icon={<PixelIcon type="star" size={20} color="#A9B8FF" />}
            trend="neutral"
            trendValue="+0%"
            color="#A9B8FF"
          />
        </div>

        {/* Atmosphere Selection */}
        <ReverieCard variant="glass" className="p-6">
          <h3 className="text-base text-[#F6D6FF] mb-4">Choose Your Atmosphere</h3>
          <div className="grid grid-cols-2 gap-3">
            {atmospheres.map((atm) => (
              <AtmosphereTile
                key={atm.id}
                title={atm.title}
                icon={atm.icon}
                gradient={atm.gradient}
                isActive={activeAtmosphere === atm.id}
                onClick={() => setActiveAtmosphere(atm.id)}
              />
            ))}
          </div>
        </ReverieCard>

        {/* Controls Card */}
        <ReverieCard variant="glass" className="p-6 space-y-6">
          <h3 className="text-base text-[#F6D6FF]">Environment Settings</h3>
          
          <ReverieSlider
            label="Intensity"
            value={intensity}
            onChange={setIntensity}
            min={0}
            max={100}
            unit="%"
            color="#6A7FDB"
          />
          
          <ReverieSlider
            label="Ambience"
            value={ambience}
            onChange={setAmbience}
            min={0}
            max={100}
            unit="%"
            color="#A9B8FF"
          />
        </ReverieCard>

        {/* Session Card */}
        <ReverieCard variant="glow" className="p-6 text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <PixelIcon type="book" size={24} color="#F6D6FF" />
            <h3 className="text-base text-[#F6D6FF]">Start Your Session</h3>
          </div>
          <p className="text-sm text-[#A9B8FF] opacity-80 leading-relaxed">
            Immerse yourself in a calming environment designed to reduce stress and evoke gentle nostalgia.
          </p>
          <ReverieButton variant="aurora" size="lg" className="w-full">
            Begin Journey
          </ReverieButton>
        </ReverieCard>

        {/* Button Examples */}
        <ReverieCard variant="glass" className="p-6 space-y-4">
          <h3 className="text-base text-[#F6D6FF] mb-4">Component Library</h3>
          
          <div className="space-y-3">
            <div>
              <p className="text-xs text-[#A9B8FF] mb-2 uppercase tracking-wide">Buttons</p>
              <div className="flex flex-wrap gap-2">
                <ReverieButton variant="primary" size="sm">Primary</ReverieButton>
                <ReverieButton variant="secondary" size="sm">Secondary</ReverieButton>
                <ReverieButton variant="ghost" size="sm">Ghost</ReverieButton>
              </div>
            </div>

            <div>
              <p className="text-xs text-[#A9B8FF] mb-2 uppercase tracking-wide">Pixel Icons</p>
              <div className="flex flex-wrap gap-3">
                <PixelIcon type="heart" size={28} color="#6A7FDB" />
                <PixelIcon type="star" size={28} color="#A9B8FF" />
                <PixelIcon type="cloud" size={28} color="#F6D6FF" />
                <PixelIcon type="moon" size={28} color="#6A7FDB" />
                <PixelIcon type="sun" size={28} color="#FFB8A3" />
                <PixelIcon type="sparkle" size={28} color="#A9B8FF" />
                <PixelIcon type="music" size={28} color="#F6D6FF" />
                <PixelIcon type="book" size={28} color="#FFB8A3" />
              </div>
            </div>

            <div>
              <p className="text-xs text-[#A9B8FF] mb-2 uppercase tracking-wide">Card Variants</p>
              <div className="space-y-2">
                <ReverieCard variant="glass" className="p-3">
                  <p className="text-xs text-[#A9B8FF]">Glass Card</p>
                </ReverieCard>
                <ReverieCard variant="solid" className="p-3">
                  <p className="text-xs text-[#A9B8FF]">Solid Card</p>
                </ReverieCard>
                <ReverieCard variant="glow" className="p-3">
                  <p className="text-xs text-[#A9B8FF]">Glow Card</p>
                </ReverieCard>
              </div>
            </div>
          </div>
        </ReverieCard>

        {/* Color Palette */}
        <ReverieCard variant="glass" className="p-6">
          <h3 className="text-base text-[#F6D6FF] mb-4">Color Palette</h3>
          <div className="grid grid-cols-4 gap-3">
            <div className="text-center">
              <div className="w-full aspect-square rounded-2xl bg-[#6A7FDB] shadow-[0_0_20px_rgba(106,127,219,0.5)] mb-2" />
              <p className="text-xs text-[#A9B8FF]">Indigo</p>
            </div>
            <div className="text-center">
              <div className="w-full aspect-square rounded-2xl bg-[#A9B8FF] shadow-[0_0_20px_rgba(169,184,255,0.5)] mb-2" />
              <p className="text-xs text-[#A9B8FF]">Lavender</p>
            </div>
            <div className="text-center">
              <div className="w-full aspect-square rounded-2xl bg-[#F6D6FF] shadow-[0_0_20px_rgba(246,214,255,0.5)] mb-2" />
              <p className="text-xs text-[#A9B8FF]">Pink</p>
            </div>
            <div className="text-center">
              <div className="w-full aspect-square rounded-2xl bg-[#FFB8A3] shadow-[0_0_20px_rgba(255,184,163,0.5)] mb-2" />
              <p className="text-xs text-[#A9B8FF]">Peach</p>
            </div>
          </div>
        </ReverieCard>

        {/* Footer */}
        <div className="text-center py-4">
          <p className="text-xs text-[#A9B8FF] opacity-50">
            Designed with nostalgia & care
          </p>
        </div>
      </div>

      {/* Global animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -30px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
      `}} />
    </div>
  );
}