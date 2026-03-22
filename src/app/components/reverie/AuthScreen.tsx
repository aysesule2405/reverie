import React, { useState } from 'react';
import { ReverieButton } from './ReverieButton';
const ghibliLandscape = '/src/assets/573cbd7ceaaa6d73a84668028329e1776130e659.png';

interface AuthScreenProps {
  onLogin?: (email: string, password: string) => void;
  onSignUp?: (email: string, password: string) => void;
  onGoogleAuth?: () => void;
}

export function AuthScreen({ onLogin, onSignUp, onGoogleAuth }: AuthScreenProps) {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e?: React.FormEvent | React.MouseEvent) => {
    e?.preventDefault();
    if (mode === 'login') {
      onLogin?.(email, password);
    } else {
      onSignUp?.(email, password);
    }
  };

  return (
    <div className="relative w-full max-w-[390px] min-h-[844px] overflow-hidden">
      {/* Beautiful Ghibli-style meadow landscape background */}
      <div className="absolute inset-0">
        <img 
          src={ghibliLandscape}
          alt="Peaceful meadow landscape with morning mist"
          className="w-full h-full object-cover"
        />
        
        {/* Soft overlay for readability */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(255, 254, 248, 0.2) 0%, rgba(255, 254, 248, 0.5) 40%, rgba(255, 254, 248, 0.75) 100%)',
          }}
        />
        
        {/* Subtle paper texture */}
        <div 
          className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-multiply"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '250px 250px'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-[844px] flex flex-col justify-center px-6 bg-[#00000094]">
        
        {/* Header */}
        <div className="text-center mb-12">
          {/* Reverie Title with soft glow */}
          <h1 
            className="text-5xl font-bold tracking-wider mb-4 fade-in-scale"
            style={{
              background: 'linear-gradient(135deg, #B8DDFF 0%, #B5E3B8 50%, #FFEEAD 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 2px 12px rgba(184, 221, 255, 0.3))',
              fontFamily: 'var(--font-heading)',
              letterSpacing: '0.05em'
            }}
          >
            Reverie
          </h1>
          
          {/* Subtitle */}
          <p 
            className="text-sm" 
            style={{ 
              color: 'white',
              fontWeight: '300',
              letterSpacing: '0.02em'
            }}
          >
            {mode === 'login' ? 'Welcome back to your comfort space' : 'Begin your journey to calm'}
          </p>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-5 mb-6 fade-in-up" style={{ animationDelay: '0.3s' }}>
          {/* Email Input */}
          <div className="space-y-2">
            <label 
              htmlFor="email" 
              className="block text-sm font-medium pl-1"
              style={{ color: 'white' }}
            >Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              className="w-full px-5 py-4 rounded-[20px] border-2 transition-all duration-300 focus:outline-none"
              style={{
                background: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(10px)',
                borderColor: 'rgba(143, 214, 148, 0.25)',
                color: '#2B5F4D',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'rgba(168, 216, 255, 0.6)';
                e.target.style.boxShadow = '0 8px 24px rgba(168, 216, 255, 0.15), 0 0 0 4px rgba(168, 216, 255, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(143, 214, 148, 0.25)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label 
              htmlFor="password" 
              className="block text-sm font-medium pl-1"
              style={{ color: 'white' }}
            >Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-5 py-4 rounded-[20px] border-2 transition-all duration-300 focus:outline-none"
              style={{
                background: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(10px)',
                borderColor: 'rgba(143, 214, 148, 0.25)',
                color: '#2B5F4D',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'rgba(168, 216, 255, 0.6)';
                e.target.style.boxShadow = '0 8px 24px rgba(168, 216, 255, 0.15), 0 0 0 4px rgba(168, 216, 255, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(143, 214, 148, 0.25)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Continue Button */}
          <div className="pt-2">
            <ReverieButton 
              variant="primary" 
              size="lg" 
              className="w-full"
              onClick={handleSubmit}
            >
              Continue
            </ReverieButton>
          </div>
        </form>

        {/* Divider */}
        <div className="relative mb-6 fade-in-up" style={{ animationDelay: '0.4s' }}>
          <div className="absolute inset-0 flex items-center">
            <div 
              className="w-full border-t"
              style={{ borderColor: 'rgba(143, 214, 148, 0.2)' }}
            />
          </div>
          <div className="relative flex justify-center text-sm">
            <span 
              className="px-4 py-1 rounded-full"
              style={{ 
                background: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(10px)',
                color: '#4A8556',
              }}
            >
              or
            </span>
          </div>
        </div>

        {/* Google Sign In */}
        <div className="mb-8 fade-in-up" style={{ animationDelay: '0.5s' }}>
          <button
            onClick={onGoogleAuth}
            className="w-full px-6 py-4 rounded-[20px] border-2 transition-all duration-300 flex items-center justify-center gap-3 hover-lift press-scale"
            style={{
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)',
              borderColor: 'rgba(143, 214, 148, 0.3)',
              color: '#2B5F4D',
            }}
          >
            {/* Google Icon */}
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M19.6 10.227c0-.709-.064-1.39-.182-2.045H10v3.868h5.382a4.6 4.6 0 01-1.996 3.018v2.51h3.232c1.891-1.742 2.982-4.305 2.982-7.35z" fill="#4285F4"/>
              <path d="M10 20c2.7 0 4.964-.895 6.618-2.423l-3.232-2.509c-.895.6-2.04.955-3.386.955-2.605 0-4.81-1.76-5.595-4.123H1.064v2.59A9.996 9.996 0 0010 20z" fill="#34A853"/>
              <path d="M4.405 11.9c-.2-.6-.314-1.24-.314-1.9 0-.66.114-1.3.314-1.9V5.51H1.064A9.996 9.996 0 000 10c0 1.614.386 3.14 1.064 4.49L4.405 11.9z" fill="#FBBC05"/>
              <path d="M10 3.977c1.468 0 2.786.505 3.823 1.496l2.868-2.868C14.959.99 12.695 0 10 0 6.09 0 2.71 2.24 1.064 5.51l3.34 2.59C5.19 5.736 7.395 3.977 10 3.977z" fill="#EA4335"/>
            </svg>
            <span className="font-medium">Sign in with Google</span>
          </button>
        </div>

        {/* Toggle Mode Link */}
        <div className="text-center fade-in-up" style={{ animationDelay: '0.6s' }}>
          <button
            onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
            className="text-sm font-medium transition-all duration-300 hover:opacity-100 press-scale inline-block"
            style={{ 
              color: '#5BA5C4',
              opacity: 0.85
            }}
          >
            {mode === 'login' ? 'Create new account' : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>

      {/* Animation Styles */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fade-in-scale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .fade-in-scale {
          animation: fade-in-scale 0.8s ease-out forwards;
        }

        .fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }
      `}} />
    </div>
  );
}