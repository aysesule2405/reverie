import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Bookmark, Heart } from 'lucide-react';
import { api } from '../../api/client';

interface SavedSpace {
  _id: string;
  title: string;
  mood?: string;
  description?: string;
  moodTags: string[];
  emotions: string[];
  category?: string;
  coverImageUrl?: string;
  images: string[];
  colorPalette: string[];
  audios: string[];
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

export default function SavedSpaces() {
  const navigate = useNavigate();
  const [spaces, setSpaces] = useState<SavedSpace[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/community/saved')
      .then(setSpaces)
      .catch(() => setError('Could not load saved spaces.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="px-6 lg:px-10 py-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <Bookmark size={20} style={{ color: '#6A7FDB' }} />
          <h1 className="font-heading font-semibold text-2xl lg:text-3xl" style={{ color: 'var(--rv-text)' }}>
            Saved Inspirations
          </h1>
        </div>
        <p className="text-sm mt-1" style={{ color: 'var(--rv-text-secondary)' }}>
          Public mood spaces you've bookmarked for inspiration ✦
        </p>
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
            <Bookmark size={32} style={{ color: '#A9B8FF' }} />
          </div>
          <h3 className="font-heading font-semibold text-xl mb-2" style={{ color: 'var(--rv-text)' }}>
            No saved spaces yet
          </h3>
          <p className="text-sm max-w-xs mb-6" style={{ color: 'var(--rv-text-secondary)' }}>
            Browse the community and click Save on the spaces that inspire you.
          </p>
          <button
            onClick={() => navigate('/community')}
            className="px-6 py-2.5 rounded-xl text-sm font-medium text-white transition-all hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #6A7FDB, #A9B8FF)', boxShadow: '0 4px 14px rgba(106,127,219,0.25)' }}
          >
            Explore Community
          </button>
        </div>
      ) : (
        <>
          <p className="text-xs mb-5" style={{ color: 'var(--rv-text-tertiary)' }}>
            {spaces.length} saved space{spaces.length !== 1 ? 's' : ''}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {spaces.map((space) => (
              <SavedCard
                key={space._id}
                space={space}
                onClick={() => navigate(`/mood/${space._id}`, { state: { from: 'community' } })}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function SavedCard({ space, onClick }: { space: SavedSpace; onClick: () => void }) {
  const coverSrc = space.coverImageUrl || space.images?.[0] || null;
  const tags = [...(space.moodTags || []), ...(space.emotions || [])].slice(0, 3);
  const moodEmoji = space.mood ? (MOOD_EMOJIS[space.mood] ?? '') : '';

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
      {/* Cover image */}
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
              {moodEmoji} {space.mood}
            </span>
          </div>
        )}
        {/* Saved badge */}
        <div className="absolute top-3 right-3">
          <span className="flex items-center justify-center w-7 h-7 rounded-full"
            style={{ background: 'rgba(106,127,219,0.35)', backdropFilter: 'blur(8px)' }}>
            <Bookmark size={13} fill="white" color="white" />
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-heading font-semibold text-base mb-1.5 leading-snug line-clamp-2" style={{ color: 'var(--rv-text)' }}>
          {space.title}
        </h3>
        {space.description && (
          <p className="text-xs leading-relaxed mb-3 line-clamp-2" style={{ color: 'var(--rv-text-secondary)' }}>
            {space.description}
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
          {/* Creator */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #6A7FDB, #A9B8FF)' }}>
              {space.user?.avatarUrl
                ? <img src={space.user.avatarUrl} alt={space.user.name} className="w-6 h-6 rounded-full object-cover" />
                : space.user?.name?.charAt(0).toUpperCase()
              }
            </div>
            <span className="text-xs truncate max-w-[100px]" style={{ color: 'var(--rv-text-secondary)' }}>
              {space.user?.name}
            </span>
          </div>
          {/* Stats */}
          <div className="flex items-center gap-3 text-xs flex-shrink-0" style={{ color: 'var(--rv-text-tertiary)' }}>
            {space.likeCount > 0 && (
              <span className="flex items-center gap-1">
                <Heart size={11} />
                {space.likeCount}
              </span>
            )}
            <span>{new Date(space.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
