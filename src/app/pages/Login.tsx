import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../AuthContext';
import { useTheme } from '../ThemeContext';
import { getLogoByTheme } from '../../assets/logos';

export default function Login() {
  const { login } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!email.trim()) return 'Email is required';
    if (!/\S+@\S+\.\S+/.test(email)) return 'Please enter a valid email';
    if (!password) return 'Password is required';
    return '';
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }
    setError('');
    setLoading(true);
    try {
      await login(email.trim(), password);
      navigate('/dashboard');
    } catch (e: any) {
      setError(e.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--rv-bg-solid)' }}>
      {/* Ambient orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ background: 'radial-gradient(circle, #A9B8FF, transparent 70%)' }} />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full blur-3xl opacity-15"
          style={{ background: 'radial-gradient(circle, #F6D6FF, transparent 70%)' }} />
      </div>

      {/* Left panel — decorative */}
      <div
        className="hidden lg:flex flex-col justify-between w-[45%] relative overflow-hidden"
        style={{ background: 'linear-gradient(145deg, #6A7FDB 0%, #9B8FDB 60%, #A9B8FF 100%)' }}
      >
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
        <div className="relative z-10 p-12">
          <Link to="/">
            <img src={getLogoByTheme(isDark, 'written')} alt="Reverie" className={`h-10 object-contain${isDark ? '' : ' brightness-0 invert'}`} />
          </Link>
        </div>
        <div className="relative z-10 p-12">
          <blockquote className="font-atmosphere text-2xl text-white leading-relaxed mb-4" style={{ opacity: 0.92 }}>
            "Every mood is a memory in the making."
          </blockquote>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>
            Welcome back to your sanctuary.
          </p>
        </div>
        <div className="absolute bottom-20 right-12 w-40 h-40 rounded-full opacity-15" style={{ background: 'white' }} />
        <div className="absolute top-1/2 -right-16 w-48 h-48 rounded-full opacity-10" style={{ background: 'white' }} />
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center px-8 py-12 relative z-10">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <Link to="/" className="flex mb-10 lg:hidden">
            <img src={getLogoByTheme(isDark, 'written')} alt="Reverie" className="h-9 object-contain" />
          </Link>

          <h2 className="font-heading font-semibold text-3xl mb-2" style={{ color: 'var(--rv-text)' }}>
            Welcome back
          </h2>
          <p className="text-sm mb-8" style={{ color: 'var(--rv-text-secondary)' }}>
            Sign in to your mood space
          </p>

          {error && (
            <div className="px-4 py-3 rounded-xl text-sm mb-6"
              style={{ background: 'var(--rv-error-bg)', color: 'var(--rv-error)', border: '1px solid var(--rv-error-border)' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--rv-text-label)' }}>
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                style={{
                  background: 'var(--rv-input)',
                  border: '1.5px solid var(--rv-border-input)',
                  color: 'var(--rv-text)',
                  boxShadow: '0 2px 8px rgba(106,127,219,0.05)',
                }}
                onFocus={(e) => { e.target.style.borderColor = '#6A7FDB'; e.target.style.boxShadow = '0 0 0 3px rgba(106,127,219,0.12)'; }}
                onBlur={(e) => { e.target.style.borderColor = 'var(--rv-border-input)'; e.target.style.boxShadow = '0 2px 8px rgba(106,127,219,0.05)'; }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--rv-text-label)' }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                style={{
                  background: 'var(--rv-input)',
                  border: '1.5px solid var(--rv-border-input)',
                  color: 'var(--rv-text)',
                  boxShadow: '0 2px 8px rgba(106,127,219,0.05)',
                }}
                onFocus={(e) => { e.target.style.borderColor = '#6A7FDB'; e.target.style.boxShadow = '0 0 0 3px rgba(106,127,219,0.12)'; }}
                onBlur={(e) => { e.target.style.borderColor = 'var(--rv-border-input)'; e.target.style.boxShadow = '0 2px 8px rgba(106,127,219,0.05)'; }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{
                background: 'linear-gradient(135deg, #6A7FDB, #A9B8FF)',
                boxShadow: '0 6px 20px rgba(106,127,219,0.3)',
              }}
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-sm mt-8" style={{ color: 'var(--rv-text-secondary)' }}>
            New to Reverie?{' '}
            <Link to="/signup" className="font-medium hover:underline" style={{ color: '#6A7FDB' }}>
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
