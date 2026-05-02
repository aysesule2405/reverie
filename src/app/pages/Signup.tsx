import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../AuthContext';
import { useTheme } from '../ThemeContext';
import { getLogoByTheme } from '../../assets/logos';

const LEFT_FEATURES = [
  { icon: '◈', text: 'Create unlimited mood spaces' },
  { icon: '⊞', text: 'Upload images, videos, and audio' },
  { icon: '♪', text: 'Build your personal music playlist' },
  { icon: '🕰', text: 'Browse your mood timeline anytime' },
];

export default function Signup() {
  const { register } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!name.trim()) return 'Name is required';
    if (!email.trim()) return 'Email is required';
    if (!/\S+@\S+\.\S+/.test(email)) return 'Please enter a valid email';
    if (!password) return 'Password is required';
    if (password.length < 6) return 'Password must be at least 6 characters';
    if (password !== confirm) return 'Passwords do not match';
    if (!agreed) return 'Please agree to the Privacy Policy and Terms of Service to continue';
    return '';
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }
    setError('');
    setLoading(true);
    try {
      await register(name.trim(), email.trim(), password);
      navigate('/dashboard');
    } catch (e: any) {
      setError(e.message || 'Could not create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--rv-bg-solid)' }}>

      {/* ── Left panel ───────────────────────────────────────────────────────── */}
      <div
        className="hidden lg:flex flex-col w-[44%] relative overflow-hidden"
        style={{ background: 'linear-gradient(145deg, #8A7FD0 0%, #A9A0F0 55%, #C8B8FF 100%)' }}
      >
        {/* Dot grid */}
        <div className="absolute inset-0 opacity-[0.07]" style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }} />

        {/* Decorative orbs */}
        <div className="absolute bottom-24 right-10 w-56 h-56 rounded-full opacity-[0.12]" style={{ background: 'white' }} />
        <div className="absolute top-1/3 -right-20 w-64 h-64 rounded-full opacity-[0.08]" style={{ background: 'white' }} />
        <div className="absolute top-16 right-1/3 w-20 h-20 rounded-full opacity-[0.10]" style={{ background: 'white' }} />

        {/* Logo — top */}
        <div className="relative z-10 px-12 pt-10">
          <Link to="/">
            <img
              src={getLogoByTheme(isDark, 'written')}
              alt="Reverie"
              className="h-16 object-contain brightness-0 invert"
            />
          </Link>
        </div>

        {/* Middle — features */}
        <div className="relative z-10 flex-1 flex flex-col justify-center px-12">
          <p className="text-xs font-semibold uppercase tracking-widest mb-6" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Everything you get
          </p>
          <ul className="space-y-4">
            {LEFT_FEATURES.map((f) => (
              <li key={f.text} className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-sm"
                  style={{ background: 'rgba(255,255,255,0.15)', color: 'white' }}>
                  {f.icon}
                </span>
                <span className="text-sm" style={{ color: 'rgba(255,255,255,0.85)' }}>{f.text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom — quote */}
        <div className="relative z-10 px-12 pb-12">
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.18)', paddingTop: '1.5rem' }}>
            <blockquote className="font-atmosphere text-xl text-white leading-relaxed mb-3" style={{ opacity: 0.92 }}>
              "A mood remembered is a memory kept alive."
            </blockquote>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Your private sanctuary awaits.
            </p>
          </div>
        </div>
      </div>

      {/* ── Right panel — form ───────────────────────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center px-8 py-10 relative z-10">
        <div className="w-full max-w-[420px]">

          {/* Mobile logo */}
          <Link to="/" className="flex mb-8 lg:hidden">
            <img src={getLogoByTheme(isDark, 'written')} alt="Reverie" className="h-12 object-contain" />
          </Link>

          <h2 className="font-heading font-semibold text-3xl mb-1.5" style={{ color: 'var(--rv-text)' }}>
            Create your space
          </h2>
          <p className="text-sm mb-7" style={{ color: 'var(--rv-text-secondary)' }}>
            Join Reverie — free, private, entirely yours.
          </p>

          {error && (
            <div className="px-4 py-3 rounded-xl text-sm mb-5"
              style={{ background: 'var(--rv-error-bg)', color: 'var(--rv-error)', border: '1px solid var(--rv-error-border)' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Name */}
            <Field
              label="Your name"
              type="text"
              value={name}
              onChange={setName}
              placeholder="Ava Sinclair"
              autoComplete="name"
            />

            {/* Email */}
            <Field
              label="Email address"
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="you@example.com"
              autoComplete="email"
            />

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--rv-text-label)' }}>
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  autoComplete="new-password"
                  className="w-full px-4 py-3.5 pr-12 rounded-2xl text-sm outline-none transition-all duration-200"
                  style={{
                    background: 'var(--rv-input)',
                    border: '1.5px solid var(--rv-border-input)',
                    color: 'var(--rv-text)',
                  }}
                  onFocus={(e) => { e.target.style.borderColor = '#6A7FDB'; e.target.style.boxShadow = '0 0 0 3px rgba(106,127,219,0.12)'; }}
                  onBlur={(e) => { e.target.style.borderColor = 'var(--rv-border-input)'; e.target.style.boxShadow = 'none'; }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-70"
                  style={{ color: 'var(--rv-text-soft)' }}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            {/* Confirm password */}
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--rv-text-label)' }}>
                Confirm password
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  className="w-full px-4 py-3.5 pr-12 rounded-2xl text-sm outline-none transition-all duration-200"
                  style={{
                    background: 'var(--rv-input)',
                    border: '1.5px solid var(--rv-border-input)',
                    color: 'var(--rv-text)',
                  }}
                  onFocus={(e) => { e.target.style.borderColor = '#6A7FDB'; e.target.style.boxShadow = '0 0 0 3px rgba(106,127,219,0.12)'; }}
                  onBlur={(e) => { e.target.style.borderColor = 'var(--rv-border-input)'; e.target.style.boxShadow = 'none'; }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-70"
                  style={{ color: 'var(--rv-text-soft)' }}
                  aria-label={showConfirm ? 'Hide password' : 'Show password'}
                >
                  {showConfirm ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            {/* Privacy agreement */}
            <label className="flex items-start gap-3 cursor-pointer select-none pt-1">
              <div className="relative flex-shrink-0 mt-0.5">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="sr-only"
                />
                <div
                  className="w-5 h-5 rounded-md flex items-center justify-center transition-all duration-200"
                  style={{
                    background: agreed ? 'linear-gradient(135deg, #6A7FDB, #A9B8FF)' : 'var(--rv-input)',
                    border: agreed ? 'none' : '1.5px solid var(--rv-border-input)',
                    boxShadow: agreed ? '0 2px 8px rgba(106,127,219,0.25)' : 'none',
                  }}
                >
                  {agreed && (
                    <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                      <path d="M1 4.5L4 7.5L10 1.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              </div>
              <span className="text-xs leading-relaxed" style={{ color: 'var(--rv-text-secondary)' }}>
                By creating an account, I agree to Reverie's{' '}
                <span className="font-medium" style={{ color: '#6A7FDB' }}>Privacy Policy</span>
                {' '}and{' '}
                <span className="font-medium" style={{ color: '#6A7FDB' }}>Terms of Service</span>.
                Your data is private and never shared without your permission.
              </span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-2xl text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 hover:scale-[1.01] disabled:opacity-60 disabled:cursor-not-allowed"
              style={{
                background: 'linear-gradient(135deg, #6A7FDB, #A9B8FF)',
                boxShadow: '0 6px 20px rgba(106,127,219,0.32)',
                marginTop: '0.5rem',
              }}
            >
              {loading ? 'Creating account…' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm mt-7" style={{ color: 'var(--rv-text-secondary)' }}>
            Already have an account?{' '}
            <Link to="/login" className="font-semibold hover:underline" style={{ color: '#6A7FDB' }}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function Field({
  label, type, value, onChange, placeholder, autoComplete,
}: {
  label: string; type: string; value: string;
  onChange: (v: string) => void; placeholder: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--rv-text-label)' }}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="w-full px-4 py-3.5 rounded-2xl text-sm outline-none transition-all duration-200"
        style={{
          background: 'var(--rv-input)',
          border: '1.5px solid var(--rv-border-input)',
          color: 'var(--rv-text)',
        }}
        onFocus={(e) => { e.target.style.borderColor = '#6A7FDB'; e.target.style.boxShadow = '0 0 0 3px rgba(106,127,219,0.12)'; }}
        onBlur={(e) => { e.target.style.borderColor = 'var(--rv-border-input)'; e.target.style.boxShadow = 'none'; }}
      />
    </div>
  );
}
