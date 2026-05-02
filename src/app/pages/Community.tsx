import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { Heart } from 'lucide-react';
import { api } from '../../api/client';

interface PublicSpace {
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
  user: { _id: string; name: string; avatarUrl?: string };
  createdAt: string;
  likeCount: number;
  saveCount: number;
  isLiked: boolean;
  isSaved: boolean;
}

const MOOD_EMOJIS: Record<string, string> = {
  peaceful: '🌿', joyful: '☀️', melancholic: '🌧️', nostalgic: '🍂',
  energetic: '⚡', dreamy: '🌙', cozy: '🕯️', anxious: '🌀',
  grateful: '✨', other: '◈',
};

const CATEGORIES = ['All', 'cozy', 'dreamy', 'melancholic', 'joyful', 'nostalgic', 'energetic', 'calm', 'other'];

export default function Community() {
  const navigate = useNavigate();
  const [spaces, setSpaces] = useState<PublicSpace[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [error, setError] = useState('');

  const fetchSpaces = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams();
      if (search.trim()) params.set('q', search.trim());
      if (category !== 'All') params.set('category', category);
      const query = params.toString() ? `?${params}` : '';
      const data = await api.get(`/community/spaces${query}`);
      setSpaces(data);
    } catch {
      setError('Could not load community spaces.');
    } finally {
      setLoading(false);
    }
  }, [search, category]);

  useEffect(() => { fetchSpaces(); }, [fetchSpaces]);

  return (
    <div className="px-6 lg:px-10 py-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="font-heading font-semibold text-2xl lg:text-3xl" style={{ color: 'var(--rv-text)' }}>
          Community
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--rv-text-secondary)' }}>
          Explore public mood spaces created by the community ✦
        </p>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm" style={{ color: '#A9B8FF' }}>⌕</span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search community spaces…"
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
            <button key={c} onClick={() => setCategory(c)}
              className="px-3.5 py-2 rounded-xl text-xs font-medium capitalize transition-all duration-200"
              style={category === c
                ? { background: 'linear-gradient(135deg, #6A7FDB, #A9B8FF)', color: 'white', boxShadow: '0 3px 10px rgba(106,127,219,0.25)' }
                : { background: 'var(--rv-inactive-btn)', color: 'var(--rv-text-soft)', border: '1px solid var(--rv-border-inactive)' }
              }>
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
              style={{ background: 'var(--rv-card)', height: 280 }} />
          ))}
        </div>
      ) : spaces.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-20 h-20 rounded-3xl flex items-center justify-center mb-6"
            style={{ background: 'var(--rv-tag)' }}>
            <span className="text-3xl" style={{ color: '#A9B8FF' }}>✧</span>
          </div>
          <h3 className="font-heading font-semibold text-xl mb-2" style={{ color: 'var(--rv-text)' }}>
            {search || category !== 'All' ? 'No spaces found' : 'No public spaces yet'}
          </h3>
          <p className="text-sm max-w-xs" style={{ color: 'var(--rv-text-secondary)' }}>
            {search || category !== 'All'
              ? 'Try adjusting your search or filter.'
              : 'Be the first to share a public mood space with the community.'}
          </p>
        </div>
      ) : (
        <>
          <p className="text-xs mb-5" style={{ color: 'var(--rv-text-tertiary)' }}>
            {spaces.length} public space{spaces.length !== 1 ? 's' : ''}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {spaces.map((space) => (
              <PublicMoodCard
                key={space._id}
                space={space}
                moodEmojis={MOOD_EMOJIS}
                onClick={() => navigate(`/mood/${space._id}`, { state: { from: 'community' } })}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function PublicMoodCard({ space, moodEmojis, onClick }: {
  space: PublicSpace;
  moodEmojis: Record<string, string>;
  onClick: () => void;
}) {
  const coverSrc = space.coverImageUrl || space.images?.[0] || null;
  const tags = [...(space.moodTags || []), ...(space.emotions || [])].slice(0, 3);
  const creatorInitial = space.user?.name?.charAt(0).toUpperCase() ?? '?';

  return (
    <div
      className="rounded-2xl overflow-hidden group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col cursor-pointer"
      style={{
        background: 'var(--rv-card)',
        backdropFilter: 'blur(16px)',
        border: '1px solid var(--rv-border)',
        boxShadow: '0 4px 20px rgba(106,127,219,0.08)',
      }}
      onClick={onClick}
    >
      <div className="h-44 relative overflow-hidden flex-shrink-0">
        {coverSrc ? (
          <img src={coverSrc} alt={space.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        ) : (
          <div className="w-full h-full flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #EEF0FF 0%, #F6D6FF 100%)' }}>
            <span className="text-5xl opacity-20" style={{ color: '#6A7FDB' }}>✦</span>
          </div>
        )}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(44,44,62,0.5) 0%, transparent 55%)' }} />
        {space.mood && (
          <div className="absolute top-3 left-3">
            <span className="text-xs px-2.5 py-1 rounded-full font-medium"
              style={{ background: 'rgba(255,255,255,0.22)', backdropFilter: 'blur(8px)', color: 'white' }}>
              {moodEmojis[space.mood] ?? ''} {space.mood}
            </span>
          </div>
        )}
        {space.category && (
          <div className="absolute bottom-3 left-3">
            <span className="text-xs px-2 py-0.5 rounded-full capitalize"
              style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)', color: 'white' }}>
              {space.category}
            </span>
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-heading font-semibold text-base mb-1.5 leading-snug line-clamp-2" style={{ color: 'var(--rv-text)' }}>
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
              <div key={i} className="w-4 h-4 rounded-full flex-shrink-0"
                style={{ background: c, border: '1.5px solid rgba(255,255,255,0.8)', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }} />
            ))}
          </div>
        )}

        <div className="mt-auto pt-3 flex items-center justify-between"
          style={{ borderTop: '1px solid var(--rv-border-divider)' }}>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #6A7FDB, #A9B8FF)' }}>
              {space.user?.avatarUrl
                ? <img src={space.user.avatarUrl} alt={space.user.name} className="w-6 h-6 rounded-full object-cover" />
                : creatorInitial
              }
            </div>
            <span className="text-xs truncate max-w-[100px]" style={{ color: 'var(--rv-text-secondary)' }}>
              {space.user?.name}
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs flex-shrink-0" style={{ color: 'var(--rv-text-tertiary)' }}>
            {space.likeCount > 0 && (
              <span className="flex items-center gap-1">
                <Heart size={11} />
                {space.likeCount}
              </span>
            )}
            {space.audios?.length > 0 && <span>♫ {space.audios.length}</span>}
            <span>{new Date(space.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
