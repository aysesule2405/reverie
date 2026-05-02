import { Link } from 'react-router';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../ThemeContext';
import { getLogoByTheme } from '../../assets/logos';

const FEATURES = [
  {
    icon: '◈',
    title: 'Mood Spaces',
    description: 'Craft private sanctuaries for every mood — cozy, dreamy, melancholic, joyful. Each space holds a piece of your inner world.',
    color: '#6A7FDB',
    bg: 'rgba(106,127,219,0.08)',
  },
  {
    icon: '♪',
    title: 'Soundtrack Curation',
    description: 'Save links to the songs that shape your emotional landscape. Revisit exactly how something felt, note by note.',
    color: '#A9B8FF',
    bg: 'rgba(169,184,255,0.08)',
  },
  {
    icon: '✦',
    title: 'Memory Reflections',
    description: 'Write free-form reflections, tag emotions, and attach images. Build a living archive of your inner life.',
    color: '#F6A8D0',
    bg: 'rgba(246,168,208,0.08)',
  },
  {
    icon: '◉',
    title: 'AI Mood Boards',
    description: 'Describe your current mood and generate a visual prompt for an AI mood board — a window into your emotional palette.',
    color: '#FFB8A3',
    bg: 'rgba(255,184,163,0.08)',
  },
];

export default function Landing() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: 'var(--rv-bg-solid)' }}>

      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full blur-3xl opacity-20"
          style={{ background: 'radial-gradient(circle, #A9B8FF, transparent 70%)' }} />
        <div className="absolute top-1/3 -right-48 w-[500px] h-[500px] rounded-full blur-3xl opacity-15"
          style={{ background: 'radial-gradient(circle, #F6D6FF, transparent 70%)' }} />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-10"
          style={{ background: 'radial-gradient(circle, #FFB8A3, transparent 70%)' }} />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-5 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <img
            src={getLogoByTheme(isDark, 'written')}
            alt="Reverie"
            className="h-9 object-contain"
          />
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-sm transition-all duration-200"
            style={{ color: 'var(--rv-text-soft)', background: 'var(--rv-tag)' }}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <Link
            to="/login"
            className="px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-indigo-50"
            style={{ color: '#6A7FDB' }}
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="px-5 py-2 rounded-xl text-sm font-medium text-white transition-all duration-200 hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #6A7FDB, #A9B8FF)', boxShadow: '0 4px 14px rgba(106,127,219,0.3)' }}
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 max-w-5xl mx-auto px-8 pt-20 pb-28 text-center">
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-8"
          style={{ background: 'rgba(169,184,255,0.15)', color: '#6A7FDB', border: '1px solid rgba(169,184,255,0.3)' }}
        >
          <span>✦</span>
          <span>Your personal mood sanctuary</span>
        </div>

        <h1
          className="font-heading font-semibold leading-tight mb-6"
          style={{ color: 'var(--rv-text)', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.15 }}
        >
          Curate the feelings
          <br />
          <span style={{
            background: 'linear-gradient(135deg, #6A7FDB 0%, #A9B8FF 40%, #F6D6FF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            that make you, you.
          </span>
        </h1>

        <p
          className="text-lg leading-relaxed mx-auto mb-10 max-w-xl"
          style={{ color: 'var(--rv-text-soft)' }}
        >
          Reverie is a private space to save mood boards, reflections, soundtracks, and emotions —
          a living memory of your inner world, beautifully organized.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/signup"
            className="px-8 py-3.5 rounded-2xl text-base font-medium text-white transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
            style={{
              background: 'linear-gradient(135deg, #6A7FDB 0%, #A9B8FF 100%)',
              boxShadow: '0 8px 28px rgba(106,127,219,0.35)',
            }}
          >
            Begin Your Journey →
          </Link>
          <Link
            to="/login"
            className="px-8 py-3.5 rounded-2xl text-base font-medium transition-all duration-200"
            style={{ color: '#6A7FDB', border: '1.5px solid rgba(169,184,255,0.4)' }}
          >
            I have an account
          </Link>
        </div>

        {/* Hero preview card */}
        <div className="mt-20 max-w-2xl mx-auto">
          <div
            className="rounded-3xl p-8 text-left relative overflow-hidden"
            style={{
              background: 'var(--rv-hero-card)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 20px 60px rgba(106,127,219,0.12)',
              border: '1px solid var(--rv-border)',
            }}
          >
            <div className="flex items-start justify-between mb-5">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full" style={{ background: 'var(--rv-tag)', color: '#6A7FDB' }}>
                    cozy
                  </span>
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full" style={{ background: 'rgba(246,214,255,0.3)', color: '#A07AB0' }}>
                    private
                  </span>
                </div>
                <h3 className="font-heading font-semibold text-xl" style={{ color: 'var(--rv-text)' }}>
                  Sunday Morning in Autumn
                </h3>
                <p className="text-sm mt-1" style={{ color: 'var(--rv-text-secondary)' }}>
                  The kind of morning where everything feels still and amber-coloured…
                </p>
              </div>
            </div>
            <div className="flex gap-2 mb-5">
              {['#6A7FDB', '#A9B8FF', '#F6D6FF', '#FFB8A3', '#D4E8F7'].map((c) => (
                <div key={c} className="w-7 h-7 rounded-full shadow-sm flex-shrink-0"
                  style={{ background: c, border: '2px solid white' }} />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span style={{ color: '#A9B8FF' }}>♪</span>
              <span className="text-xs" style={{ color: 'var(--rv-text-secondary)' }}>3 songs · Last edited today</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 max-w-6xl mx-auto px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="font-heading font-semibold text-3xl mb-4" style={{ color: 'var(--rv-text)' }}>
            Everything your inner world needs
          </h2>
          <p className="text-base" style={{ color: 'var(--rv-text-secondary)' }}>
            Built for deep personal reflection, beautifully simple to use.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
              style={{
                background: 'var(--rv-card-section)',
                backdropFilter: 'blur(16px)',
                border: '1px solid var(--rv-border)',
                boxShadow: '0 4px 20px rgba(106,127,219,0.07)',
              }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                style={{ background: f.bg }}
              >
                <span className="text-xl" style={{ color: f.color }}>{f.icon}</span>
              </div>
              <h3 className="font-heading font-semibold text-base mb-2" style={{ color: 'var(--rv-text)' }}>
                {f.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--rv-text-secondary)' }}>
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative z-10 max-w-4xl mx-auto px-8 py-20">
        <div
          className="rounded-3xl px-10 py-14 text-center relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #6A7FDB 0%, #9B8FDB 50%, #A9B8FF 100%)',
            boxShadow: '0 20px 60px rgba(106,127,219,0.35)',
          }}
        >
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }} />
          <h2 className="font-heading font-semibold text-3xl text-white mb-4 relative z-10">
            Start building your Reverie today.
          </h2>
          <p className="text-base mb-8 relative z-10" style={{ color: 'rgba(255,255,255,0.8)' }}>
            Free, private, and entirely yours.
          </p>
          <Link
            to="/signup"
            className="inline-block px-8 py-3.5 rounded-2xl text-sm font-semibold transition-all duration-200 hover:opacity-90 hover:scale-[1.02] relative z-10"
            style={{ background: 'white', color: '#6A7FDB', boxShadow: '0 4px 16px rgba(0,0,0,0.12)' }}
          >
            Create Your Space →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 text-center py-10 px-8">
        <p className="text-sm" style={{ color: 'var(--rv-text-pale)' }}>
          ✦ Reverie — Designed with softness &amp; care
        </p>
      </footer>
    </div>
  );
}
