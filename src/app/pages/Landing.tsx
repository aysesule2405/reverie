import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { Sun, Moon, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '../ThemeContext';
import { getLogoByTheme } from '../../assets/logos';
import { api } from '../../api/client';

// ── Types ─────────────────────────────────────────────────────────────────────
interface PublicSpace {
  _id: string;
  title: string;
  mood?: string;
  description?: string;
  category?: string;
  coverImageUrl?: string;
  images?: string[];
  videos?: string[];
  moodTags?: string[];
  user: { name: string; avatarUrl?: string };
  createdAt: string;
}

// ── Static data ───────────────────────────────────────────────────────────────
const HOW_IT_WORKS = [
  {
    step: '01',
    icon: '✦',
    title: 'Create a mood space',
    body: 'Give your moment a name, pick a mood, and open a new space. It takes thirty seconds.',
    color: '#6A7FDB',
    bg: 'rgba(106,127,219,0.09)',
  },
  {
    step: '02',
    icon: '⊞',
    title: 'Add images, videos & audio',
    body: 'Upload files or paste links. Layer in color palettes, song links, and a personal reflection.',
    color: '#A9B8FF',
    bg: 'rgba(169,184,255,0.09)',
  },
  {
    step: '03',
    icon: '◉',
    title: 'Keep it private or share it',
    body: 'Your spaces are private by default. Make one public any time to let others feel what you felt.',
    color: '#F6A8D0',
    bg: 'rgba(246,168,208,0.09)',
  },
  {
    step: '04',
    icon: '◈',
    title: 'Revisit your mood timeline',
    body: 'Browse a living timeline of every moment you curated — filtered by mood, date, or visibility.',
    color: '#FFB8A3',
    bg: 'rgba(255,184,163,0.09)',
  },
];

const FEATURES = [
  { icon: '◈', title: 'Mood Spaces', description: 'Craft private sanctuaries for every mood — cozy, dreamy, melancholic, joyful. Each space holds a piece of your inner world.', color: '#6A7FDB', bg: 'rgba(106,127,219,0.08)' },
  { icon: '♪', title: 'Soundtrack Curation', description: 'Save links to the songs that shape your emotional landscape. Revisit exactly how something felt, note by note.', color: '#A9B8FF', bg: 'rgba(169,184,255,0.08)' },
  { icon: '▶', title: 'Video & Images', description: 'Upload videos, photos, and audio files directly. Build a rich visual record of your mood, not just words.', color: '#F6A8D0', bg: 'rgba(246,168,208,0.08)' },
  { icon: '✦', title: 'Memory Reflections', description: 'Write free-form reflections, tag emotions, and attach a color palette. Build a living archive of your inner life.', color: '#FFB8A3', bg: 'rgba(255,184,163,0.08)' },
];

const MOOD_LABELS: Record<string, string> = {
  peaceful: '🌿 Peaceful', joyful: '☀️ Joyful', melancholic: '🌧️ Melancholic',
  nostalgic: '🍂 Nostalgic', energetic: '⚡ Energetic', dreamy: '🌙 Dreamy',
  cozy: '🕯️ Cozy', anxious: '🌀 Anxious', grateful: '✨ Grateful', other: '◈ Other',
};

// ── Component ─────────────────────────────────────────────────────────────────
export default function Landing() {
  const { isDark, toggleTheme } = useTheme();
  const [publicSpaces, setPublicSpaces] = useState<PublicSpace[]>([]);
  const [spacesLoading, setSpacesLoading] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoScrollPaused = useRef(false);

  useEffect(() => {
    api.get('/atmospheres?visibility=public')
      .then((data: PublicSpace[]) => setPublicSpaces(data.slice(0, 10)))
      .catch(() => setPublicSpaces([]))
      .finally(() => setSpacesLoading(false));
  }, []);

  // Auto-scroll: 0.6 px per frame (~36 px/s), loops back, pauses on hover
  useEffect(() => {
    const el = carouselRef.current;
    if (!el || publicSpaces.length === 0) return;
    let rafId: number;

    const tick = () => {
      if (!autoScrollPaused.current) {
        if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 1) {
          el.scrollLeft = 0;
        } else {
          el.scrollLeft += 0.6;
        }
      }
      rafId = requestAnimationFrame(tick);
    };

    const pause  = () => { autoScrollPaused.current = true; };
    const resume = () => { autoScrollPaused.current = false; };

    el.addEventListener('mouseenter', pause);
    el.addEventListener('mouseleave', resume);
    el.addEventListener('touchstart', pause,  { passive: true });
    el.addEventListener('touchend',   resume, { passive: true });

    const startTimer = setTimeout(() => { rafId = requestAnimationFrame(tick); }, 1200);

    return () => {
      clearTimeout(startTimer);
      cancelAnimationFrame(rafId);
      el.removeEventListener('mouseenter', pause);
      el.removeEventListener('mouseleave', resume);
      el.removeEventListener('touchstart', pause);
      el.removeEventListener('touchend', resume);
    };
  }, [publicSpaces]);

  const scrollCarousel = (dir: 'left' | 'right') => {
    if (!carouselRef.current) return;
    autoScrollPaused.current = true;
    carouselRef.current.scrollBy({ left: dir === 'right' ? 320 : -320, behavior: 'smooth' });
    setTimeout(() => { autoScrollPaused.current = false; }, 3000);
  };

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

      {/* ── Navbar ─────────────────────────────────────────────────────────── */}
      <nav className="relative z-10 flex items-center justify-between px-6 sm:px-8 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <img
            src={getLogoByTheme(isDark, 'written')}
            alt="Reverie"
            className="h-12 sm:h-14 object-contain"
          />
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
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
            className="px-4 sm:px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200"
            style={{ color: '#6A7FDB' }}
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="px-4 sm:px-5 py-2 rounded-xl text-sm font-medium text-white transition-all duration-200 hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #6A7FDB, #A9B8FF)', boxShadow: '0 4px 14px rgba(106,127,219,0.3)' }}
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 pt-16 pb-24 text-center">
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-8"
          style={{ background: 'rgba(169,184,255,0.15)', color: '#6A7FDB', border: '1px solid rgba(169,184,255,0.3)' }}
        >
          <span>✦</span>
          <span>Your personal mood sanctuary</span>
        </div>

        <h1
          className="font-heading font-semibold leading-tight mb-6"
          style={{ color: 'var(--rv-text)', fontSize: 'clamp(2.4rem, 6vw, 4.5rem)', lineHeight: 1.15 }}
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

        <p className="text-lg leading-relaxed mx-auto mb-10 max-w-xl" style={{ color: 'var(--rv-text-soft)' }}>
          Reverie is a private space to save mood boards, reflections, soundtracks, and emotions —
          a living memory of your inner world, beautifully organized.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/signup"
            className="px-8 py-3.5 rounded-2xl text-base font-medium text-white transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
            style={{ background: 'linear-gradient(135deg, #6A7FDB 0%, #A9B8FF 100%)', boxShadow: '0 8px 28px rgba(106,127,219,0.35)' }}
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
        <div className="mt-16 max-w-2xl mx-auto">
          <div
            className="rounded-3xl p-7 text-left relative overflow-hidden"
            style={{ background: 'var(--rv-hero-card)', backdropFilter: 'blur(20px)', boxShadow: '0 20px 60px rgba(106,127,219,0.12)', border: '1px solid var(--rv-border)' }}
          >
            <div className="flex items-start justify-between mb-5">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full" style={{ background: 'var(--rv-tag)', color: '#6A7FDB' }}>cozy</span>
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full" style={{ background: 'rgba(246,214,255,0.3)', color: '#A07AB0' }}>private</span>
                </div>
                <h3 className="font-heading font-semibold text-xl" style={{ color: 'var(--rv-text)' }}>Sunday Morning in Autumn</h3>
                <p className="text-sm mt-1" style={{ color: 'var(--rv-text-secondary)' }}>The kind of morning where everything feels still and amber-coloured…</p>
              </div>
            </div>
            <div className="flex gap-2 mb-5">
              {['#6A7FDB', '#A9B8FF', '#F6D6FF', '#FFB8A3', '#D4E8F7'].map((c) => (
                <div key={c} className="w-7 h-7 rounded-full shadow-sm flex-shrink-0" style={{ background: c, border: '2px solid white' }} />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span style={{ color: '#A9B8FF' }}>♪</span>
              <span className="text-xs" style={{ color: 'var(--rv-text-secondary)' }}>3 songs · Last edited today</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── What is Reverie? ────────────────────────────────────────────────── */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 py-20">
        <div
          className="rounded-3xl p-10 sm:p-14 grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
          style={{ background: 'var(--rv-card-section)', backdropFilter: 'blur(20px)', border: '1px solid var(--rv-border)', boxShadow: '0 8px 40px rgba(106,127,219,0.07)' }}
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#A9B8FF' }}>What is Reverie?</p>
            <h2 className="font-heading font-semibold text-2xl sm:text-3xl mb-5 leading-snug" style={{ color: 'var(--rv-text)' }}>
              A home for the feelings words barely capture.
            </h2>
            <p className="text-base leading-relaxed mb-5" style={{ color: 'var(--rv-text-secondary)' }}>
              Reverie is a mood space and memory curation app. You can save emotions, memories, music, images, videos, and reflections — all organized inside personalized mood boards called <em>mood spaces</em>.
            </p>
            <p className="text-base leading-relaxed" style={{ color: 'var(--rv-text-secondary)' }}>
              Think of it as a journal, a playlist, and a mood board combined — but softer, more personal, and entirely yours.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: '◈', label: 'Mood Spaces' },
              { icon: '⊞', label: 'Image & Video Uploads' },
              { icon: '♪', label: 'Music Playlists' },
              { icon: '✦', label: 'Personal Reflections' },
              { icon: '◉', label: 'Color Palettes' },
              { icon: '🕰', label: 'Mood Timeline' },
            ].map((item) => (
              <div key={item.label}
                className="flex items-center gap-3 px-4 py-3 rounded-2xl"
                style={{ background: 'var(--rv-tag)', border: '1px solid var(--rv-border)' }}>
                <span className="text-base" style={{ color: '#A9B8FF' }}>{item.icon}</span>
                <span className="text-sm font-medium" style={{ color: 'var(--rv-text-soft)' }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ────────────────────────────────────────────────────── */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 py-16">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#A9B8FF' }}>How It Works</p>
          <h2 className="font-heading font-semibold text-2xl sm:text-3xl" style={{ color: 'var(--rv-text)' }}>
            Simple to start. Rich to explore.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {HOW_IT_WORKS.map((step) => (
            <div
              key={step.step}
              className="rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 relative"
              style={{ background: 'var(--rv-card-section)', backdropFilter: 'blur(16px)', border: '1px solid var(--rv-border)', boxShadow: '0 4px 20px rgba(106,127,219,0.07)' }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: step.bg }}>
                  <span className="text-xl" style={{ color: step.color }}>{step.icon}</span>
                </div>
                <span className="text-xs font-bold tracking-widest" style={{ color: step.color, opacity: 0.7 }}>{step.step}</span>
              </div>
              <h3 className="font-heading font-semibold text-base mb-2" style={{ color: 'var(--rv-text)' }}>{step.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--rv-text-secondary)' }}>{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Public Moodboard Preview ─────────────────────────────────────────── */}
      <section className="relative z-10 py-16">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 mb-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#A9B8FF' }}>From the Community</p>
              <h2 className="font-heading font-semibold text-2xl sm:text-3xl" style={{ color: 'var(--rv-text)' }}>
                Explore public mood spaces
              </h2>
              <p className="text-sm mt-2" style={{ color: 'var(--rv-text-secondary)' }}>
                Created by Reverie users and shared with the world.
              </p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={() => scrollCarousel('left')}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:opacity-80"
                style={{ background: 'var(--rv-tag)', border: '1px solid var(--rv-border)', color: 'var(--rv-text-soft)' }}
                aria-label="Scroll left"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => scrollCarousel('right')}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:opacity-80"
                style={{ background: 'var(--rv-tag)', border: '1px solid var(--rv-border)', color: 'var(--rv-text-soft)' }}
                aria-label="Scroll right"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {spacesLoading ? (
          <div className="flex gap-5 px-6 sm:px-8 max-w-6xl mx-auto">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex-shrink-0 w-72 h-72 rounded-2xl animate-pulse"
                style={{ background: 'var(--rv-card-section)' }} />
            ))}
          </div>
        ) : publicSpaces.length === 0 ? (
          <div className="max-w-6xl mx-auto px-6 sm:px-8">
            <div
              className="rounded-3xl px-10 py-16 text-center"
              style={{ background: 'var(--rv-card-section)', border: '1px solid var(--rv-border)' }}
            >
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{ background: 'var(--rv-tag)' }}>
                <span className="text-2xl" style={{ color: '#A9B8FF' }}>✦</span>
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2" style={{ color: 'var(--rv-text)' }}>No public spaces yet</h3>
              <p className="text-sm" style={{ color: 'var(--rv-text-secondary)' }}>
                Be the first to share a mood space with the world.
              </p>
              <Link to="/signup"
                className="inline-block mt-6 px-6 py-2.5 rounded-xl text-sm font-medium text-white"
                style={{ background: 'linear-gradient(135deg, #6A7FDB, #A9B8FF)' }}>
                Create One →
              </Link>
            </div>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto">
          <div
            ref={carouselRef}
            className="flex gap-5 overflow-x-auto pb-4 px-6 sm:px-8"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {publicSpaces.map((space) => (
              <PublicSpaceCard key={space._id} space={space} />
            ))}
            {/* End card — sign up prompt */}
            <div
              className="flex-shrink-0 w-72 rounded-2xl flex flex-col items-center justify-center p-8 text-center gap-4"
              style={{ background: 'var(--rv-card-section)', border: '1px dashed var(--rv-border)' }}
            >
              <span className="text-3xl" style={{ color: '#A9B8FF' }}>✦</span>
              <p className="text-sm font-medium" style={{ color: 'var(--rv-text-soft)' }}>
                Discover more inside Reverie
              </p>
              <Link to="/signup"
                className="px-5 py-2 rounded-xl text-xs font-semibold text-white"
                style={{ background: 'linear-gradient(135deg, #6A7FDB, #A9B8FF)' }}>
                Join for free →
              </Link>
            </div>
          </div>
          </div>
        )}
      </section>

      {/* ── Features grid ───────────────────────────────────────────────────── */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 py-16">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#A9B8FF' }}>Features</p>
          <h2 className="font-heading font-semibold text-2xl sm:text-3xl mb-3" style={{ color: 'var(--rv-text)' }}>
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
              style={{ background: 'var(--rv-card-section)', backdropFilter: 'blur(16px)', border: '1px solid var(--rv-border)', boxShadow: '0 4px 20px rgba(106,127,219,0.07)' }}
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: f.bg }}>
                <span className="text-xl" style={{ color: f.color }}>{f.icon}</span>
              </div>
              <h3 className="font-heading font-semibold text-base mb-2" style={{ color: 'var(--rv-text)' }}>{f.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--rv-text-secondary)' }}>{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Our Mission ─────────────────────────────────────────────────────── */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 py-16">
        <div
          className="rounded-3xl p-10 sm:p-14 text-center"
          style={{ background: 'var(--rv-card-section)', backdropFilter: 'blur(20px)', border: '1px solid var(--rv-border)', boxShadow: '0 8px 40px rgba(106,127,219,0.07)' }}
        >
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6"
            style={{ background: 'rgba(106,127,219,0.1)' }}>
            <span className="text-2xl" style={{ color: '#6A7FDB' }}>◉</span>
          </div>
          <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#A9B8FF' }}>Our Mission</p>
          <h2 className="font-heading font-semibold text-2xl sm:text-3xl mb-6 leading-snug" style={{ color: 'var(--rv-text)' }}>
            Making personal memories feel meaningful.
          </h2>
          <p className="text-base leading-relaxed max-w-2xl mx-auto mb-4" style={{ color: 'var(--rv-text-secondary)' }}>
            Reverie exists to help people create a calm digital space for self-expression, reflection, and emotional memory.
            In a world full of noise, we believe everyone deserves a quiet corner to process how they feel.
          </p>
          <p className="text-base leading-relaxed max-w-xl mx-auto" style={{ color: 'var(--rv-text-secondary)' }}>
            Our goal is to make personal memories feel organized, meaningful, and beautiful — without any pressure or audience.
          </p>
        </div>
      </section>

      {/* ── Final CTA ───────────────────────────────────────────────────────── */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 py-16">
        <div
          className="rounded-3xl px-10 py-14 text-center relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #6A7FDB 0%, #9B8FDB 50%, #A9B8FF 100%)', boxShadow: '0 20px 60px rgba(106,127,219,0.35)' }}
        >
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }} />
          <h2 className="font-heading font-semibold text-2xl sm:text-3xl text-white mb-3 relative z-10">
            Start building your Reverie today.
          </h2>
          <p className="text-base mb-8 relative z-10" style={{ color: 'rgba(255,255,255,0.8)' }}>
            Free, private, and entirely yours.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center relative z-10">
            <Link
              to="/signup"
              className="px-8 py-3.5 rounded-2xl text-sm font-semibold transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
              style={{ background: 'white', color: '#6A7FDB', boxShadow: '0 4px 16px rgba(0,0,0,0.12)' }}
            >
              Get Started →
            </Link>
            <Link
              to="/login"
              className="px-8 py-3.5 rounded-2xl text-sm font-semibold transition-all duration-200 hover:opacity-80"
              style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: '1.5px solid rgba(255,255,255,0.35)' }}
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────────── */}
      <footer className="relative z-10 text-center py-10 px-8">
        <img
          src={getLogoByTheme(isDark, 'written')}
          alt="Reverie"
          className="h-7 object-contain mx-auto mb-4 opacity-50"
        />
        <p className="text-sm" style={{ color: 'var(--rv-text-pale)' }}>
          ✦ Reverie — Designed with softness &amp; care
        </p>
      </footer>
    </div>
  );
}

// ── Public space carousel card ────────────────────────────────────────────────
function PublicSpaceCard({ space }: { space: PublicSpace }) {
  const thumbnail = space.coverImageUrl || space.images?.[0] || null;
  const videoThumb = !thumbnail && space.videos?.[0] ? space.videos[0] : null;

  return (
    <div
      className="flex-shrink-0 w-72 rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1"
      style={{ background: 'var(--rv-card-section)', border: '1px solid var(--rv-border)', boxShadow: '0 4px 20px rgba(106,127,219,0.08)' }}
    >
      {/* Media area */}
      <div className="h-40 relative overflow-hidden flex-shrink-0">
        {thumbnail ? (
          <img src={thumbnail} alt={space.title} className="w-full h-full object-cover" />
        ) : videoThumb ? (
          <video src={videoThumb} className="w-full h-full object-cover" muted playsInline />
        ) : (
          <div className="w-full h-full flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, rgba(106,127,219,0.15), rgba(246,214,255,0.15))' }}>
            <span className="text-4xl opacity-30" style={{ color: '#6A7FDB' }}>✦</span>
          </div>
        )}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(22,20,46,0.5) 0%, transparent 55%)' }} />
        {space.mood && (
          <div className="absolute top-2.5 left-3">
            <span className="text-xs px-2.5 py-1 rounded-full font-medium"
              style={{ background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)', color: 'white' }}>
              {MOOD_LABELS[space.mood] ?? space.mood}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-heading font-semibold text-sm mb-1 line-clamp-1" style={{ color: 'var(--rv-text)' }}>
          {space.title}
        </h3>
        {space.description && (
          <p className="text-xs leading-relaxed mb-3 line-clamp-2" style={{ color: 'var(--rv-text-secondary)' }}>
            {space.description}
          </p>
        )}
        <div className="flex items-center gap-2 mt-auto pt-3" style={{ borderTop: '1px solid var(--rv-border-divider)' }}>
          <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #6A7FDB, #A9B8FF)' }}>
            {space.user?.avatarUrl
              ? <img src={space.user.avatarUrl} alt={space.user.name} className="w-6 h-6 rounded-full object-cover" />
              : space.user?.name?.charAt(0).toUpperCase()
            }
          </div>
          <span className="text-xs truncate" style={{ color: 'var(--rv-text-secondary)' }}>{space.user?.name}</span>
          <Link to="/signup" className="ml-auto text-xs font-medium flex-shrink-0 hover:underline" style={{ color: '#6A7FDB' }}>
            View →
          </Link>
        </div>
      </div>
    </div>
  );
}
