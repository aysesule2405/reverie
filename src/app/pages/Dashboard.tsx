import React, { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../AuthContext';
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
  songLinks: string[];
  audios: string[];
  visibility: 'public' | 'private';
  createdAt: string;
}

const CATEGORIES = ['All', 'cozy', 'dreamy', 'melancholic', 'joyful', 'nostalgic', 'energetic', 'calm', 'other'];

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [spaces, setSpaces] = useState<MoodSpace[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState('');

  const fetchSpaces = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ mine: 'true' });
      if (search.trim()) params.set('q', search.trim());
      if (category !== 'All') params.set('category', category);
      const data = await api.get(`/atmospheres?${params}`);
      setSpaces(data);
    } catch {
      setError('Could not load your mood spaces.');
    } finally {
      setLoading(false);
    }
  }, [search, category]);

  useEffect(() => { fetchSpaces(); }, [fetchSpaces]);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this mood space? This cannot be undone.')) return;
    setDeletingId(id);
    try {
      await api.del(`/atmospheres/${id}`);
      setSpaces((prev) => prev.filter((s) => s._id !== id));
    } catch {
      alert('Could not delete. Please try again.');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="px-6 lg:px-10 py-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="font-heading font-semibold text-2xl lg:text-3xl" style={{ color: 'var(--rv-text)' }}>
            My Spaces
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--rv-text-secondary)' }}>
            Welcome back, {user?.name?.split(' ')[0]} ✦
          </p>
        </div>
        <Link
          to="/create"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 hover:scale-[1.02] self-start sm:self-auto"
          style={{ background: 'linear-gradient(135deg, #6A7FDB, #A9B8FF)', boxShadow: '0 4px 16px rgba(106,127,219,0.28)' }}
        >
          <span>✦</span>
          <span>New Space</span>
        </Link>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm" style={{ color: '#A9B8FF' }}>⌕</span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search your spaces…"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none transition-all"
            style={{
              background: 'var(--rv-input)',
              border: '1.5px solid var(--rv-border-input)',
              color: 'var(--rv-text)',
              boxShadow: '0 2px 8px rgba(106,127,219,0.05)',
            }}
            onFocus={(e) => { e.target.style.borderColor = '#6A7FDB'; e.target.style.boxShadow = '0 0 0 3px rgba(106,127,219,0.1)'; }}
            onBlur={(e) => { e.target.style.borderColor = 'var(--rv-border-input)'; e.target.style.boxShadow = '0 2px 8px rgba(106,127,219,0.05)'; }}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className="px-3.5 py-2 rounded-xl text-xs font-medium capitalize transition-all duration-200"
              style={category === c
                ? { background: 'linear-gradient(135deg, #6A7FDB, #A9B8FF)', color: 'white', boxShadow: '0 3px 10px rgba(106,127,219,0.25)' }
                : { background: 'var(--rv-inactive-btn)', color: 'var(--rv-text-soft)', border: '1px solid var(--rv-border-inactive)' }
              }
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="px-4 py-3 rounded-xl text-sm mb-6"
          style={{ background: 'var(--rv-error-bg)', color: 'var(--rv-error)', border: '1px solid var(--rv-error-border)' }}>
          {error}
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="rounded-2xl overflow-hidden animate-pulse"
              style={{ background: 'var(--rv-card)', height: 260 }} />
          ))}
        </div>
      ) : spaces.length === 0 ? (
        <EmptyState category={category} search={search} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {spaces.map((space) => (
            <SpaceCard
              key={space._id}
              space={space}
              onView={() => navigate(`/mood/${space._id}`)}
              onEdit={() => navigate(`/mood/${space._id}/edit`)}
              onDelete={() => handleDelete(space._id)}
              isDeleting={deletingId === space._id}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function SpaceCard({
  space, onView, onEdit, onDelete, isDeleting,
}: {
  space: MoodSpace;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
  isDeleting: boolean;
}) {
  const tags = [...(space.moodTags || []), ...(space.emotions || [])].slice(0, 3);
  const coverSrc = space.coverImageUrl || space.images?.[0] || null;

  return (
    <div
      className="rounded-2xl overflow-hidden group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col"
      style={{
        background: 'var(--rv-card)',
        backdropFilter: 'blur(16px)',
        border: '1px solid var(--rv-border)',
        boxShadow: '0 4px 20px rgba(106,127,219,0.08)',
      }}
    >
      {/* Cover image */}
      <div className="h-40 relative overflow-hidden flex-shrink-0 cursor-pointer" onClick={onView}>
        {coverSrc
          ? <img src={coverSrc} alt={space.title} className="w-full h-full object-cover" />
          : (
            <div className="w-full h-full flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #EEF0FF 0%, #F6D6FF 100%)' }}>
              <span className="text-4xl opacity-20" style={{ color: '#6A7FDB' }}>✦</span>
            </div>
          )
        }
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(44,44,62,0.45) 0%, transparent 50%)' }} />

        {space.mood && (
          <div className="absolute top-2.5 left-3">
            <span className="text-xs px-2 py-0.5 rounded-full font-medium"
              style={{ background: 'rgba(255,255,255,0.22)', backdropFilter: 'blur(8px)', color: 'white' }}>
              {space.mood}
            </span>
          </div>
        )}

        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
          <span className="text-xs font-medium px-2 py-0.5 rounded-full capitalize"
            style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)', color: 'white' }}>
            {space.category || 'uncategorized'}
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full"
            style={{ background: space.visibility === 'private' ? 'rgba(106,127,219,0.25)' : 'rgba(100,200,120,0.25)', backdropFilter: 'blur(8px)', color: 'white' }}>
            {space.visibility === 'private' ? '🔒 private' : '🌐 public'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3
          className="font-heading font-semibold text-base mb-1.5 leading-snug cursor-pointer hover:opacity-80 transition-opacity line-clamp-2"
          style={{ color: 'var(--rv-text)' }}
          onClick={onView}
        >
          {space.title}
        </h3>

        {(space.description || space.reflection) && (
          <p className="text-xs leading-relaxed mb-3 line-clamp-2" style={{ color: 'var(--rv-text-secondary)' }}>
            {space.description || space.reflection}
          </p>
        )}

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {tags.map((tag) => (
              <span key={tag} className="text-xs px-2.5 py-0.5 rounded-full capitalize"
                style={{ background: 'var(--rv-tag)', color: '#6A7FDB' }}>
                {tag}
              </span>
            ))}
          </div>
        )}

        {space.colorPalette?.length > 0 && (
          <div className="flex gap-1.5 mb-3">
            {space.colorPalette.slice(0, 5).map((c, i) => (
              <div key={i} className="w-5 h-5 rounded-full flex-shrink-0"
                style={{ background: c, border: '1.5px solid rgba(255,255,255,0.8)', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }} />
            ))}
          </div>
        )}

        <div className="flex items-center gap-2 text-xs mb-4 mt-auto flex-wrap" style={{ color: 'var(--rv-text-tertiary)' }}>
          {space.audios?.length > 0 && <span>♫ {space.audios.length} audio</span>}
          {space.songLinks?.length > 0 && <span>♪ {space.songLinks.length} link{space.songLinks.length !== 1 ? 's' : ''}</span>}
          {(space.audios?.length > 0 || space.songLinks?.length > 0) && <span>·</span>}
          <span>{new Date(space.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
        </div>

        <div className="flex gap-2 pt-3" style={{ borderTop: '1px solid var(--rv-border-divider)' }}>
          <button onClick={onView}
            className="flex-1 py-2 rounded-xl text-xs font-medium transition-all hover:opacity-80"
            style={{ color: 'var(--rv-text-accent)', border: '1px solid var(--rv-border-inactive)' }}>
            View
          </button>
          <button onClick={onEdit}
            className="flex-1 py-2 rounded-xl text-xs font-medium transition-all hover:opacity-80"
            style={{ color: 'var(--rv-text-accent)', border: '1px solid var(--rv-border-inactive)' }}>
            Edit
          </button>
          <button onClick={onDelete} disabled={isDeleting}
            className="px-3 py-2 rounded-xl text-xs font-medium transition-all hover:opacity-80 disabled:opacity-40"
            style={{ color: 'var(--rv-danger)', border: '1px solid var(--rv-danger-border)' }}>
            {isDeleting ? '…' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}

function EmptyState({ category, search }: { category: string; search: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-20 h-20 rounded-3xl flex items-center justify-center mb-6"
        style={{ background: 'var(--rv-tag)' }}>
        <span className="text-3xl" style={{ color: '#A9B8FF' }}>✦</span>
      </div>
      <h3 className="font-heading font-semibold text-xl mb-2" style={{ color: 'var(--rv-text)' }}>
        {search || category !== 'All' ? 'No spaces found' : 'Your first mood space awaits'}
      </h3>
      <p className="text-sm mb-8 max-w-xs" style={{ color: 'var(--rv-text-secondary)' }}>
        {search || category !== 'All'
          ? 'Try adjusting your search or filter.'
          : 'Create your first mood space — a private sanctuary for your emotions, memories, and music.'}
      </p>
      {!search && category === 'All' && (
        <Link
          to="/create"
          className="px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
          style={{ background: 'linear-gradient(135deg, #6A7FDB, #A9B8FF)', boxShadow: '0 4px 14px rgba(106,127,219,0.28)' }}
        >
          Create your first space
        </Link>
      )}
    </div>
  );
}
