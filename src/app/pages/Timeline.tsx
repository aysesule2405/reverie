import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { api } from '../../api/client';

interface MoodSpace {
  _id: string;
  title: string;
  mood?: string;
  description?: string;
  reflection?: string;
  moodTags: string[];
  emotions: string[];
  category?: string;
  coverImageUrl?: string;
  images: string[];
  colorPalette: string[];
  visibility: 'public' | 'private';
  createdAt: string;
}

const MOODS = ['', 'happy', 'sad', 'calm', 'anxious', 'nostalgic', 'energetic', 'dreamy', 'melancholic'];

function groupByMonth(items: MoodSpace[]): { label: string; entries: MoodSpace[] }[] {
  const map = new Map<string, MoodSpace[]>();
  for (const item of items) {
    const label = new Date(item.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    if (!map.has(label)) map.set(label, []);
    map.get(label)!.push(item);
  }
  return Array.from(map.entries()).map(([label, entries]) => ({ label, entries }));
}

export default function Timeline() {
  const navigate = useNavigate();
  const [spaces, setSpaces] = useState<MoodSpace[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [mood, setMood] = useState('');
  const [visibility, setVisibility] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const fetchTimeline = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams();
      if (mood) params.set('mood', mood);
      if (visibility) params.set('visibility', visibility);
      if (startDate) params.set('startDate', startDate);
      if (endDate) params.set('endDate', endDate);
      const qs = params.toString();
      const data = await api.get(`/atmospheres/timeline${qs ? `?${qs}` : ''}`);
      setSpaces(data);
    } catch {
      setError('Could not load your timeline.');
    } finally {
      setLoading(false);
    }
  }, [mood, visibility, startDate, endDate]);

  useEffect(() => { fetchTimeline(); }, [fetchTimeline]);

  const groups = groupByMonth(spaces);

  return (
    <div className="px-6 lg:px-10 py-8 max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-heading font-semibold text-2xl lg:text-3xl" style={{ color: 'var(--rv-text)' }}>
          Mood Timeline
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--rv-text-secondary)' }}>
          Your emotional journey, one memory at a time.
        </p>
      </div>

      {/* Filters */}
      <div
        className="rounded-2xl p-5 mb-10 flex flex-col sm:flex-row flex-wrap gap-4"
        style={{ background: 'var(--rv-bg-card)', border: '1px solid var(--rv-border)' }}
      >
        {/* Mood filter */}
        <div className="flex flex-col gap-1 flex-1 min-w-[140px]">
          <label className="text-xs font-medium" style={{ color: 'var(--rv-text-muted)' }}>Mood</label>
          <select
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className="rounded-xl px-3 py-2 text-sm outline-none"
            style={{
              background: 'var(--rv-input)',
              border: '1.5px solid var(--rv-border-input)',
              color: 'var(--rv-text)',
            }}
          >
            <option value="">All moods</option>
            {MOODS.filter(Boolean).map((m) => (
              <option key={m} value={m}>{m.charAt(0).toUpperCase() + m.slice(1)}</option>
            ))}
          </select>
        </div>

        {/* Visibility filter */}
        <div className="flex flex-col gap-1 flex-1 min-w-[140px]">
          <label className="text-xs font-medium" style={{ color: 'var(--rv-text-muted)' }}>Visibility</label>
          <select
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
            className="rounded-xl px-3 py-2 text-sm outline-none"
            style={{
              background: 'var(--rv-input)',
              border: '1.5px solid var(--rv-border-input)',
              color: 'var(--rv-text)',
            }}
          >
            <option value="">All</option>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>

        {/* Date from */}
        <div className="flex flex-col gap-1 flex-1 min-w-[140px]">
          <label className="text-xs font-medium" style={{ color: 'var(--rv-text-muted)' }}>From</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="rounded-xl px-3 py-2 text-sm outline-none"
            style={{
              background: 'var(--rv-input)',
              border: '1.5px solid var(--rv-border-input)',
              color: 'var(--rv-text)',
              colorScheme: 'inherit',
            }}
          />
        </div>

        {/* Date to */}
        <div className="flex flex-col gap-1 flex-1 min-w-[140px]">
          <label className="text-xs font-medium" style={{ color: 'var(--rv-text-muted)' }}>To</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="rounded-xl px-3 py-2 text-sm outline-none"
            style={{
              background: 'var(--rv-input)',
              border: '1.5px solid var(--rv-border-input)',
              color: 'var(--rv-text)',
              colorScheme: 'inherit',
            }}
          />
        </div>

        {/* Reset */}
        {(mood || visibility || startDate || endDate) && (
          <div className="flex items-end">
            <button
              onClick={() => { setMood(''); setVisibility(''); setStartDate(''); setEndDate(''); }}
              className="px-4 py-2 rounded-xl text-xs font-medium transition-all hover:opacity-80"
              style={{ color: 'var(--rv-text-muted)', border: '1px solid var(--rv-border-inactive)' }}
            >
              Clear
            </button>
          </div>
        )}
      </div>

      {error && (
        <div className="px-4 py-3 rounded-xl text-sm mb-6"
          style={{ background: 'var(--rv-error-bg)', color: 'var(--rv-error)', border: '1px solid var(--rv-error-border)' }}>
          {error}
        </div>
      )}

      {loading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="rounded-2xl animate-pulse h-24"
              style={{ background: 'var(--rv-card)' }} />
          ))}
        </div>
      ) : groups.length === 0 ? (
        <EmptyTimeline hasFilters={!!(mood || visibility || startDate || endDate)} />
      ) : (
        <div className="relative">
          {/* Vertical timeline rail */}
          <div
            className="absolute left-[22px] top-2 bottom-2 w-px"
            style={{ background: 'linear-gradient(to bottom, #6A7FDB44, #A9B8FF22)' }}
          />

          <div className="space-y-10">
            {groups.map(({ label, entries }) => (
              <section key={label}>
                {/* Month label */}
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 z-10 relative"
                    style={{ background: 'linear-gradient(135deg, #6A7FDB, #A9B8FF)', boxShadow: '0 3px 12px rgba(106,127,219,0.3)' }}
                  >
                    <span className="text-white font-bold text-xs leading-none text-center select-none" style={{ fontSize: '0.6rem', lineHeight: 1.2 }}>
                      {label.split(' ')[0].slice(0, 3).toUpperCase()}<br />{label.split(' ')[1].slice(2)}
                    </span>
                  </div>
                  <h2 className="font-heading font-semibold text-base" style={{ color: 'var(--rv-text)' }}>
                    {label}
                  </h2>
                  <span className="text-xs px-2.5 py-0.5 rounded-full ml-auto flex-shrink-0"
                    style={{ background: 'var(--rv-tag)', color: '#6A7FDB' }}>
                    {entries.length} {entries.length === 1 ? 'entry' : 'entries'}
                  </span>
                </div>

                {/* Entries */}
                <div className="pl-14 space-y-4">
                  {entries.map((space) => (
                    <TimelineEntry key={space._id} space={space} onClick={() => navigate(`/mood/${space._id}`)} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function TimelineEntry({ space, onClick }: { space: MoodSpace; onClick: () => void }) {
  const coverSrc = space.coverImageUrl || space.images?.[0] || null;
  const tags = [...(space.moodTags || []), ...(space.emotions || [])].slice(0, 3);
  const date = new Date(space.createdAt);
  const dateStr = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

  return (
    <div
      onClick={onClick}
      className="rounded-2xl overflow-hidden flex gap-0 cursor-pointer group transition-all duration-200 hover:-translate-y-0.5"
      style={{
        background: 'var(--rv-card)',
        border: '1px solid var(--rv-border)',
        boxShadow: '0 2px 12px rgba(106,127,219,0.07)',
      }}
    >
      {/* Cover thumbnail */}
      {coverSrc ? (
        <div className="w-20 flex-shrink-0 relative overflow-hidden" style={{ minHeight: 80 }}>
          <img src={coverSrc} alt={space.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, transparent 60%, var(--rv-card))' }} />
        </div>
      ) : (
        <div
          className="w-20 flex-shrink-0 flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #EEF0FF, #F6D6FF)', minHeight: 80 }}
        >
          <span style={{ color: '#A9B8FF', fontSize: 20 }}>✦</span>
        </div>
      )}

      {/* Content */}
      <div className="p-4 flex flex-col justify-center flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h3
            className="font-heading font-semibold text-sm leading-snug line-clamp-1 group-hover:opacity-80 transition-opacity"
            style={{ color: 'var(--rv-text)' }}
          >
            {space.title}
          </h3>
          <span className="text-xs flex-shrink-0 mt-0.5" style={{ color: 'var(--rv-text-muted)' }}>
            {dateStr}
          </span>
        </div>

        {(space.description || space.reflection) && (
          <p className="text-xs mt-1 line-clamp-1" style={{ color: 'var(--rv-text-secondary)' }}>
            {space.description || space.reflection}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-1.5 mt-2">
          {space.mood && (
            <span className="text-xs px-2 py-0.5 rounded-full capitalize"
              style={{ background: 'rgba(106,127,219,0.12)', color: '#6A7FDB' }}>
              {space.mood}
            </span>
          )}
          {tags.map((t) => (
            <span key={t} className="text-xs px-2 py-0.5 rounded-full capitalize"
              style={{ background: 'var(--rv-tag)', color: 'var(--rv-text-muted)' }}>
              {t}
            </span>
          ))}
          <span className="ml-auto text-xs" style={{ color: 'var(--rv-text-muted)' }}>
            {space.visibility === 'private' ? '🔒' : '🌐'}
          </span>
        </div>
      </div>
    </div>
  );
}

function EmptyTimeline({ hasFilters }: { hasFilters: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-20 h-20 rounded-3xl flex items-center justify-center mb-6"
        style={{ background: 'var(--rv-tag)' }}>
        <span className="text-3xl" style={{ color: '#A9B8FF' }}>✦</span>
      </div>
      <h3 className="font-heading font-semibold text-xl mb-2" style={{ color: 'var(--rv-text)' }}>
        {hasFilters ? 'No entries match your filters' : 'Your timeline is waiting for its first memory.'}
      </h3>
      <p className="text-sm max-w-xs" style={{ color: 'var(--rv-text-secondary)' }}>
        {hasFilters
          ? 'Try clearing some filters to see more entries.'
          : 'Start capturing your moods and emotions — each mood space becomes a memory on your timeline.'}
      </p>
    </div>
  );
}
